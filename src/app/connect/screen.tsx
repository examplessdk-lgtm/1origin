"use client";

import { useEffect, useRef, useState } from "react";
import { ghostClass, PageFrame, primaryClass } from "@/components/ui";

type Project = { id: string; name: string; repository: string; connectionStatus: string };
type AuthAttempt = { state: string; verifier: string; created: number };
const api = process.env.NEXT_PUBLIC_ORIGIN_API_URL ?? "";
const client = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ?? "";
const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN ?? "";
const configured = Boolean(api && client && domain);
const authKey = "origin.oauth.attempt";
const base64url = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes)).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
const random = () => base64url(crypto.getRandomValues(new Uint8Array(32)));
function secureBase(value: string) {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash || url.pathname !== "/") throw new Error("Configure an HTTPS origin without a path");
  return url.origin;
}

export function ConnectScreen() {
  const [token, setToken] = useState(""); // Access tokens are held in memory, never localStorage.
  const [expiresAt, setExpiresAt] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [repository, setRepository] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const params = new URLSearchParams(window.location.search);
    if (!params.has("code") && !params.has("error")) return;
    const saved = sessionStorage.getItem(authKey);
    sessionStorage.removeItem(authKey);
    window.history.replaceState({}, "", "/connect");
    async function exchange() {
      try {
        if (!configured) throw new Error("Configure the backend before signing in");
        if (params.has("error")) throw new Error("Sign-in was cancelled or rejected");
        const attempt: AuthAttempt | null = saved ? JSON.parse(saved) : null;
        if (!attempt || attempt.state !== params.get("state") || Date.now() - attempt.created > 600_000 || attempt.created > Date.now()) throw new Error("Sign-in expired or state did not match. Try again.");
        const result = await fetch(`${secureBase(domain)}/oauth2/token`, {
          method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ grant_type: "authorization_code", client_id: client, code: params.get("code") ?? "", redirect_uri: `${window.location.origin}/connect`, code_verifier: attempt.verifier }),
        });
        if (!result.ok) throw new Error("Could not exchange the sign-in code");
        const data = await result.json();
        if (typeof data.access_token !== "string" || typeof data.expires_in !== "number" || data.expires_in <= 0) throw new Error("Invalid sign-in response");
        setToken(data.access_token);
        setExpiresAt(Date.now() + data.expires_in * 1000);
        setMessage("Signed in. Load your projects to check the AWS connection.");
      } catch (error) { setMessage(error instanceof Error ? error.message : "Sign-in failed"); }
    }
    void exchange();
  }, []);

  useEffect(() => {
    if (!expiresAt) return;
    const timer = window.setTimeout(() => { setToken(""); setProjects([]); setCursor(null); setMessage("Session expired. Sign in again."); }, Math.max(0, expiresAt - Date.now()));
    return () => window.clearTimeout(timer);
  }, [expiresAt]);

  async function signIn() {
    setBusy(true);
    try {
      const verifier = random();
      const state = random();
      const challenge = base64url(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier))));
      const target = new URL(`${secureBase(domain)}/oauth2/authorize`);
      target.search = new URLSearchParams({ client_id: client, response_type: "code", scope: "openid email", redirect_uri: `${window.location.origin}/connect`, state, code_challenge: challenge, code_challenge_method: "S256" }).toString();
      sessionStorage.setItem(authKey, JSON.stringify({ state, verifier, created: Date.now() }));
      window.location.assign(target);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Sign-in failed"); setBusy(false); }
  }

  async function request(path: string, data?: object) {
    if (!token || Date.now() >= expiresAt) throw new Error("Sign in again");
    const result = await fetch(`${secureBase(api)}${path}`, { method: data ? "POST" : "GET", headers: { Authorization: `Bearer ${token}`, ...(data ? { "Content-Type": "application/json" } : {}) }, ...(data ? { body: JSON.stringify(data) } : {}) });
    const value = await result.json();
    if (!result.ok) throw new Error(typeof value.error === "string" ? value.error : `API returned ${result.status}`);
    return value;
  }

  async function load(more = false) {
    setBusy(true);
    try {
      const value = await request(`/projects${more && cursor ? `?cursor=${encodeURIComponent(cursor)}` : ""}`);
      setProjects((current) => more ? [...current, ...value.items] : value.items);
      setCursor(value.cursor);
      setMessage("Projects loaded from AWS.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Request failed"); }
    finally { setBusy(false); }
  }

  return <PageFrame title="AWS backend" lede="Live control plane connection. The existing console pages remain a labeled sample workspace.">
    <div className="space-y-4 p-4">
      {!configured && <p role="status">Backend not configured. Deploy the control-plane template and set the three NEXT_PUBLIC variables documented in docs/backend.md.</p>}
      <p className="text-muted">This first stage stores project registrations. GitHub authorization, build execution, hosting, environment secrets, custom domains and team permissions are not connected yet.</p>
      <div className="flex flex-wrap gap-2">
        <button disabled={!configured || busy} className={primaryClass()} onClick={() => void signIn()}>Sign in with Cognito</button>
        <button disabled={!token || busy} className={ghostClass()} onClick={() => void load()}>Load projects</button>
        {token && <button className={ghostClass()} onClick={() => {
          setToken(""); setExpiresAt(0); setProjects([]); setCursor(null);
          const target = new URL(`${secureBase(domain)}/logout`);
          target.search = new URLSearchParams({ client_id: client, logout_uri: `${window.location.origin}/connect` }).toString();
          window.location.assign(target);
        }}>Sign out</button>}
      </div>
      <form className="flex max-w-xl flex-col gap-2" onSubmit={async (event) => {
        event.preventDefault(); setBusy(true);
        try { await request("/projects", { name, repository }); setName(""); setRepository(""); await load(); }
        catch (error) { setMessage(error instanceof Error ? error.message : "Request failed"); }
        finally { setBusy(false); }
      }}>
        <label htmlFor="project-name">Project name</label>
        <input id="project-name" required maxLength={80} value={name} onChange={(event) => setName(event.target.value)} className="border border-line bg-ground p-2" />
        <label htmlFor="repository">GitHub owner/repository</label>
        <input id="repository" required maxLength={201} value={repository} onChange={(event) => setRepository(event.target.value)} placeholder="examplessdk-lgtm/1origin" className="border border-line bg-ground p-2" />
        <button disabled={!token || busy} className={primaryClass()} type="submit">Register project</button>
      </form>
      <p role="status" aria-live="polite">{message}</p>
      <ul>{projects.map((project) => <li key={project.id} className="border-b border-line py-2 break-words"><strong>{project.name}</strong> · {project.repository} · {project.connectionStatus}</li>)}</ul>
      {cursor && <button disabled={busy} className={ghostClass()} onClick={() => void load(true)}>Load more</button>}
    </div>
  </PageFrame>;
}
