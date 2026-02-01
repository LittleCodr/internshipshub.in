import type { Metadata } from "next";
import { SiteHeader } from "@components/site-header";
import { SiteFooter } from "@components/site-footer";
import { JsonLd } from "@components/json-ld";
import { DEFAULT_SITE_METADATA } from "@lib/seo";
import { buildOrganizationSchema } from "@lib/schema";
import "../styles/globals.css";

export const metadata: Metadata = DEFAULT_SITE_METADATA;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50">
        <JsonLd json={JSON.stringify(buildOrganizationSchema())} />
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
