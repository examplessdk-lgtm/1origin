"use client";

import { useState } from "react";
import type { EnvVar } from "@/lib/sample";
import { ghostClass } from "@/components/ui";

export function EnvTable({ vars }: { vars: EnvVar[] }) {
  const [shown, setShown] = useState<Record<string, boolean>>({});
  const allShown = vars.every((item) => shown[item.key]);

  function toggleAll() {
    if (allShown) {
      setShown({});
      return;
    }
    setShown(Object.fromEntries(vars.map((item) => [item.key, true])));
  }

  return (
    <div>
      <div className="flex justify-end border-b border-line px-3 py-2 sm:px-4">
        <button type="button" className={ghostClass()} onClick={toggleAll} aria-pressed={allShown}>
          {allShown ? "Hide values" : "Reveal values"}
        </button>
      </div>
      <table className="w-full table-fixed border-collapse text-left">
        <caption className="sr-only">Sample environment variables</caption>
        <thead className="font-mono text-[11px] text-muted">
          <tr className="border-b border-line">
            <th scope="col" className="w-[34%] px-3 py-2 font-normal sm:px-4">Key</th>
            <th scope="col" className="px-3 py-2 font-normal sm:px-4">Value</th>
            <th scope="col" className="w-[6.5rem] px-3 py-2 font-normal sm:px-4">
              <span className="sr-only">Visibility</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {vars.map((item) => {
            const open = Boolean(shown[item.key]);
            return (
              <tr key={item.key} className="border-b border-line align-top">
                <th scope="row" className="px-3 py-2 font-mono text-[12px] font-normal sm:px-4">
                  {item.key}
                </th>
                <td className="px-3 py-2 font-mono text-[12px] break-all sm:px-4">
                  {open ? (
                    item.value
                  ) : (
                    <span aria-label="Value hidden">••••••••</span>
                  )}
                </td>
                <td className="px-3 py-2 sm:px-4">
                  <button
                    type="button"
                    className={ghostClass()}
                    aria-pressed={open}
                    onClick={() => setShown((current) => ({ ...current, [item.key]: !open }))}
                  >
                    {open ? "Hide" : "Reveal"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
