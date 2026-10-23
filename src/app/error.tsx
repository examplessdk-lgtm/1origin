"use client";

import { primaryClass } from "@/components/ui";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-0 flex-1 overflow-auto px-4 py-6">
      <h1 className="text-[15px] font-medium">This view failed to render</h1>
      <p className="mt-2 max-w-[68ch] text-[13px] leading-5 text-muted">
        The sample workspace hit a problem in this view. Retry it.
      </p>
      <button type="button" className={`${primaryClass()} mt-4`} onClick={reset}>
        Try again
      </button>
    </div>
  );
}
