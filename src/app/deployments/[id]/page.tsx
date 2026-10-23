import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { CopyButton } from "@/components/copy-button";
import { ghostClass, PageFrame } from "@/components/ui";
import { StatusMark } from "@/components/ui";
import { deployments, getDeployment } from "@/lib/sample";

export function generateStaticParams() {
  return deployments.map((deployment) => ({ id: deployment.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return { title: getDeployment(id)?.id ?? "Deployment" };
}

export default function DeploymentPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense
      fallback={
        <PageFrame title="Deployment" lede="Loading the sample deploy.">
          <p className="px-4 py-4 text-muted">Loading the sample log.</p>
        </PageFrame>
      }
    >
      <DeploymentBody params={params} />
    </Suspense>
  );
}

async function DeploymentBody({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deployment = getDeployment(id);
  if (!deployment) notFound();

  return (
    <PageFrame
      title={deployment.id}
      lede={deployment.message}
      actions={
        <>
          <Link href={`/projects/${deployment.project}`} className={ghostClass()}>
            {deployment.project}
          </Link>
          <Link href="/deployments" className={ghostClass()}>
            All deploys
          </Link>
        </>
      }
    >
      <div className="flex flex-wrap items-center gap-3 border-b border-line px-4 py-3">
        <StatusMark status={deployment.status} />
        <span className="font-mono text-[12px] text-muted">
          {deployment.target} · {deployment.branch} · {deployment.commit}
        </span>
      </div>
      <dl className="grid gap-px border-b border-line bg-line sm:grid-cols-2">
        <Item term="Author" value={deployment.author} />
        <Item term="When" value={deployment.created} />
        <Item term="Duration" value={deployment.duration} />
        <Item term="Project" value={deployment.project} />
      </dl>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
        <p className="min-w-0 font-mono text-[12px] break-all text-muted">
          Sample preview URL, not a live site: {deployment.previewUrl}
        </p>
        <CopyButton value={deployment.previewUrl} label="Copy sample URL" />
      </div>
      <h2 className="px-4 pt-4 pb-2 text-[13px] font-medium">Sample build log</h2>
      <pre className="mx-3 mb-4 overflow-x-auto border border-line bg-sidebar p-3 font-mono text-[12px] leading-5 sm:mx-4">
        {deployment.log.map((line) => (
          <div
            key={line}
            className={
              line.startsWith("ERROR") ? "text-fail" : line.startsWith("WARN") ? "text-wait" : "text-ink"
            }
          >
            {line}
          </div>
        ))}
      </pre>
      <p className="px-4 pb-6 text-[13px] text-muted">
        This log is a fixture. The build queue is not connected.{" "}
        <Link href="/settings" className="text-ink underline decoration-line underline-offset-4">
          Read the plan
        </Link>
      </p>
    </PageFrame>
  );
}

function Item({ term, value }: { term: string; value: string }) {
  return (
    <div className="bg-ground px-4 py-2">
      <dt className="font-mono text-[11px] text-muted">{term}</dt>
      <dd className="mt-1 font-mono text-[12px]">{value}</dd>
    </div>
  );
}
