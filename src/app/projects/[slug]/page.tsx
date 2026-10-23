import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { DeployTable } from "@/components/deploy-table";
import { ghostClass, PageFrame } from "@/components/ui";
import { StatusMark } from "@/components/ui";
import { filterDeployments, getProject, latestFor, projects } from "@/lib/sample";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project?.name ?? "Project" };
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense
      fallback={
        <PageFrame title="Project" lede="Loading the sample project.">
          <p className="px-4 py-4 text-muted">Loading the sample project.</p>
        </PageFrame>
      }
    >
      <ProjectBody params={params} />
    </Suspense>
  );
}

async function ProjectBody({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const latest = latestFor(project.slug);
  const rows = filterDeployments({ project: project.slug });

  return (
    <PageFrame
      title={project.name}
      lede={project.summary}
      actions={
        <>
          <Link href={`/env?project=${project.slug}`} className={ghostClass()}>
            Variables
          </Link>
          <Link href="/deployments" className={ghostClass()}>
            All deploys
          </Link>
        </>
      }
    >
      <dl className="grid gap-px border-b border-line bg-line sm:grid-cols-2">
        <Fact term="Framework" value={project.framework} />
        <Fact term="Root" value={project.root} mono />
        <Fact term="Branch" value={project.branch} mono />
        <Fact term="Region plan" value="Singapore (ap-southeast-1), account not connected" />
        <div className="bg-ground px-4 py-2">
          <dt className="font-mono text-[11px] text-muted">Latest sample deploy</dt>
          <dd className="mt-1">
            {latest ? (
              <Link href={`/deployments/${latest.id}`} className="inline-flex items-center gap-2 hover:text-focus">
                <StatusMark status={latest.status} />
                <span className="font-mono text-[12px]">{latest.id}</span>
              </Link>
            ) : (
              "None"
            )}
          </dd>
        </div>
        <Fact
          term="Sample preview URL"
          value={latest ? `${latest.previewUrl} (not a live site)` : "None"}
          mono
        />
      </dl>
      <h2 className="px-4 pt-4 pb-2 text-[13px] font-medium">Deployments for this fixture</h2>
      <DeployTable rows={rows} caption={`Sample deployments for ${project.name}`} />
    </PageFrame>
  );
}

function Fact({ term, value, mono = false }: { term: string; value: string; mono?: boolean }) {
  return (
    <div className="min-w-0 bg-ground px-4 py-2">
      <dt className="font-mono text-[11px] text-muted">{term}</dt>
      <dd className={`mt-1 break-words ${mono ? "font-mono text-[12px]" : "text-[13px]"}`}>{value}</dd>
    </div>
  );
}
