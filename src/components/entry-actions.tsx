"use client";

import Link from "next/link";
import { useShell } from "@/components/shell-context";
import { ghostClass, primaryClass } from "@/components/ui";

export function EntryActions() {
  const { openPalette } = useShell();

  return (
    <div className="flex flex-wrap gap-2">
      <Link href="/projects" className={`${primaryClass()} h-11 md:h-8`}>
        Open console
      </Link>
      <Link href="/connect" className={`${ghostClass()} h-11 md:h-8`}>
        AWS backend
      </Link>
      <button type="button" className={`${ghostClass()} h-11 md:h-8`} onClick={openPalette}>
        Command palette
        <span className="ml-2 font-mono text-[11px] text-muted">Ctrl K</span>
      </button>
    </div>
  );
}
