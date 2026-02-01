import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StructuredData } from "@/components/structured-data";
import { buildOrganizationSchema } from "@/lib/schema";
import { baseMetadata } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = baseMetadata;
export const runtime = "edge";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-slate-50">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <SiteHeader />
        <StructuredData data={buildOrganizationSchema()} />
        <main className="flex-1 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</div>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
