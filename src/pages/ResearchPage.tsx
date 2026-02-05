import { Helmet } from "@lib/helmet";
import OpportunityCard from "../components/OpportunityCard";
import OpportunityFiltersBar from "../components/OpportunityFiltersBar";
import JsonLd from "../components/JsonLd";
import { useOpportunityFilters } from "../hooks/useOpportunityFilters";
import { getContentByCategory } from "../lib/content";
import { buildBreadcrumbSchema } from "../lib/schema";
import { canonicalHref, robotsContent } from "../lib/seo";

const ResearchPage = () => {
  const researchRoles = getContentByCategory("research");
  const filters = useOpportunityFilters(researchRoles);
  const filtered = filters.filtered;
  const totalCount = researchRoles.length;
  const filteredCount = filtered.length;
  const resetFilters = () => {
    filters.setRemote("all");
    filters.setCity("all");
    filters.setIndustry("all");
  };
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", url: "https://internshipshub.in/" },
    { name: "Research", url: "https://internshipshub.in/research" }
  ]);

  return (
    <>
      <Helmet>
        <title>Research Internships & Fellowships | Internshipshub.in</title>
        <meta
          name="description"
          content="Research internships and fellowships with universities, think tanks, and labs across India. Detailed eligibility and stipend info included."
        />
        <link rel="canonical" href={canonicalHref("https://internshipshub.in/research")} />
        <meta name="robots" content={robotsContent(true)} />
      </Helmet>
      <JsonLd items={[breadcrumbs]} />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-emerald-500 to-teal-400 p-[1px] shadow-xl shadow-emerald-200/50">
          <header className="flex flex-col gap-6 rounded-[22px] bg-white/95 p-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-indigo-800">
                <span className="pill bg-white/80 ring-indigo-100">Research</span>
                <span className="pill bg-indigo-50 ring-indigo-100">Mentor-led</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Research opportunities</h1>
                <p className="mt-3 text-sm text-slate-600">
                  Long-form listings with detailed project scopes, faculty mentors, and publication opportunities help you pick
                  the right research stint.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-slate-700">
                <span className="pill bg-indigo-50 ring-indigo-100">{totalCount} active research roles</span>
                <span className="pill bg-white ring-indigo-100">Publications & labs</span>
                <span className="pill bg-white ring-emerald-100">Remote + campus options</span>
              </div>
            </div>
            <div className="grid w-full max-w-xs gap-3 text-center text-sm font-semibold text-slate-800 md:text-right">
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/80 px-4 py-3 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-indigo-700">Currently visible</p>
                <p className="mt-1 text-3xl font-bold text-indigo-900">{filteredCount}</p>
                <p className="text-xs text-indigo-700">after filters</p>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200"
              >
                Reset filters
              </button>
            </div>
          </header>
        </div>

        <OpportunityFiltersBar
          filters={filters}
          totalCount={totalCount}
          filteredCount={filteredCount}
          onReset={resetFilters}
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((entry) => (
            <OpportunityCard key={entry.slug} entry={entry} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white/70 p-6 text-sm text-slate-600 shadow-sm">
            No research opportunities match your filters right now. Reset or try a different work mode.
          </div>
        )}
      </section>
    </>
  );
};

export default ResearchPage;
