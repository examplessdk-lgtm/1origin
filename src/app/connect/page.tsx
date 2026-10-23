import { Suspense } from "react";
import { ConnectScreen } from "./screen";

export const metadata = { title: "Connect AWS backend" };
export default function ConnectPage() {
  return <Suspense fallback={<p className="p-4">Loading connection…</p>}><ConnectScreen /></Suspense>;
}
