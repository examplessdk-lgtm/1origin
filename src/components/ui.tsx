import type { ReactNode } from "react";
import type { DeployStatus } from "@/lib/sample";
import { STATUS_LABEL } from "@/lib/sample";

const tone: Record<DeployStatus, string> = {
  ready: "text-pass",
  failed: "text-fail",
  building: "text-wait",
  queued: "text-wait",
};

export function StatusMark({ status }: { status: DeployStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-[12px] ${tone[status]}`}>
      <span aria-hidden="true" className="inline-block size-1.5 bg-current" />
      {STATUS_LABEL[status]}
    </span>
  );
}

export function PageFrame({
  title,
  lede,
  actions,
  children,
}: {
  title: string;
  lede?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-0 min-w-0 flex-1 overflow-auto">
      <header className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-b border-line px-3 py-3 sm:px-4">
        <div className="min-w-0">
          <h1 className="text-[15px] font-medium text-ink">{title}</h1>
          {lede ? (
            <p className="mt-1 max-w-[68ch] text-[13px] leading-5 text-muted">{lede}</p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-1.5">{actions}</div> : null}
      </header>
      {children}
    </div>
  );
}

export function controlClass(active = false) {
  return active
    ? "inline-flex h-8 items-center border border-focus bg-selection px-2 font-mono text-[12px] text-ink"
    : "inline-flex h-8 items-center border border-line bg-ground px-2 font-mono text-[12px] text-muted hover:text-ink";
}

export function primaryClass() {
  return "origin-primary inline-flex h-8 items-center bg-focus px-2.5 text-[13px] font-medium text-focus-ink hover:bg-[#79b6ff]";
}

export function ghostClass() {
  return "inline-flex h-8 items-center border border-line bg-ground px-2.5 text-[13px] text-ink hover:bg-raised";
}
