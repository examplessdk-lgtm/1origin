"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { EnvTable } from "@/app/env/env-table";
import { controlClass, PageFrame } from "@/components/ui";
import { envVars, projectFromQuery, projects } from "@/lib/sample";

export function EnvScreen() {
  const project = projectFromQuery(useSearchParams().get("project") ?? undefined);
  const vars = envVars[project] ?? [];

  return (
    <PageFrame
      title="Environment"
      lede={`Sample variables for ${project}. Values are fixtures, masked until you reveal them. Nothing here is a connected store.`}
      actions={projects.map((item) => (
        <Link
          key={item.slug}
          href={`/env?project=${item.slug}`}
          aria-current={item.slug === project ? "page" : undefined}
          className={controlClass(item.slug === project)}
        >
          {item.name.replace("sample-", "")}
        </Link>
      ))}
    >
      <EnvTable vars={vars} />
    </PageFrame>
  );
}
