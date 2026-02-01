import Link from "next/link";
import { JobCard } from "@components/job-card";
import { SeoTextBlock } from "@components/seo-text-block";
import { getContentByCategory, getAllContent } from "@lib/content";

export default function HomePage() {
  const internships = getContentByCategory("internship").slice(0, 6);
  const jobs = getContentByCategory("job").slice(0, 6);
  const remote = getAllContent().filter((item) => item.frontmatter.remote).slice(0, 6);

  return (
    <div className="flex flex-col gap-14">
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Internships & jobs built for India’s next operators
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-600">
          InternshipsHub surfaces structured, verified career opportunities across startups,
          MNCs, universities, and research labs. Search-ready, Google Jobs compliant, and
          designed for students who ship.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link href="/internships" className="rounded bg-primary-600 px-4 py-2 font-medium text-white">
            Browse internships
          </Link>
          <Link href="/jobs" className="rounded border border-primary-600 px-4 py-2 font-medium text-primary-600">
            Explore jobs
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Latest internships</h2>
          <Link href="/internships" className="text-sm font-medium text-primary-600">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {internships.map((item) => (
            <JobCard key={item.frontmatter.slug} item={item} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Trending jobs</h2>
          <Link href="/jobs" className="text-sm font-medium text-primary-600">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {jobs.map((item) => (
            <JobCard key={item.frontmatter.slug} item={item} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Remote opportunities</h2>
          <Link href="/remote-internships" className="text-sm font-medium text-primary-600">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {remote.map((item) => (
            <JobCard key={item.frontmatter.slug} item={item} />
          ))}
        </div>
      </section>

      <SeoTextBlock
        title="Why InternshipsHub outranks legacy job portals"
        paragraphs={[
          "Google Jobs expects structured data first. Every listing on InternshipsHub ships with a complete JobPosting schema, precise timelines, and compensation ranges tuned for Indian audiences.",
          "We prioritise opportunities that convert: remote-first teams, research pods, and hiring managers who respond. Each post links directly to company application flows—no aggregator detours.",
          "Filters across city, company type, employment model, and stipend bands help students shortlist roles and build a weekly application pipeline without spreadsheets."
        ]}
      />
    </div>
  );
}
