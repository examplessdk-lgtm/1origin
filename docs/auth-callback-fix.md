# Cognito callback hydration fix

The user's recording showed the callback page reporting a missing authorization code. A fresh browser reproduced the same error with a non-secret diagnostic `code` and `state` visibly present in the URL. The static Nuxt page mounted before `useRoute().query` reflected the browser location.

The first direct-location patch still ran too early: the installed Nuxt router temporarily replaces even the browser URL with its prerendered path and restores the original query at app:suspense:resolve. The final callback uses onNuxtReady (after restoration) and reads OAuth parameters from window.location.search. This behavior was verified against node_modules/nuxt/dist/pages/runtime/plugins/router.js and app/composables/ready.js. State/PKCE verification, one-time code exchange, Cognito configuration, token storage and access control are unchanged. No real authorization code or token is logged or committed.

Regression tests execute the actual Vue script with an empty router query and temporarily empty browser search, restoring the returned URL only before the Nuxt-ready callback. Before the fix, valid-query and provider-error tests failed; after the fix all callback tests pass. Missing state still prevents token exchange. A real account login is not established by these synthetic tests; the deployed browser must at least advance to PKCE-state verification for a diagnostic URL before declaring the parsing defect fixed.

Release scope: patch the existing production UI through its approved backup-and-publish pipeline, separate fix branch, no merge. Prior production release/source remain available for rollback. No password reset or new user provisioning is required.
