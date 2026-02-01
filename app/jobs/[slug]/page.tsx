import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ApplyCta } from "@/components/apply-cta";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JobSummaryTable } from "@/components/job-summary-table";
import { JobCard } from "@/components/job-card";
import { StructuredData } from "@/components/structured-data";
import { getJobBySlug, getJobsByCategory, getJobPath } from "@/lib/content";
import { buildArticleSchema, buildBreadcrumbSchema, buildJobPostingSchema } from "@/lib/schema";
import { buildJobMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const jobs = await getJobsByCategory("job");
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const job = await getJobBySlug("job", params.slug).catch(() => null);
  if (!job) {
    return {
      title: "Job not found",
      robots: { index: false, follow: false }
    };
  }
  return buildJobMetadata(job);
}

export default async function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = await getJobBySlug("job", params.slug).catch(() => null);
  if (!job) {
    notFound();
  }

  const relatedPool = await getJobsByCategory("job");
  const related = relatedPool
    .filter((item) => item.slug !== job.slug && item.industry === job.industry)
    .slice(0, 3);

  const crumbs = [
    { name: "InternshipsHub.in", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: job.title, path: getJobPath(job) }
  ];

  return (
    <div className="space-y-10">
      <Breadcrumbs crumbs={crumbs} />
      <StructuredData
        data={[
          buildBreadcrumbSchema(crumbs),
          buildJobPostingSchema(job),
          buildArticleSchema(job)
        ]}
      />

      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {job.company.toUpperCase()} · {job.industry}
        </p>
        <h1 className="text-3xl font-bold text-slate-900">{job.title}</h1>
        <p className="max-w-3xl text-base text-slate-600">{job.description}</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-8">
          <JobSummaryTable job={job} />

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Eligibility snapshot</h2>
            <dl className="mt-4 grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-slate-600">Eligibility</dt>
                <dd className="mt-1 text-slate-700">{job.eligibility}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-600">Education</dt>
                <dd className="mt-1 text-slate-700">{job.education.join(", ")}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-600">Branches</dt>
                <dd className="mt-1 text-slate-700">{job.branchesAllowed.join(", ")}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-600">Year of study</dt>
                <dd className="mt-1 text-slate-700">{job.yearOfStudy.join(", ")}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-600">Skills</dt>
                <dd className="mt-1 text-slate-700">{job.skills.join(", ")}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-600">Age limit</dt>
                <dd className="mt-1 text-slate-700">{job.ageLimit}</dd>
              </div>
            </dl>
          </section>

          <article className="prose prose-slate max-w-none">
            {job.content}
          </article>

          {related.length > 0 ? (
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-900">Related jobs</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {related.map((item) => (
                  <JobCard key={`${item.type}-${item.slug}`} job={item} />
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <ApplyCta applyLink={job.applyLink} />
      </div>
    </div>
  );
}
