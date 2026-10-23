import { CopyButton } from "@/components/copy-button";
import { PageFrame } from "@/components/ui";
import { infrastructure } from "@/lib/sample";

export const metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <PageFrame
      title="Settings"
      lede="The console will run on AWS Singapore once the account is connected. This page is the plan. Those resources are not provisioned, and this workspace cannot create them."
    >
      <section id="plan" className="scroll-mt-2 border-b border-line">
        <h2 className="px-3 pt-4 pb-2 text-[13px] font-medium sm:px-4">Infrastructure plan</h2>
        <p className="max-w-[68ch] px-3 pb-3 text-[13px] leading-5 text-muted sm:px-4">
          Data will live in Aurora PostgreSQL. Files will live in S3. The build queue will use SQS.
          Realtime status will use ElastiCache Redis. Encryption will use KMS. The edge will use CloudFront.
          Each row is planned, not present.
        </p>
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Planned infrastructure</caption>
          <thead className="font-mono text-[11px] text-muted">
            <tr className="border-b border-line">
              <th scope="col" className="px-3 py-2 font-normal sm:px-4">Service</th>
              <th scope="col" className="px-3 py-2 font-normal sm:px-4">Purpose</th>
              <th scope="col" className="px-3 py-2 font-normal sm:px-4">State</th>
            </tr>
          </thead>
          <tbody>
            {infrastructure.map((item) => (
              <tr key={item.id} className="border-b border-line">
                <th scope="row" className="px-3 py-2 text-left text-[13px] font-medium sm:px-4">
                  {item.service}
                </th>
                <td className="px-3 py-2 text-[13px] text-muted sm:px-4">{item.purpose}</td>
                <td className="px-3 py-2 font-mono text-[12px] text-wait sm:px-4">Planned</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section id="region" className="scroll-mt-2 px-3 py-4 sm:px-4">
        <h2 className="text-[13px] font-medium">Region</h2>
        <p className="mt-2 max-w-[68ch] text-[13px] leading-5">
          Singapore, <span className="font-mono">ap-southeast-1</span>. The account is not connected.
          Pricing is not offered.
        </p>
        <div className="mt-3">
          <CopyButton value="ap-southeast-1" label="Copy region" />
        </div>
      </section>
    </PageFrame>
  );
}
