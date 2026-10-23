import { CopyButton } from "@/components/copy-button";
import { PageFrame } from "@/components/ui";
import { domains } from "@/lib/sample";

export const metadata = { title: "Domains" };

export default function DomainsPage() {
  return (
    <PageFrame
      title="Domains"
      lede="1origin.dev is this product's domain. The other hosts are samples. No customer domain is attached."
    >
      <ul>
        {domains.map((domain) => (
          <li key={domain.id} id={`domain-${domain.id}`} className="scroll-mt-2 border-b border-line px-3 py-4 sm:px-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-mono text-[13px] break-all">{domain.host}</h2>
                <p className="mt-1 font-mono text-[11px] text-muted">
                  {domain.kind} · {domain.state} · {domain.dns} · {domain.tls}
                </p>
              </div>
              <CopyButton value={domain.host} label="Copy host" />
            </div>
            <p className="mt-2 max-w-[68ch] text-[13px] leading-5 text-muted">{domain.detail}</p>
          </li>
        ))}
      </ul>
    </PageFrame>
  );
}
