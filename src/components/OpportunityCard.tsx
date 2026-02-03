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
    <article className="group flex flex-col gap-5 rounded-2xl border border-white/10 bg-gradient-to-br from-lime-900 via-emerald-900 to-amber-800 p-6 text-lime-50 shadow-lg ring-1 ring-lime-500/20 transition hover:-translate-y-1 hover:shadow-xl hover:ring-amber-300/50">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-lime-50 ring-1 ring-white/20">
          {frontmatter.type}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-800/70 px-3 py-1 text-xs font-medium text-lime-100 ring-1 ring-white/10">
          {isRemote ? "Remote" : `${frontmatter.city}, ${frontmatter.state}`}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/25 px-3 py-1 text-xs font-medium text-amber-50 ring-1 ring-amber-200/40">
          {frontmatter.duration}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt={`${frontmatter.company} logo`}
          className="h-12 w-12 rounded-xl bg-white/90 object-contain p-2 shadow ring-1 ring-white/50"
          loading="lazy"
          onError={(event) => {
            const target = event.currentTarget;
            if (target.src !== FALLBACK_LOGO) {
              target.src = FALLBACK_LOGO;
            }
          }}
        />
        <div>
          <p className="text-xs uppercase tracking-wide text-lime-100">{frontmatter.company}</p>
          <h3 className="text-lg font-semibold text-white group-hover:text-amber-100">{frontmatter.title}</h3>
        </div>
      </div>
      <p className="text-sm text-lime-50/90">{frontmatter.description}</p>
      <dl className="grid gap-2 text-sm text-lime-50 sm:grid-cols-2">
        <div>
          <dt className="font-medium text-lime-100">Location</dt>
          <dd>{isRemote ? "Remote" : frontmatter.city + ", " + frontmatter.state}</dd>
        </div>
        <div>
          <dt className="font-medium text-lime-100">Stipend</dt>
          <dd>{frontmatter.stipend}</dd>
        </div>
        <div>
          <dt className="font-medium text-lime-100">Duration</dt>
          <dd>{frontmatter.duration}</dd>
        </div>
        <div>
          <dt className="font-medium text-lime-100">Apply by</dt>
          <dd>{new Date(frontmatter.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</dd>
        </div>
      </dl>
      <Link
        to={`/${frontmatter.type === "internship" ? "internships" : frontmatter.type === "job" ? "jobs" : "research"}/${entry.slug}`}
        className="mt-auto inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-amber-400 via-lime-400 to-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 shadow-lg shadow-amber-300/30 transition hover:brightness-110"
      >
        View details
      </Link>
    </article>
  );
};

export default OpportunityCard;
