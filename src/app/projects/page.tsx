import Link from "next/link";
import { PageFrame } from "@/components/ui";
import { StatusMark } from "@/components/ui";
import { latestFor, projects } from "@/lib/sample";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <PageFrame
      title="Projects"
      lede="Four sample projects. None of these are customers. New projects wait until the AWS account is connected."
      actions={
        <Link href="/settings" className="inline-flex h-8 items-center border border-line px-2.5 text-[13px] hover:bg-raised">
          Read the plan
        </Link>
      }
    >
      <div className="hidden md:block">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">Sample projects</caption>
          <colgroup>
            <col />
            <col className="w-[8rem]" />
            <col className="w-[8rem]" />
            <col className="w-[8rem]" />
            <col className="w-[8.5rem]" />
          </colgroup>
          <thead className="font-mono text-[11px] text-muted">
            <tr className="border-b border-line">
              <th scope="col" className="px-4 py-2 font-normal">Project</th>
              <th scope="col" className="px-4 py-2 font-normal">Framework</th>
              <th scope="col" className="px-4 py-2 font-normal">Branch</th>
              <th scope="col" className="px-4 py-2 font-normal">Latest</th>
              <th scope="col" className="px-4 py-2 font-normal">Deploy</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const latest = latestFor(project.slug);
              return (
                <tr key={project.slug} className="border-b border-line hover:bg-raised">
                  <td className="px-4 py-2">
                    <Link href={`/projects/${project.slug}`} className="underline decoration-line underline-offset-4">
                      {project.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-muted">{project.framework}</td>
                  <td className="px-4 py-2 font-mono text-[12px] text-muted">{project.branch}</td>
                  <td className="px-4 py-2">{latest ? <StatusMark status={latest.status} /> : null}</td>
                  <td className="px-4 py-2 font-mono text-[12px]">
                    {latest ? (
                      <Link href={`/deployments/${latest.id}`} className="hover:text-focus">
                        {latest.id}
                      </Link>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ul className="md:hidden">
        {projects.map((project) => {
          const latest = latestFor(project.slug);
          return (
            <li key={project.slug} className="border-b border-line px-3 py-3">
              <div className="flex items-center justify-between gap-3">
                <Link href={`/projects/${project.slug}`} className="underline decoration-line underline-offset-4">
                  {project.name}
                </Link>
                {latest ? <StatusMark status={latest.status} /> : null}
              </div>
              <p className="mt-1 font-mono text-[11px] text-muted">
                {project.framework} · {project.branch}
                {latest ? ` · ${latest.id}` : ""}
              </p>
            </li>
          );
        })}
      </ul>
    </PageFrame>
  );
}
