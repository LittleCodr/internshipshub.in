import { Link } from "react-router-dom";
import { FALLBACK_LOGO } from "../lib/content";
import type { ContentEntry } from "../types/content";

interface Props {
  entry: ContentEntry;
}

const OpportunityCard = ({ entry }: Props) => {
  const { frontmatter } = entry;
  const logo = frontmatter.companyLogo?.trim() ? frontmatter.companyLogo : FALLBACK_LOGO;
  const isRemote = frontmatter.remote;

  return (
    <article className="group flex flex-col gap-5 rounded-2xl border border-emerald-50 bg-gradient-to-br from-amber-50 via-lime-50 to-emerald-50 p-6 text-slate-900 shadow-sm ring-1 ring-emerald-100 transition hover:-translate-y-1 hover:shadow-lg hover:ring-emerald-200">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-100">
          {frontmatter.type}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 ring-1 ring-emerald-100">
          {isRemote ? "Remote" : `${frontmatter.city}, ${frontmatter.state}`}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 ring-1 ring-amber-100">
          {frontmatter.duration}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt={`${frontmatter.company} logo`}
          className="h-12 w-12 rounded-xl bg-white object-contain p-2 shadow ring-1 ring-emerald-100"
          loading="lazy"
          onError={(event) => {
            const target = event.currentTarget;
            if (target.src !== FALLBACK_LOGO) {
              target.src = FALLBACK_LOGO;
            }
          }}
        />
        <div>
          <p className="text-xs uppercase tracking-wide text-emerald-700">{frontmatter.company}</p>
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-700">{frontmatter.title}</h3>
        </div>
      </div>
      <p className="text-sm text-slate-700">{frontmatter.description}</p>
      <dl className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
        <div>
          <dt className="font-medium text-emerald-800">Location</dt>
          <dd>{isRemote ? "Remote" : frontmatter.city + ", " + frontmatter.state}</dd>
        </div>
        <div>
          <dt className="font-medium text-emerald-800">Stipend</dt>
          <dd>{frontmatter.stipend}</dd>
        </div>
        <div>
          <dt className="font-medium text-emerald-800">Duration</dt>
          <dd>{frontmatter.duration}</dd>
        </div>
        <div>
          <dt className="font-medium text-emerald-800">Apply by</dt>
          <dd>{new Date(frontmatter.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</dd>
        </div>
      </dl>
      <Link
        to={`/${frontmatter.type === "internship" ? "internships" : frontmatter.type === "job" ? "jobs" : "research"}/${entry.slug}`}
        className="mt-auto inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-amber-200 via-lime-200 to-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-900 shadow transition hover:brightness-105"
      >
        View details
      </Link>
    </article>
  );
};

export default OpportunityCard;
