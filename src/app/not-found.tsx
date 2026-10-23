import Link from "next/link";
import { ghostClass, primaryClass } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-0 flex-1 overflow-auto px-4 py-6">
      <h1 className="text-[15px] font-medium">File not found</h1>
      <p className="mt-2 max-w-[68ch] text-[13px] leading-5 text-muted">
        That path is not in the sample workspace.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/projects" className={primaryClass()}>
          Open console
        </Link>
        <Link href="/" className={ghostClass()}>
          Back to session
        </Link>
      </div>
    </div>
  );
}
