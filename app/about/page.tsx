import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About InternshipsHub",
  description:
    "InternshipsHub is India’s structured internship and job discovery engine, focused on verified roles across startups, universities, and research labs."
};

export default function AboutPage() {
  return (
    <article className="prose prose-slate max-w-3xl">
      <h1>About InternshipsHub</h1>
      <p>
        InternshipsHub exists to compress the time it takes ambitious students and early-career builders in India to find verified internships, research roles, and entry-level jobs. We track company career feeds, university labs, and founder updates daily. Every listing ships with a complete JobPosting schema mapped to Google Jobs and long-tail search intent.
      </p>
      <p>
        The platform is run by a distributed editorial and research team that audits each opportunity for application process clarity, stipend transparency, and hiring velocity. If a company does not reply to applicants, it does not stay on InternshipsHub.
      </p>
      <p>
        We deploy on Vercel, render with Next.js server components, and ingest local MDX content. That architecture keeps our lighthouse scores high, our structured data valid, and our publishing workflow entirely under version control.
      </p>
      <p>
        Questions? Reach out at <a href="mailto:editor@internshipshub.in">editor@internshipshub.in</a>.
      </p>
    </article>
  );
}
