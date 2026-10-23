import { Suspense } from "react";
import { DeploymentsScreen } from "@/app/deployments/deployments-screen";
import { PageFrame } from "@/components/ui";

export const metadata = { title: "Deployments" };

export default function DeploymentsPage() {
  return (
    <Suspense
      fallback={
        <PageFrame title="Deployments" lede="Loading the sample builds.">
          <p className="px-4 py-4 text-muted">Loading sample deployments.</p>
        </PageFrame>
      }
    >
      <DeploymentsScreen />
    </Suspense>
  );
}
