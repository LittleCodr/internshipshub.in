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
    <article className="group flex flex-col gap-5 rounded-2xl border border-white/20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-6 text-slate-50 shadow-lg ring-1 ring-indigo-500/20 transition hover:-translate-y-1 hover:shadow-xl hover:ring-indigo-400/40">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-100 ring-1 ring-white/10">
          {frontmatter.type}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-800/70 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/5">
          {isRemote ? "Remote" : `${frontmatter.city}, ${frontmatter.state}`}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-100 ring-1 ring-indigo-400/30">
          {frontmatter.duration}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt={`${frontmatter.company} logo`}
          className="h-12 w-12 rounded-xl bg-white/80 object-contain p-2 shadow ring-1 ring-white/40"
          loading="lazy"
        />
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-200">{frontmatter.company}</p>
          <h3 className="text-lg font-semibold text-white group-hover:text-sky-200">{frontmatter.title}</h3>
        </div>
      </div>
      <p className="text-sm text-slate-200/90">{frontmatter.description}</p>
      <dl className="grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
        <div>
          <dt className="font-medium text-slate-100">Location</dt>
          <dd>{isRemote ? "Remote" : frontmatter.city + ", " + frontmatter.state}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-100">Stipend</dt>
          <dd>{frontmatter.stipend}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-100">Duration</dt>
          <dd>{frontmatter.duration}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-100">Apply by</dt>
          <dd>{new Date(frontmatter.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</dd>
        </div>
      </dl>
      <Link
        to={`/${frontmatter.type === "internship" ? "internships" : frontmatter.type === "job" ? "jobs" : "research"}/${entry.slug}`}
        className="mt-auto inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-sky-400 via-indigo-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-105"
      >
        View details
      </Link>
    </article>
  );
};

export default OpportunityCard;
