/**
 * Authenticated private files backend on Neon Functions / Neon Object Storage.
 * No storage credentials are sent to browsers.
 */
import { randomUUID } from "node:crypto";
import { GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { createRemoteJWKSet, jwtVerify } from "jose";

const MAX_SIZE = 10 * 1024 * 1024;
const BUCKET = process.env.ORIGIN_BUCKET || "origin-files";
const issuer = process.env.COGNITO_ISSUER?.replace(/\/$/, "");
const clientId = process.env.COGNITO_CLIENT_ID;
const webOrigin = process.env.WEB_ORIGIN;
const storageReady = Boolean(process.env.AWS_ENDPOINT_URL_S3 && process.env.AWS_REGION && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY);
const ready = Boolean(issuer && clientId && webOrigin && storageReady);
const jwks = issuer?.startsWith("https://") ? createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`)) : null;
const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-east-2",
  endpoint: process.env.AWS_ENDPOINT_URL_S3 || "http://127.0.0.1:9",
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "unset",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "unset",
  },
});

const app = new Hono();
app.use("/*", cors({
  origin: (origin) => origin === webOrigin ? origin : "",
  allowHeaders: ["Authorization", "Content-Type"],
  allowMethods: ["GET", "POST", "OPTIONS"],
  maxAge: 300,
}));

async function owner(request: Request): Promise<string | null> {
  if (!ready || !jwks) return null;
  const match = /^Bearer ([^\s]+)$/.exec(request.headers.get("authorization") || "");
  if (!match) return null;
  try {
    const { payload } = await jwtVerify(match[1], jwks, { issuer, algorithms: ["RS256"] });
    if (payload.token_use !== "access" || payload.client_id !== clientId || typeof payload.sub !== "string") return null;
    return /^[a-zA-Z0-9_-]{1,128}$/.test(payload.sub) ? payload.sub : null;
  } catch { return null; }
}

function safeName(input: string) {
  return (input.split(/[\\/]/).pop() || "file").replace(/[^a-zA-Z0-9._-]/g, "_").replace(/^\.+/, "").slice(0, 100) || "file";
}

app.get("/health", (c) => c.json({ service: "origin-files", configured: ready }));

app.get("/files", async (c) => {
  if (!ready) return c.json({ error: "Service not configured" }, 503);
  const sub = await owner(c.req.raw);
  if (!sub) return c.json({ error: "Unauthorized" }, 401);
  try {
    const result = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET, Prefix: `users/${sub}/`, MaxKeys: 30 }));
    return c.json({
      items: (result.Contents || []).map(({ Key, Size, LastModified }) => ({ key: Key, size: Size, modified: LastModified?.toISOString() })),
      truncated: result.IsTruncated === true,
    });
  } catch { return c.json({ error: "Storage unavailable" }, 503); }
});

app.post("/files", async (c) => {
  if (!ready) return c.json({ error: "Service not configured" }, 503);
  const sub = await owner(c.req.raw);
  if (!sub) return c.json({ error: "Unauthorized" }, 401);
  const length = Number(c.req.header("content-length") || "0");
  if (length > MAX_SIZE + 1024 * 1024) return c.json({ error: "File too large" }, 413);
  if (!(c.req.header("content-type") || "").toLowerCase().startsWith("multipart/form-data;")) return c.json({ error: "Expected multipart/form-data" }, 415);
  try {
    const body = await c.req.formData();
    const file = body.get("file");
    if (!(file instanceof File) || file.size < 1 || file.size > MAX_SIZE) return c.json({ error: "File must be 1 byte to 10 MiB" }, 413);
    const key = `users/${sub}/${randomUUID()}/${safeName(file.name)}`;
    await s3.send(new PutObjectCommand({
      Bucket: BUCKET, Key: key, Body: new Uint8Array(await file.arrayBuffer()),
      ContentType: file.type.slice(0, 120) || "application/octet-stream",
    }));
    return c.json({ key, size: file.size }, 201);
  } catch { return c.json({ error: "Upload failed" }, 503); }
});

app.get("/files/url", async (c) => {
  if (!ready) return c.json({ error: "Service not configured" }, 503);
  const sub = await owner(c.req.raw);
  if (!sub) return c.json({ error: "Unauthorized" }, 401);
  const key = c.req.query("key") || "";
  if (!key.startsWith(`users/${sub}/`) || key.length > 500 || key.includes("..")) return c.json({ error: "Forbidden" }, 403);
  try {
    const url = await getSignedUrl(s3, new GetObjectCommand({ Bucket: BUCKET, Key: key }), { expiresIn: 120 });
    return c.json({ url, expiresIn: 120 });
  } catch { return c.json({ error: "Unable to sign URL" }, 503); }
});

export default app;
