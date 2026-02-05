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

  const applyBy = new Date(frontmatter.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const href = `/${frontmatter.type === "internship" ? "internships" : frontmatter.type === "job" ? "jobs" : "research"}/${entry.slug}`;

  return (
    <article className="group flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white/90 p-5 text-slate-900 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
      <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-800">
        <span className="pill bg-white ring-emerald-100">{frontmatter.type}</span>
        <span className="pill bg-emerald-50 text-emerald-900 ring-emerald-100">
          {isRemote ? "Remote" : `${frontmatter.city}, ${frontmatter.state}`}
        </span>
        <span className="pill bg-amber-50 text-amber-900 ring-amber-100">{frontmatter.duration}</span>
        <span className="pill bg-white text-emerald-800 ring-emerald-100">Apply by {applyBy}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <img
            src={logo}
            alt={`${frontmatter.company} logo`}
            className="h-full w-full object-contain p-2"
            loading="lazy"
            onError={(event) => {
              const target = event.currentTarget;
              if (target.src !== FALLBACK_LOGO) {
                target.src = FALLBACK_LOGO;
              }
            }}
          />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] text-emerald-700">{frontmatter.company}</p>
          <h3 className="text-lg font-semibold text-slate-900 transition group-hover:text-emerald-700">{frontmatter.title}</h3>
          <p className="text-sm text-slate-600">{frontmatter.industry}</p>
        </div>
      </div>

      <p className="text-sm text-slate-700">{frontmatter.description}</p>

      <dl className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-700">Location</dt>
          <dd className="mt-1 text-slate-900">{isRemote ? "Remote" : `${frontmatter.city}, ${frontmatter.state}`}</dd>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-700">Stipend</dt>
          <dd className="mt-1 text-slate-900">{frontmatter.stipend}</dd>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-700">Work mode</dt>
          <dd className="mt-1 text-slate-900">{frontmatter.remote ? "Remote-friendly" : frontmatter.workHours}</dd>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-700">Apply</dt>
          <dd className="mt-1 text-slate-900">By {applyBy}</dd>
        </div>
      </dl>

      <Link
        to={href}
        className="mt-auto inline-flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"
      >
        <span>View details</span>
        <span aria-hidden className="text-base">→</span>
      </Link>
    </article>
  );
};

export default OpportunityCard;
