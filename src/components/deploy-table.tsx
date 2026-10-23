import Link from "next/link";
import type { Deployment } from "@/lib/sample";
import { StatusMark } from "@/components/ui";

export function DeployTable({ rows, caption }: { rows: Deployment[]; caption: string }) {
  if (rows.length === 0) {
    return (
      <p className="px-4 py-6 text-[13px] text-muted">
        No sample deployments in this state.{" "}
        <Link href="/deployments" className="text-ink underline decoration-line underline-offset-4">
          Show all
        </Link>
      </p>
    );
  }

  return (
    <>
      <div className="hidden md:block">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">{caption}</caption>
          <colgroup>
            <col className="w-[7.5rem]" />
            <col className="w-[8.5rem]" />
            <col className="w-[11rem]" />
            <col />
            <col className="w-[8rem]" />
            <col className="w-[5.5rem]" />
          </colgroup>
          <thead className="font-mono text-[11px] text-muted">
            <tr className="border-b border-line">
              <th scope="col" className="px-4 py-2 font-normal">Status</th>
              <th scope="col" className="px-4 py-2 font-normal">Deploy</th>
              <th scope="col" className="px-4 py-2 font-normal">Project</th>
              <th scope="col" className="px-4 py-2 font-normal">Message</th>
              <th scope="col" className="px-4 py-2 font-normal">Branch</th>
              <th scope="col" className="px-4 py-2 font-normal">Time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-line hover:bg-raised">
                <td className="px-4 py-2">
                  <StatusMark status={row.status} />
                </td>
                <td className="px-4 py-2 font-mono text-[12px]">
                  <Link href={`/deployments/${row.id}`} className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
                    {row.id}
                  </Link>
                </td>
                <td className="truncate px-4 py-2">
                  <Link href={`/projects/${row.project}`} className="hover:text-focus">
                    {row.project}
                  </Link>
                </td>
                <td className="truncate px-4 py-2" title={row.message}>
                  {row.message}
                </td>
                <td className="truncate px-4 py-2 font-mono text-[12px] text-muted">{row.branch}</td>
                <td className="px-4 py-2 font-mono text-[12px] text-muted">{row.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="md:hidden">
        {rows.map((row) => (
          <li key={row.id} className="border-b border-line px-3 py-3">
            <div className="flex items-center justify-between gap-3">
              <StatusMark status={row.status} />
              <span className="font-mono text-[11px] text-muted">{row.duration}</span>
            </div>
            <Link href={`/deployments/${row.id}`} className="mt-1 block font-mono text-[12px] text-ink underline decoration-line underline-offset-4">
              {row.id}
            </Link>
            <p className="mt-1 text-[13px]">{row.message}</p>
            <p className="mt-1 font-mono text-[11px] text-muted">
              {row.project} · {row.branch}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
