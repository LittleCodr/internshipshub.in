import { JobCard } from "@/components/job-card";
import { SeoTextBlock } from "@/components/seo-text-block";
import { StructuredData } from "@/components/structured-data";
import { getAllJobs, getRemoteJobs, getTrendingJobs } from "@/lib/content";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const runtime = "edge";

export default async function HomePage() {
  const [latest, trending, remote] = await Promise.all([
    getAllJobs(),
    getTrendingJobs(4),
    getRemoteJobs()
  ]);

  const latestSubset = latest.slice(0, 8);
  const remoteSubset = remote.slice(0, 6);

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          India&apos;s internship intelligence engine
        </p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Discover internships, jobs, and research roles with structured insights
        </h1>
        <p className="max-w-3xl text-base text-slate-600">
          InternshipsHub.in maps every opportunity to Google Jobs schema, ensuring discoverability
          for students, fresh graduates, and early-career professionals. No fluff—just actionable
          openings.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Latest openings</h2>
          <a href="/internships" className="text-sm font-semibold text-primary">
            Browse all internships →
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {latestSubset.map((job) => (
            <JobCard key={`${job.type}-${job.slug}`} job={job} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Trending roles</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {trending.map((job) => (
            <JobCard key={`${job.type}-${job.slug}`} job={job} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Remote opportunities</h2>
          <a href="/remote-internships" className="text-sm font-semibold text-primary">
            View remote-first library →
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {remoteSubset.map((job) => (
            <JobCard key={`${job.type}-${job.slug}`} job={job} />
          ))}
        </div>
      </section>

      <SeoTextBlock
        title="Why InternshipsHub.in outranks generic job boards"
        paragraphs={[
          "Our listings are structured around user intent. Every internship and job entry is enriched with machine-readable schema, canonical URLs, and internal linking that feeds Google Jobs.",
          "Filters surface real insights—location, stipend, duration, eligibility—so students can take action quickly. SEO-heavy copy blocks provide the contextual depth Google needs without overwhelming humans.",
          "As we expand category and city programmatic pages, expect rapid coverage for software engineering internships, government fellowships, remote research roles, and more."
        ]}
      />

      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "InternshipsHub.in", path: "/" }
        ])}
      />
    </div>
  );
}
