import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Public_Sans } from "next/font/google";
import { Shell } from "@/components/shell";
import "./globals.css";

const sans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://1origin.dev"),
  title: {
    default: "Origin",
    template: "%s · Origin",
  },
  description:
    "Origin is a deployment console. This workspace is sample data. The AWS account is not connected.",
};

export const viewport: Viewport = {
  themeColor: "#0e0e0e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} h-full`}>
      <body className="h-full bg-ground font-sans text-ink antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
