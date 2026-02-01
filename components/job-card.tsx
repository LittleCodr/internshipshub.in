import Link from "next/link";
import { Briefcase, Calendar, MapPin, Laptop, Building2 } from "lucide-react";

import { formatCurrency, formatDate } from "@/lib/utils";
import type { JobFrontmatter } from "@/lib/types";
import { getJobPath } from "@/lib/content";

export function JobCard({ job }: { job: JobFrontmatter }) {
  const path = getJobPath(job);

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-primary/60">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {job.companyType.toUpperCase()} · {job.industry}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">
            <Link href={path}>{job.title}</Link>
          </h3>
          <p className="mt-2 text-sm text-slate-600">{job.description}</p>
        </div>
        <div className="hidden shrink-0 text-right text-xs font-medium uppercase text-slate-500 sm:block">
          {job.remote ? "Remote" : job.city}
        </div>
      </div>
      <dl className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase size={16} />
          <span>{job.employmentType.replace("_", " ")}</span>
        </div>
        <div className="flex items-center gap-2">
          <Laptop size={16} />
          <span>{job.remote ? "Remote" : job.hybrid ? "Hybrid" : "On-site"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Building2 size={16} />
          <span>{job.company}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>Apply by {formatDate(job.deadline)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase text-primary">CTC</span>
          <span>
            {formatCurrency(job.salaryMin, job.stipendCurrency)} –
            {" "}
            {formatCurrency(job.salaryMax, job.stipendCurrency)} / {job.salaryPeriod.toLowerCase()}
          </span>
        </div>
      </dl>
      <div className="flex items-center justify-between pt-1">
        <p className="text-xs text-slate-500">
          Posted {formatDate(job.postedAt)} · {job.numberOfOpenings} openings
        </p>
        <Link
          href={path}
          className="rounded-full border border-primary px-4 py-1.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
        >
          View & Apply
        </Link>
      </div>
    </article>
  );
}
