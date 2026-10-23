"use client";

import { useState } from "react";
import { ghostClass, primaryClass } from "@/components/ui";

type StoredFile = { key: string; size?: number; modified?: string };
const functionUrl = process.env.NEXT_PUBLIC_ORIGIN_NEON_FILES_URL || "";

function endpoint(path: string) {
  const url = new URL(functionUrl);
  if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash || url.pathname !== "/") {
    throw new Error("Set a valid Neon Function HTTPS root URL");
  }
  return `${url.origin}${path}`;
}

export function NeonStoragePanel({ token }: { token: string }) {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [download, setDownload] = useState<{ key: string; url: string } | null>(null);
  const enabled = Boolean(token && functionUrl);

  async function call(path: string, options?: RequestInit) {
    if (!enabled) throw new Error("Sign in and configure Neon first");
    const response = await fetch(endpoint(path), {
      ...options,
      headers: { Authorization: `Bearer ${token}`, ...options?.headers },
      cache: "no-store",
    });
    const value = await response.json() as { error?: string; items?: StoredFile[]; truncated?: boolean; url?: string };
    if (!response.ok) throw new Error(value.error || `Neon returned ${response.status}`);
    return value;
  }
  async function load() {
    setBusy(true);
    try {
      const value = await call("/files");
      setFiles(value.items || []);
      setDownload(null);
      setMessage(value.truncated ? "Showing 30 files; more items exist." : "Loaded from Neon.");
    } catch (e) { setMessage(e instanceof Error ? e.message : "List failed"); }
    finally { setBusy(false); }
  }
  async function upload() {
    if (!file) return;
    setBusy(true);
    try {
      if (file.size < 1 || file.size > 10 * 1024 * 1024) throw new Error("Maximum file size: 10 MiB");
      const body = new FormData();
      body.set("file", file);
      await call("/files", { method: "POST", body });
      setFile(null);
      const value = await call("/files");
      setFiles(value.items || []);
      setDownload(null);
      setMessage("Upload succeeded.");
    } catch (e) { setMessage(e instanceof Error ? e.message : "Upload failed"); }
    finally { setBusy(false); }
  }
  async function signedUrl(key: string) {
    setBusy(true);
    try {
      const value = await call(`/files/url?key=${encodeURIComponent(key)}`);
      if (!value.url) throw new Error("Missing download URL");
      setDownload({ key, url: value.url });
      setMessage("Download link is valid for 2 minutes.");
    } catch (e) { setMessage(e instanceof Error ? e.message : "Download unavailable"); }
    finally { setBusy(false); }
  }

  return <section className="space-y-3 border border-line p-4" aria-label="Neon object storage">
    <h2 className="font-semibold">Neon Object Storage</h2>
    <p className="text-muted">Private user files. Authenticated with the same Cognito access token. No Neon storage credentials are exposed.</p>
    {!functionUrl && <p role="status">Neon Function URL is not configured. See docs/neon.md.</p>}
    {!token && <p role="status">Sign in with Cognito above first.</p>}
    <div className="flex flex-wrap items-center gap-2">
      <label htmlFor="neon-file">File (10 MiB max)</label>
      <input id="neon-file" type="file" className="max-w-full" disabled={!enabled || busy} onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button className={primaryClass()} disabled={!enabled || busy || !file} onClick={() => void upload()}>Upload</button>
      <button className={ghostClass()} disabled={!enabled || busy} onClick={() => void load()}>Refresh files</button>
    </div>
    <p role="status" aria-live="polite">{message}</p>
    <ul className="space-y-1">{files.map(({ key, size }) => <li key={key} className="flex flex-wrap items-center justify-between gap-2 border-b border-line py-2">
      <span className="break-all">{key.split("/").at(-1)} ({size ?? 0} bytes)</span>
      <button className={ghostClass()} disabled={!enabled || busy} onClick={() => void signedUrl(key)}>Get download link</button>
      {download?.key === key && <a className="underline" target="_blank" rel="noopener noreferrer" href={download.url}>Download (2 min)</a>}
    </li>)}</ul>
  </section>;
}
