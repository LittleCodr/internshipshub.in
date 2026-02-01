import type { Metadata } from "next";

import { StructuredData } from "@/components/structured-data";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL, siteConfig } from "@/lib/site";

const PATH = "/about";

export const metadata: Metadata = {
  title: "About InternshipsHub.in",
  description:
    "InternshipsHub.in is India’s focused internship and early-career job discovery engine with structured SEO and transparent insights.",
  alternates: {
    canonical: `${SITE_URL}${PATH}`
  }
};

export const runtime = "edge";

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: siteConfig.name, path: "/" },
          { name: "About", path: PATH }
        ])}
      />
      <h1 className="text-3xl font-bold text-slate-900">About {siteConfig.name}</h1>
      <p className="text-base text-slate-700">
        {siteConfig.name} is built to outrank generic job boards through a crawler-first architecture.
        We map every internship, job, and research role to Google JobPosting schema, publish fully
        enriched listings, and prioritise transparent stipend, eligibility, and deadline details.
      </p>
      <p className="text-base text-slate-700">
        We serve Indian students, graduates, and universities by aggregating trustworthy
        opportunities from startups, multinationals, government programs, and research labs. Our
        aggregation engine powers featured snippets, Google Jobs bundle, and long-tail search intent
        so that candidates discover relevant openings faster.
      </p>
      <p className="text-base text-slate-700">
        Built on Next.js 14, MDX content, and strict SEO controls, {siteConfig.name} keeps every page
        lightning-fast, content-heavy, and internally linked to maximise crawl efficiency. Our team
        continuously expands city- and skill-specific hubs for programmatic coverage across India.
      </p>
    </div>
  );
}
