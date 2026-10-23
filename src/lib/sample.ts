export type DeployStatus = "ready" | "building" | "failed" | "queued";

export type Project = {
  slug: string;
  name: string;
  framework: string;
  branch: string;
  root: string;
  summary: string;
};

export type Deployment = {
  id: string;
  project: string;
  status: DeployStatus;
  commit: string;
  message: string;
  branch: string;
  author: string;
  created: string;
  duration: string;
  target: "production" | "preview";
  previewUrl: string;
  log: string[];
};

export type EnvVar = {
  key: string;
  value: string;
  target: string;
};

export type DomainRecord = {
  id: string;
  host: string;
  kind: string;
  state: string;
  dns: string;
  tls: string;
  detail: string;
};

export type LogLevel = "info" | "warn" | "error";

export type LogLine = {
  id: string;
  time: string;
  level: LogLevel;
  project: string;
  message: string;
};

export type Role = "Owner" | "Member" | "Viewer";

export type Member = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export const projects: Project[] = [
  {
    slug: "sample-storefront",
    name: "sample-storefront",
    framework: "Next.js",
    branch: "main",
    root: "fixtures/storefront",
    summary: "Sample storefront fixture used to exercise the console.",
  },
  {
    slug: "sample-docs",
    name: "sample-docs",
    framework: "Static",
    branch: "main",
    root: "fixtures/docs",
    summary: "Sample documentation fixture. The latest build is still running.",
  },
  {
    slug: "sample-api",
    name: "sample-api",
    framework: "Node",
    branch: "main",
    root: "fixtures/api",
    summary: "Sample API fixture. The latest build failed on purpose.",
  },
  {
    slug: "sample-worker",
    name: "sample-worker",
    framework: "Worker",
    branch: "main",
    root: "fixtures/worker",
    summary: "Sample worker fixture. The latest build is queued.",
  },
];

export const deployments: Deployment[] = [
  {
    id: "dpl_7f3a1c",
    project: "sample-storefront",
    status: "ready",
    commit: "s4mpl01",
    message: "Sample: adjust the catalog grid spacing",
    branch: "main",
    author: "sample.author",
    created: "22 Oct 2026, 14:06 UTC",
    duration: "48s",
    target: "production",
    previewUrl: "https://sample-storefront.preview.1origin.dev",
    log: [
      "INFO  sample build started for sample-storefront",
      "INFO  fixture root fixtures/storefront",
      "INFO  install skipped (sample lockfile cache)",
      "INFO  compile fixtures/storefront",
      "INFO  sample route /catalog ready",
      "READY sample deployment dpl_7f3a1c",
    ],
  },
  {
    id: "dpl_b19e04",
    project: "sample-api",
    status: "failed",
    commit: "s4mpl02",
    message: "Sample: fixture catalog step exits 1",
    branch: "main",
    author: "sample.author",
    created: "22 Oct 2026, 13:41 UTC",
    duration: "21s",
    target: "production",
    previewUrl: "https://sample-api.preview.1origin.dev",
    log: [
      "INFO  sample build started for sample-api",
      "INFO  fixture root fixtures/api",
      "INFO  compile fixtures/api",
      "WARN  sample fixture catalog took 4s",
      "ERROR sample step catalog exited 1",
      "ERROR sample deployment dpl_b19e04 failed",
    ],
  },
  {
    id: "dpl_91ab02",
    project: "sample-docs",
    status: "building",
    commit: "s4mpl03",
    message: "Sample: rebuild the docs fixture",
    branch: "main",
    author: "sample.author",
    created: "22 Oct 2026, 13:12 UTC",
    duration: "running",
    target: "preview",
    previewUrl: "https://sample-docs.preview.1origin.dev",
    log: [
      "INFO  sample build started for sample-docs",
      "INFO  waiting on sample compiler",
      "INFO  compile fixtures/docs",
    ],
  },
  {
    id: "dpl_0e55aa",
    project: "sample-worker",
    status: "queued",
    commit: "s4mpl04",
    message: "Sample: queue the worker fixture",
    branch: "main",
    author: "sample.author",
    created: "22 Oct 2026, 12:58 UTC",
    duration: "waiting",
    target: "preview",
    previewUrl: "https://sample-worker.preview.1origin.dev",
    log: [
      "INFO  sample deployment dpl_0e55aa accepted",
      "INFO  sample queue position 1",
      "INFO  build has not started",
    ],
  },
  {
    id: "dpl_c44e18",
    project: "sample-storefront",
    status: "failed",
    commit: "s4mpl05",
    message: "Sample: broken fixture import",
    branch: "preview/grid",
    author: "sample.author",
    created: "21 Oct 2026, 18:22 UTC",
    duration: "16s",
    target: "preview",
    previewUrl: "https://sample-storefront-grid.preview.1origin.dev",
    log: [
      "INFO  sample build started for sample-storefront",
      "ERROR sample import fixtures/storefront/missing-module",
      "ERROR sample deployment dpl_c44e18 failed",
    ],
  },
  {
    id: "dpl_55d012",
    project: "sample-api",
    status: "building",
    commit: "s4mpl06",
    message: "Sample: retry the api fixture",
    branch: "preview/retry",
    author: "sample.author",
    created: "21 Oct 2026, 16:03 UTC",
    duration: "running",
    target: "preview",
    previewUrl: "https://sample-api-retry.preview.1origin.dev",
    log: [
      "INFO  sample build started for sample-api",
      "INFO  compile fixtures/api",
    ],
  },
  {
    id: "dpl_18aa70",
    project: "sample-docs",
    status: "ready",
    commit: "s4mpl07",
    message: "Sample: publish the docs fixture",
    branch: "main",
    author: "sample.author",
    created: "21 Oct 2026, 11:40 UTC",
    duration: "36s",
    target: "production",
    previewUrl: "https://sample-docs.preview.1origin.dev",
    log: [
      "INFO  sample build started for sample-docs",
      "READY sample deployment dpl_18aa70",
    ],
  },
  {
    id: "dpl_77c0de",
    project: "sample-worker",
    status: "ready",
    commit: "s4mpl08",
    message: "Sample: worker fixture baseline",
    branch: "main",
    author: "sample.author",
    created: "20 Oct 2026, 09:15 UTC",
    duration: "27s",
    target: "production",
    previewUrl: "https://sample-worker.preview.1origin.dev",
    log: [
      "INFO  sample build started for sample-worker",
      "READY sample deployment dpl_77c0de",
    ],
  },
];

export const envVars: Record<string, EnvVar[]> = {
  "sample-storefront": [
    {
      key: "SAMPLE_DATABASE_URL",
      value: "postgres://sample:sample@localhost:5432/sample_storefront",
      target: "sample",
    },
    {
      key: "SAMPLE_PUBLIC_FLAG",
      value: "sample-true",
      target: "sample",
    },
  ],
  "sample-docs": [
    {
      key: "SAMPLE_DOCS_BASE",
      value: "https://sample-docs.example/docs",
      target: "sample",
    },
  ],
  "sample-api": [
    {
      key: "SAMPLE_API_TOKEN",
      value: "sample_token_not_a_secret",
      target: "sample",
    },
    {
      key: "SAMPLE_API_ORIGIN",
      value: "https://sample-api.example",
      target: "sample",
    },
  ],
  "sample-worker": [
    {
      key: "SAMPLE_QUEUE_NAME",
      value: "sample-builds",
      target: "sample",
    },
  ],
};

export const domains: DomainRecord[] = [
  {
    id: "product",
    host: "1origin.dev",
    kind: "Product domain",
    state: "Registered",
    dns: "Cloudflare",
    tls: "HTTPS required (.dev)",
    detail:
      "This product's domain. DNS is on Cloudflare. No site is served yet. The .dev TLD forces HTTPS.",
  },
  {
    id: "storefront-alias",
    host: "sample-storefront.1origin.dev",
    kind: "Sample alias",
    state: "Sample",
    dns: "Sample record",
    tls: "Sample",
    detail:
      "Sample alias for sample-storefront. The hostname is a fixture, not a live site.",
  },
  {
    id: "customer",
    host: "shop.example",
    kind: "Sample customer domain",
    state: "Pending",
    dns: "Sample record",
    tls: "Sample",
    detail:
      "Sample customer domain. Verification is a fixture. shop.example is not a real customer.",
  },
];

export const logLines: LogLine[] = [
  {
    id: "l1",
    time: "14:06:12",
    level: "info",
    project: "sample-storefront",
    message: "sample request GET /catalog 200",
  },
  {
    id: "l2",
    time: "14:06:14",
    level: "info",
    project: "sample-storefront",
    message: "sample request GET /catalog/item 200",
  },
  {
    id: "l3",
    time: "13:41:08",
    level: "error",
    project: "sample-api",
    message: "sample step catalog exited 1",
  },
  {
    id: "l4",
    time: "13:41:09",
    level: "error",
    project: "sample-api",
    message: "sample deployment dpl_b19e04 failed",
  },
  {
    id: "l5",
    time: "13:12:44",
    level: "info",
    project: "sample-docs",
    message: "sample compiler still running",
  },
  {
    id: "l6",
    time: "13:12:51",
    level: "warn",
    project: "sample-docs",
    message: "sample font fixture missing, using fallback",
  },
  {
    id: "l7",
    time: "12:58:02",
    level: "info",
    project: "sample-worker",
    message: "sample queue accepted dpl_0e55aa",
  },
  {
    id: "l8",
    time: "12:58:03",
    level: "warn",
    project: "sample-worker",
    message: "sample queue has no connected worker",
  },
  {
    id: "l9",
    time: "11:40:19",
    level: "info",
    project: "sample-docs",
    message: "sample deployment dpl_18aa70 ready",
  },
  {
    id: "l10",
    time: "09:15:40",
    level: "info",
    project: "sample-worker",
    message: "sample deployment dpl_77c0de ready",
  },
  {
    id: "l11",
    time: "18:22:11",
    level: "error",
    project: "sample-storefront",
    message: "sample import missing-module",
  },
  {
    id: "l12",
    time: "16:03:27",
    level: "info",
    project: "sample-api",
    message: "sample retry dpl_55d012 compiling",
  },
];

export const members: Member[] = [
  {
    id: "m-owner",
    name: "sample.owner",
    email: "owner@sample.invalid",
    role: "Owner",
  },
  {
    id: "m-ops",
    name: "sample.ops",
    email: "ops@sample.invalid",
    role: "Member",
  },
  {
    id: "m-review",
    name: "sample.reviewer",
    email: "reviewer@sample.invalid",
    role: "Viewer",
  },
];

export const roles: { name: Role; detail: string }[] = [
  {
    name: "Owner",
    detail: "Sample role. Can change the workspace in a connected account.",
  },
  {
    name: "Member",
    detail: "Sample role. Can inspect projects and deployments.",
  },
  {
    name: "Viewer",
    detail: "Sample role. Can read the console. Cannot change roles.",
  },
];

export const infrastructure = [
  {
    id: "aurora",
    service: "Aurora PostgreSQL",
    purpose: "Application data",
  },
  {
    id: "s3",
    service: "S3",
    purpose: "Files and build artifacts",
  },
  {
    id: "sqs",
    service: "SQS",
    purpose: "Build queue",
  },
  {
    id: "redis",
    service: "ElastiCache Redis",
    purpose: "Realtime deployment status",
  },
  {
    id: "kms",
    service: "KMS",
    purpose: "Encryption",
  },
  {
    id: "cloudfront",
    service: "CloudFront",
    purpose: "Edge",
  },
];

export const STATUS_LABEL: Record<DeployStatus, string> = {
  ready: "Ready",
  building: "Building",
  failed: "Failed",
  queued: "Queued",
};

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getDeployment(id: string) {
  return deployments.find((deployment) => deployment.id === id);
}

export function latestFor(slug: string) {
  return deployments.find((deployment) => deployment.project === slug);
}

export function filterDeployments(opts: {
  project?: string;
  status?: DeployStatus | "all";
}) {
  return deployments.filter((deployment) => {
    if (opts.project && deployment.project !== opts.project) return false;
    if (opts.status && opts.status !== "all" && deployment.status !== opts.status) {
      return false;
    }
    return true;
  });
}

export function statusFromQuery(value: string | string[] | undefined): DeployStatus | "all" {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "ready" || raw === "failed" || raw === "building" || raw === "queued") {
    return raw;
  }
  return "all";
}

export function projectFromQuery(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw && getProject(raw)) return raw;
  return projects[0].slug;
}

export type PaletteCommand = {
  group: string;
  label: string;
  href: string;
  hint?: string;
};

export function paletteCommands(): PaletteCommand[] {
  return [
    { group: "Navigate", label: "Session", href: "/", hint: "Entry" },
    { group: "Navigate", label: "Projects", href: "/projects" },
    { group: "Navigate", label: "Deployments", href: "/deployments" },
    { group: "Navigate", label: "Environment", href: "/env" },
    { group: "Navigate", label: "Domains", href: "/domains" },
    { group: "Navigate", label: "Logs", href: "/logs" },
    { group: "Navigate", label: "Team", href: "/team" },
    { group: "Navigate", label: "Settings", href: "/settings" },
    { group: "Deployments", label: "Ready deploys", href: "/deployments?status=ready" },
    { group: "Deployments", label: "Failed deploys", href: "/deployments?status=failed" },
    { group: "Deployments", label: "Building deploys", href: "/deployments?status=building" },
    { group: "Deployments", label: "Queued deploys", href: "/deployments?status=queued" },
    ...projects.map((project) => ({
      group: "Projects",
      label: project.name,
      href: `/projects/${project.slug}`,
      hint: project.framework,
    })),
    ...deployments.map((deployment) => ({
      group: "Deployments",
      label: deployment.id,
      href: `/deployments/${deployment.id}`,
      hint: `${deployment.project} · ${STATUS_LABEL[deployment.status]}`,
    })),
    ...projects.map((project) => ({
      group: "Environment",
      label: `${project.name} variables`,
      href: `/env?project=${project.slug}`,
    })),
  ];
}
