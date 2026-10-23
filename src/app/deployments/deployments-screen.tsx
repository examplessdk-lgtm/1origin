"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DeployTable } from "@/components/deploy-table";
import { controlClass, PageFrame } from "@/components/ui";
import { filterDeployments, statusFromQuery, type DeployStatus } from "@/lib/sample";

const filters: { id: DeployStatus | "all"; label: string; href: string }[] = [
  { id: "all", label: "All", href: "/deployments" },
  { id: "ready", label: "Ready", href: "/deployments?status=ready" },
  { id: "failed", label: "Failed", href: "/deployments?status=failed" },
  { id: "building", label: "Building", href: "/deployments?status=building" },
  { id: "queued", label: "Queued", href: "/deployments?status=queued" },
];

export function DeploymentsScreen() {
  const status = statusFromQuery(useSearchParams().get("status") ?? undefined);
  const rows = filterDeployments({ status });

  return (
    <PageFrame
      title="Deployments"
      lede="Sample builds. Ready is green, failed is red, building and queued are amber. Preview hostnames are not live sites."
      actions={filters.map((filter) => (
        <Link
          key={filter.id}
          href={filter.href}
          aria-current={filter.id === status ? "page" : undefined}
          className={controlClass(filter.id === status)}
        >
          {filter.label}
        </Link>
      ))}
    >
      <DeployTable rows={rows} caption="Sample deployments" />
    </PageFrame>
  );
}
