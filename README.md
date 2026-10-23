# Origin

Deployment console for **1origin.dev**, built with Next.js, TypeScript and Tailwind.
Cloudflare manages DNS. The target backend and hosting platform is AWS Singapore.

## Run

```bash
npm ci
npm run dev
```

The original routes (`/`, `/projects`, `/deployments`, `/env`, `/domains`, `/logs`,
`/team`, `/settings`) remain the clickable **sample workspace**. Ctrl/Cmd+K opens navigation.

## AWS backend foundation

`/connect` is a separate live backend client: Cognito sign-in, tenant-bound project registration
and project listing. Configure it using `.env.example` after deploying the CloudFormation template.

See [backend setup and release instructions](docs/backend.md).

**Not yet implemented:** GitHub authorization/import, executing customer builds, customer hosting,
real environment secrets, teams/RBAC, custom-domain automation, or a complete Vercel-like lifecycle.
Deployment requests fail closed while the build worker is absent. No infrastructure is provisioned
by npm commands, and this repository does not automatically deploy on push.

## Checks

```bash
npm run lint
npm run build
PYTHONPATH=backend python -m unittest discover -s backend/tests -v
python scripts/render-infrastructure.py
```

## Neon Object Storage (optional second backend)

A private user file service is declared in `neon.ts` and `functions/origin-files.ts`.
The /connect page shows a separate Neon storage panel once its function URL
and Cognito login are configured. This does **not** replace the AWS backend.
See `docs/neon.md` for deploy and verification. A Git push does not deploy Neon.
