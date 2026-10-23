# Origin Template Library — UI first

Official source: https://ui.nuxt.com/templates

This library includes all **13** officially listed Nuxt UI application templates:
10 standalone Nuxt apps and 3 standalone Vue + Vite apps.

## IMPORTANT: source-first policy

Each template retains the original Nuxt/Vue app structure, pages, server routes,
components, and dependencies. The only generated modifications within each
upstream template are made to its global **CSS**. All copies retain the original
MIT license and other attribution. No template is merged into the others yet.

The single source of truth is **shared/mono-neutral.css**, matching the
specified Geist Mono + neutral light/dark Nuxt UI theme. The reproducible
generator **scripts/sync-theme.mjs** adds the Google Fonts import and the
generated CSS block to each template's existing global main.css.

Regenerate all 13 (plus Origin's existing standalone UI preview):

    node ui/template-library/scripts/sync-theme.mjs

To develop a chosen template separately:

    cd ui/template-library/upstream/chat
    npm install
    npm run dev

Choose any other directory from catalog.json. For some examples, API keys,
OAuth or a database are needed for *backend behavior*; do not commit credentials
or enable live chat or other costly actions automatically.

## Integration stages

1. Collect 13 official templates and normalize CSS **(this stage)**
2. Display catalog with links and local source paths
3. Decide which pages become routes/components of final Origin application
4. Deduplicate state, navigation, server routes and build tooling
5. Connect AWS Cognito, Neon Object Storage and deployment APIs **later**

The upstream demos linked in the catalog are **official unmodified demos** and
do not display Origin's theme. The theme is applied to the source copies under
upstream/. No GitHub, AWS, Neon or Vercel production state is represented by
the upstream demo content.
