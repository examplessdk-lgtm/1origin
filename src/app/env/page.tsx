import { Suspense } from "react";
import { EnvScreen } from "@/app/env/env-screen";
import { PageFrame } from "@/components/ui";

export const metadata = { title: "Environment" };

export default function EnvPage() {
  return (
    <Suspense
      fallback={
        <PageFrame title="Environment" lede="Loading sample variables.">
          <p className="px-4 py-4 text-muted">Loading sample variables.</p>
        </PageFrame>
      }
    >
      <EnvScreen />
    </Suspense>
  );
}
