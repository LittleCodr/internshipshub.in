import type { Metadata } from "next";

import { StructuredData } from "@/components/structured-data";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL, siteConfig } from "@/lib/site";

const PATH = "/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Understand how InternshipsHub.in collects, processes, and safeguards information for internship seekers and employers.",
  alternates: {
    canonical: `${SITE_URL}${PATH}`
  }
};

export const runtime = "edge";

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-6">
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: siteConfig.name, path: "/" },
          { name: "Privacy Policy", path: PATH }
        ])}
      />
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      <p className="text-base text-slate-700">
        This Privacy Policy explains how {siteConfig.name} collects, uses, and protects information
        shared by visitors, students, and employers across our platform.
      </p>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Information We Collect</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-slate-700">
          <li>Anonymous analytics and performance metrics used to improve site performance.</li>
          <li>Contact information submitted through email correspondence.</li>
          <li>Employer-submitted role details required to publish structured listings.</li>
        </ul>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">How We Use Data</h2>
        <p className="text-sm text-slate-700">
          Data powers content accuracy, SEO telemetry, and product improvements. We never sell
          personally identifiable information or use it for advertising campaigns.
        </p>
        <ul className="list-disc space-y-2 pl-6 text-sm text-slate-700">
          <li>Maintaining structured job schema and programmatic SEO pages.</li>
          <li>Responding to listing submissions and user feedback.</li>
          <li>Monitoring availability, latency, and crawlability of the platform.</li>
        </ul>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Data Retention</h2>
        <p className="text-sm text-slate-700">
          Role details remain published until their validity window expires or the employer requests
          removal. Contact correspondence is retained for operational audit trails only.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
        <p className="text-sm text-slate-700">
          For privacy questions or deletion requests, email <span className="font-semibold text-primary">{siteConfig.email}</span>.
        </p>
      </section>
    </div>
  );
}
