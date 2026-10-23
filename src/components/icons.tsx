import type { NavIcon } from "@/lib/nav";

const paths: Record<NavIcon, string> = {
  projects: "M2.5 4.5h4l1.2 1.5H13.5v7.5h-11z",
  deployments: "M3 12.5h10M8 10.5V3.5M5.2 6.2 8 3.5l2.8 2.7",
  env: "M6.2 8.2a2.2 2.2 0 1 0-2.2-2.2H2.5v1.6H4v1.2h1.5V8.2h.7zM9 6.2h4.5M9 8.6h3",
  domains: "M2.5 3.5h11v9h-11zM2.5 6.2h11M5 8.6h4",
  logs: "M3 4.5h10M3 8h7.5M3 11.5h9",
  team: "M3 4.2h4.2v4.2H3zM8.8 4.2H13v4.2H8.8zM3.4 13.2v-1.4h3.4v1.4M9.2 13.2v-1.4h3.4v1.4",
  settings: "M2.5 4.2h11M2.5 8h11M2.5 11.8h11M6 2.8v2.8M10.2 6.6v2.8M7.2 10.4v2.8",
};

export function Icon({ name, className }: { name: NavIcon; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={className ?? "size-4"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
    >
      <path d={paths[name]} />
    </svg>
  );
}

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className ?? "size-4"}>
      <rect x="1.25" y="1.25" width="13.5" height="13.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M8 4.25v7.5M4.25 8h7.5" stroke="currentColor" strokeWidth="1" />
      <rect x="7" y="7" width="2" height="2" fill="var(--focus)" />
    </svg>
  );
}
