import type { Metadata } from "next";

import { StructuredData } from "@/components/structured-data";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL, siteConfig } from "@/lib/site";

const PATH = "/contact";

export const metadata: Metadata = {
  title: "Contact InternshipsHub.in",
  description: "Reach the InternshipsHub.in editorial and partnerships team for listings, feedback, or collaboration.",
  alternates: {
    canonical: `${SITE_URL}${PATH}`
  }
};

export const runtime = "edge";

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: siteConfig.name, path: "/" },
          { name: "Contact", path: PATH }
        ])}
      />
      <h1 className="text-3xl font-bold text-slate-900">Contact Us</h1>
      <p className="text-base text-slate-700">
        We respond within two business days to employer listings, partnership requests, and user
        feedback that helps us tighten the internship discovery experience.
      </p>
      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Editorial & Listings</h2>
        <p className="text-sm text-slate-700">
          Share internship or job opportunities that meet our full-frontmatter requirements.
        </p>
        <p className="text-sm font-semibold text-primary">{siteConfig.email}</p>
      </section>
      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Partnerships & Media</h2>
        <p className="text-sm text-slate-700">
          Collaborate on university outreach, employer branding, or structured data integrations.
        </p>
        <p className="text-sm font-semibold text-primary">{siteConfig.email}</p>
      </section>
      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Feedback</h2>
        <p className="text-sm text-slate-700">
          Found inaccurate information? Report it so we can update the listing and keep our dataset
          trustworthy for students.
        </p>
        <p className="text-sm font-semibold text-primary">{siteConfig.email}</p>
      </section>
    </div>
  );
}
