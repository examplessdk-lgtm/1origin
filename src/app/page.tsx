import Link from "next/link";
import { EntryActions } from "@/components/entry-actions";
import { StatusMark } from "@/components/ui";
import { latestFor, projects } from "@/lib/sample";

const fields = [
  ["workspace", "origin"],
  ["domain", "1origin.dev"],
  ["dns", "cloudflare"],
  ["tls", "required (.dev)"],
  ["region", "ap-southeast-1, planned"],
  ["account", "not connected"],
];

export default function HomePage() {
  const latest = projects.map((project) => ({
    project,
    deployment: latestFor(project.slug),
  }));

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-auto lg:flex-row lg:overflow-hidden">
      <section className="min-w-0 lg:min-h-0 lg:flex-1 lg:overflow-auto" aria-labelledby="session-title">
        <div className="flex h-8 items-center border-b border-line px-3">
          <h1 id="session-title" className="font-mono text-[12px]">
            session.origin
          </h1>
        </div>
        <div className="px-3 py-3 sm:px-4">
          <ol className="font-mono text-[12px] leading-6">
            {fields.map(([key, value], index) => (
              <li key={key} className="grid grid-cols-[2rem_7.5rem_minmax(0,1fr)] gap-2">
                <span className="text-muted">{index + 1}</span>
                <span className="text-muted">{key}</span>
                <span className={key === "account" ? "text-wait" : "text-ink"}>
                  {value}
                  {index === fields.length - 1 ? (
                    <span aria-hidden="true" className="origin-caret ml-1 inline-block h-3.5 w-1.5 translate-y-0.5 bg-focus" />
                  ) : null}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-4 max-w-[68ch] text-[13px] leading-5">
            Sample session. Open the console to inspect projects, deployments, variables, domains, logs, and roles.
            The console will run on AWS Singapore once the account is connected.
          </p>
          <div className="mt-4">
            <EntryActions />
          </div>
        </div>
      </section>
      <section
        aria-labelledby="output-title"
        className="border-t border-line lg:flex lg:w-80 lg:shrink-0 lg:flex-col lg:overflow-auto lg:border-t-0 lg:border-l"
      >
        <div className="flex h-8 items-center border-b border-line px-3">
          <h2 id="output-title" className="font-mono text-[12px]">
            Output
          </h2>
        </div>
        <p className="px-3 pt-2 font-mono text-[11px] text-muted">Latest sample deploy per project</p>
        <ul>
          {latest.map(({ project, deployment }) =>
            deployment ? (
              <li key={project.slug} className="border-b border-line">
                <Link
                  href={`/deployments/${deployment.id}`}
                  className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-baseline gap-2 px-3 py-2 hover:bg-raised"
                >
                  <StatusMark status={deployment.status} />
                  <span className="min-w-0">
                    <span className="block truncate">{project.name}</span>
                    <span className="block truncate font-mono text-[11px] text-muted">{deployment.id}</span>
                  </span>
                </Link>
              </li>
            ) : null,
          )}
        </ul>
        <p className="px-3 py-3 text-[13px] leading-5 text-muted">
          sample-api failed on the catalog fixture. The preview hostnames are samples, not live sites.
        </p>
      </section>
    </div>
  );
}
