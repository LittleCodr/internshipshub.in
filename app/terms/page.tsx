import type { Metadata } from "next";

import { StructuredData } from "@/components/structured-data";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL, siteConfig } from "@/lib/site";

const PATH = "/terms";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions governing the use of InternshipsHub.in, its listings, and APIs.",
  alternates: {
    canonical: `${SITE_URL}${PATH}`
  }
};

export const runtime = "edge";

export default function TermsPage() {
  return (
    <div className="space-y-6">
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: siteConfig.name, path: "/" },
          { name: "Terms & Conditions", path: PATH }
        ])}
      />
      <h1 className="text-3xl font-bold text-slate-900">Terms & Conditions</h1>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Acceptance</h2>
        <p className="text-sm text-slate-700">
          By browsing {siteConfig.name}, submitting listings, or applying through linked employer
          portals, you accept these Terms and Conditions.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Permitted Use</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-slate-700">
          <li>Use listings for personal career discovery or university placement support.</li>
          <li>Share links with attribution to {siteConfig.name}.</li>
          <li>Do not scrape or republish our structured data without prior consent.</li>
        </ul>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Content Ownership</h2>
        <p className="text-sm text-slate-700">
          Employers retain ownership of their job descriptions. {siteConfig.name} owns the structured
          presentation, schema enhancements, and taxonomy applied to those descriptions.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Limitations of Liability</h2>
        <p className="text-sm text-slate-700">
          We operate as an information aggregator. Decisions made on the basis of listings are solely
          the responsibility of applicants and employers.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
        <p className="text-sm text-slate-700">
          For clarifications on these terms, write to <span className="font-semibold text-primary">{siteConfig.email}</span>.
        </p>
      </section>
    </div>
  );
}
