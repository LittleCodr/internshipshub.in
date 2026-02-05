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
    <article className="group relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-6 text-slate-900 shadow-[0_24px_60px_-28px_rgba(16,185,129,0.35)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_-30px_rgba(6,148,162,0.45)]">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/60 opacity-90" aria-hidden />
      <div className="absolute right-0 top-0 h-24 w-24 rotate-12 bg-gradient-to-br from-emerald-200/30 to-cyan-200/10 blur-3xl" aria-hidden />
      <div className="relative flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-800">
        <span className="pill bg-white/90 ring-emerald-100/60">{frontmatter.type}</span>
        <span className="pill bg-emerald-50/80 text-emerald-900 ring-emerald-100/80">
          {isRemote ? "Remote" : `${frontmatter.city}, ${frontmatter.state}`}
        </span>
        <span className="pill bg-amber-50/80 text-amber-900 ring-amber-100/80">{frontmatter.duration}</span>
        <span className="pill bg-white/80 text-emerald-800 ring-emerald-100/70">Apply by {applyBy}</span>
      </div>

      <div className="relative flex items-center gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-lg">
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
          <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700">{frontmatter.company}</p>
          <h3 className="text-xl font-semibold text-slate-900 transition group-hover:text-emerald-700">{frontmatter.title}</h3>
          <p className="text-sm text-emerald-700">{frontmatter.industry}</p>
        </div>
      </div>

      <p className="relative text-sm text-slate-700">{frontmatter.description}</p>

      <dl className="relative grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
        <div className="rounded-2xl border border-emerald-50 bg-white/70 px-4 py-3 shadow-sm">
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">Location</dt>
          <dd className="mt-1 text-slate-800">{isRemote ? "Remote" : `${frontmatter.city}, ${frontmatter.state}`}</dd>
        </div>
        <div className="rounded-2xl border border-emerald-50 bg-white/70 px-4 py-3 shadow-sm">
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">Stipend</dt>
          <dd className="mt-1 text-slate-800">{frontmatter.stipend}</dd>
        </div>
        <div className="rounded-2xl border border-emerald-50 bg-white/70 px-4 py-3 shadow-sm">
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">Work mode</dt>
          <dd className="mt-1 text-slate-800">{frontmatter.remote ? "Remote-friendly" : frontmatter.workHours}</dd>
        </div>
        <div className="rounded-2xl border border-emerald-50 bg-white/70 px-4 py-3 shadow-sm">
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">Apply</dt>
          <dd className="mt-1 text-slate-800">By {applyBy}</dd>
        </div>
      </dl>

      <Link
        to={href}
        className="relative mt-auto inline-flex items-center justify-between rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5"
      >
        <span>View details</span>
        <span aria-hidden className="text-base">→</span>
      </Link>
    </article>
  );
};

export default OpportunityCard;
