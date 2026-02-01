import Link from "next/link";
import type { Route } from "next";
import Image from "next/image";
import { formatCurrencyRange, formatDate } from "@lib/utils";
import type { JobContentItem } from "@lib/content-types";

export function JobCard({ item }: { item: JobContentItem }) {
  const { frontmatter } = item;
  const detailPath = `/${frontmatter.type === "job" ? "jobs" : frontmatter.type === "research" ? "research" : "internships"}/${frontmatter.slug}` as Route;

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded bg-slate-100">
          <Image
            fill
            alt={`${frontmatter.company} logo`}
            src={frontmatter.companyLogo}
            className="object-contain p-2"
            sizes="48px"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">
            <Link href={detailPath} className="hover:text-primary-600">
              {frontmatter.title}
            </Link>
          </h3>
          <p className="text-sm text-slate-500">
            {frontmatter.company} · {frontmatter.city}, {frontmatter.state}
          </p>
        </div>
      </div>
      <dl className="grid grid-cols-1 gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-400">Stipend / salary</dt>
          <dd>{formatCurrencyRange(frontmatter.salaryMin, frontmatter.salaryMax, frontmatter.salaryPeriod)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-400">Role</dt>
          <dd>{frontmatter.role}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-400">Duration</dt>
          <dd>{frontmatter.duration}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-400">Apply by</dt>
          <dd>{formatDate(frontmatter.deadline)}</dd>
        </div>
      </dl>
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">Posted {formatDate(frontmatter.postedAt)}</p>
        <Link href={detailPath} className="text-sm font-semibold text-primary-600 hover:text-primary-700">
          View details
        </Link>
      </div>
    </article>
  );
}
