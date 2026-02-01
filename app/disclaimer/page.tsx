import type { Metadata } from "next";

import { StructuredData } from "@/components/structured-data";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL, siteConfig } from "@/lib/site";

const PATH = "/disclaimer";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer for the accuracy, completeness, and usage of listings on InternshipsHub.in.",
  alternates: {
    canonical: `${SITE_URL}${PATH}`
  }
};

export const runtime = "edge";

export default function DisclaimerPage() {
  return (
    <div className="space-y-6">
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: siteConfig.name, path: "/" },
          { name: "Disclaimer", path: PATH }
        ])}
      />
      <h1 className="text-3xl font-bold text-slate-900">Disclaimer</h1>
      <p className="text-base text-slate-700">
        {siteConfig.name} curates internship, job, and research listings sourced from employer portals
        and official announcements. We validate every frontmatter field but advise applicants to
        verify details directly with the hiring organisation before committing.
      </p>
      <ul className="list-disc space-y-2 pl-6 text-sm text-slate-700">
        <li>We do not guarantee interview calls, offers, or stipend payouts.</li>
        <li>We are not responsible for third-party application portals or their downtime.</li>
        <li>Users must exercise caution against fraudulent offers or upfront payment requests.</li>
      </ul>
      <p className="text-sm text-slate-700">
        By using this platform you agree that {siteConfig.name} will not be liable for direct or
        indirect loss arising from interactions with external organisations listed here.
      </p>
    </div>
  );
}
