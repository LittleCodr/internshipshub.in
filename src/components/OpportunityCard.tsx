import { Link } from "react-router-dom";
import type { ContentEntry } from "../types/content";

interface Props {
  entry: ContentEntry;
}

const OpportunityCard = ({ entry }: Props) => {
  const { frontmatter } = entry;
  return (
    <article className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center gap-4">
        <img
          src={frontmatter.companyLogo}
          alt={`${frontmatter.company} logo`}
          className="h-12 w-12 rounded bg-slate-100 object-contain p-1"
          loading="lazy"
        />
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">{frontmatter.company}</p>
          <h3 className="text-lg font-semibold text-slate-900">{frontmatter.title}</h3>
        </div>
      </div>
      <p className="text-sm text-slate-600">{frontmatter.description}</p>
      <dl className="grid gap-2 text-sm text-slate-500 sm:grid-cols-2">
        <div>
          <dt className="font-medium text-slate-600">Location</dt>
          <dd>{frontmatter.remote ? "Remote" : frontmatter.city + ", " + frontmatter.state}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-600">Stipend</dt>
          <dd>{frontmatter.stipend}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-600">Duration</dt>
          <dd>{frontmatter.duration}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-600">Apply by</dt>
          <dd>{new Date(frontmatter.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</dd>
        </div>
      </dl>
      <Link
        to={`/${frontmatter.type === "internship" ? "internships" : frontmatter.type === "job" ? "jobs" : "research"}/${entry.slug}`}
        className="mt-auto inline-flex items-center justify-center rounded bg-brand-accent px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
      >
        View details
      </Link>
    </article>
  );
};

export default OpportunityCard;
