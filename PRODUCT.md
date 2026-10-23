# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated: Next.js (App Router) + TypeScript + Tailwind, package manager npm. Current stable scaffold is Next.js 16 with Cache Components. Future deploy target is AWS region ap-southeast-1. The AWS account is designated and not connected. Do not display the account id in the product UI. Do not provision infrastructure from this repo.

## Users

A developer evaluating Origin, clicking through a sample workspace before any cloud account is connected.

## Product Purpose

Origin is a deployment console for the domain https://1origin.dev. Success for this version is a clickable shell: projects, deployments, environment variables, domains, logs, team roles, and the infrastructure plan. The site is not served at the domain yet.

## Positioning

The console is the product surface. It is an original tool with the jobs of a deployment console, not a copy of another host's brand, logos, or marketing pages.

## Operating Context

DNS for 1origin.dev is on Cloudflare. The .dev TLD forces HTTPS. No site is served yet. The planned runtime, once an account is connected, is AWS Singapore: Aurora PostgreSQL for data, S3 for files, SQS for the build queue, ElastiCache Redis for realtime status, KMS for encryption, CloudFront for the edge. Those resources are not provisioned.

## Capabilities and Constraints

- English UI.
- Synthetic sample data only. It must read as sample data.
- Do not invent customers, testimonials, benchmarks, or prices as facts. No pricing is offered.
- Do not claim AWS resources exist. The UI may say the console will run on AWS Singapore once the account is connected.
- Do not print the AWS account id on the public pages.
- AWS credentials are not available. Do not call AWS from this project.

## Brand Commitments

- Name on the site: Origin.
- Domain: https://1origin.dev.
- Visual world, pinned: fierce and dense, like the Cursor IDE. Dark charcoal editor, darker side panel, 1px hairline borders, sharp corners, monospace for code and status, bottom status bar. Focus and caret are electric blue. Deploy states are green when passed, red when failed, amber when waiting.
- Suggested tokens: editor ground #0e0e0e, sidebar #0a0a0a, border #2a2a2a, text #e8e8e8, muted #8b8b8b. Adjust only if contrast fails.
- Out: cream paper, rounded SaaS cards, neon glow, glassmorphism, copied host logos and trademarks.

## Evidence on Hand

No customer evidence, testimonials, benchmarks, or price list. Sample project names, deployment rows, and logs are fixtures. The domain registration and Cloudflare DNS are real; the console is not deployed there yet.

## Product Principles

- The shell is the page. Show the job, not a slogan row.
- Every primary control navigates or changes visible local state.
- Sample data stays labeled as sample.
- The infrastructure plan is a plan until an account is connected.
- Keyboard focus stays visible.

## Accessibility & Inclusion

Semantic controls, visible focus, and a command palette that works from the keyboard. Usable at a 1440 desktop width and a 390 narrow width.

## Backend extension (2026-10-23)

The owner authorized backend development targeting AWS and Cloudflare DNS only.
The sample-only restrictions above apply to the original console routes. `/connect`,
`backend/`, and `infrastructure/` implement the separate first-stage control plane.
See docs/backend.md for the current delivered scope, release instructions, and limitations.
AWS plugin access does not supply credentials to the running application.
Infrastructure execution and DNS cutover remain explicit release steps.
