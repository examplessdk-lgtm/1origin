# Origin — Nuxt UI Source Composition (canonical)

Decision: The eight repositories are implementation ingredients for ONE Origin application, not a template catalog or marketplace. Keep one shell, one shared CSS, and enable real controls one feature at a time.

## Canonical app
- Deployable Nuxt app: ui/nuxt
- Preserved source library: ui/template-library/upstream/
- Shared theme: ui/template-library/shared/mono-neutral.css and ui/nuxt/app/assets/css/main.css
- Public entry / opens IDE /workspace; /catalog is retired.
- No source template is exposed to users as a standalone demo, product or download.

## Eight source repositories and their integration roles

| Official repository | Role in Origin | Current integration |
| --- | --- | --- |
| nuxt-ui-templates/starter | Nuxt app foundation, reusable UI and responsive layout | Shared Nuxt foundation active |
| nuxt-ui-templates/dashboard | Consistent navigation, Overview, project and operational panels | Unified shell, browser-based Overview |
| nuxt-ui-templates/editor | Authoring and editing patterns, rich-text documents | Phase 1 local plain-text code editor; upstream TipTap rich-text not yet transplanted |
| nuxt-ui-templates/chat | Contextual AI pane, chat history and streaming | Pending authenticated backend |
| nuxt-ui-templates/saas | Login, workspaces, account controls, roles and settings | Pending Cognito browser flow and account isolation |
| nuxt-ui-templates/landing | User onboarding and external product entry | Pending real user journey; root is IDE by user request |
| nuxt-ui-templates/docs | Embedded documentation and guides | Pending grounded content and active links |
| nuxt-ui-templates/changelog | Release and activity history | Pending verified event source |

## Active first vertical slice
- /workspace: select/open public GitHub source files; edit, copy, download or save within this browser.
- /import: read real public GitHub repositories via GitHub REST API. No token, private access, commit or push.
- /overview: real browser workspace state only; no simulated cloud metrics.
- /projects: current imported repository and clear-local-workspace action.
- /build: last independently verified AWS CodeBuild result and actual console link, NOT a fake build button.
- /loading: actual browser import/file-read state, otherwise idle.
- /catalog and /deployments: legacy preview pages redirect to integrated routes.

## Activation gates
1. GitHub App and Cognito authenticated private repository import, correctly scoped per user, server-side secrets only.
2. Persistent remote file snapshots and explicit Commit/Push with conflict handling and audit trail.
3. Isolated build runner, resource quotas, timeouts, job API, real build logs and deployment history.
4. AI agent with Bedrock streaming, per-project tools and cost controls.
5. SaaS accounts/settings, documentation, release activity and onboarding only when real data and working controls exist.

Do not present saved upstream source code as already integrated functionality. Each feature becomes active only after real behavior and E2E verification. Cloudflare DNS, other user sites and the 14-stack backend are separate workstreams.
