import { Helmet } from "@lib/helmet";
import OpportunityCard from "../components/OpportunityCard";
import OpportunityFiltersBar from "../components/OpportunityFiltersBar";
import JsonLd from "../components/JsonLd";
import { useOpportunityFilters } from "../hooks/useOpportunityFilters";
import { getContentByCategory } from "../lib/content";
import { buildBreadcrumbSchema } from "../lib/schema";
import { canonicalHref, robotsContent } from "../lib/seo";

const JobsPage = () => {
  const jobs = getContentByCategory("job");
  const filters = useOpportunityFilters(jobs);
  const filtered = filters.filtered;
  const totalCount = jobs.length;
  const filteredCount = filtered.length;
  const resetFilters = () => {
    filters.setRemote("all");
    filters.setCity("all");
    filters.setIndustry("all");
  };
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", url: "https://internshipshub.in/" },
    { name: "Jobs", url: "https://internshipshub.in/jobs" }
  ]);

  return (
    <>
      <Helmet>
        <title>Entry-level Jobs in India | Internshipshub.in</title>
        <meta
          name="description"
          content="Discover full-time and contract fresher jobs in India with transparent salaries, experience requirements, and apply links."
        />
        <link rel="canonical" href={canonicalHref("https://internshipshub.in/jobs")} />
        <meta name="robots" content={robotsContent(true)} />
      </Helmet>
      <JsonLd items={[breadcrumbs]} />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-700 p-[1px] shadow-xl shadow-slate-300/40">
          <header className="flex flex-col gap-6 rounded-[22px] bg-white/95 p-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-800">
                <span className="pill bg-white/80 ring-slate-200">Jobs</span>
                <span className="pill bg-slate-100 ring-slate-200">Fresher friendly</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Jobs for students and fresh graduates</h1>
                <p className="mt-3 text-sm text-slate-600">
                  Every listing highlights employment type, salary range, and remote options so you can prioritise the right
                  offers.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-slate-700">
                <span className="pill bg-slate-100 ring-slate-200">{totalCount} live roles</span>
                <span className="pill bg-white ring-emerald-100">Salary & type upfront</span>
                <span className="pill bg-white ring-slate-200">Remote + on-site mix</span>
              </div>
            </div>
            <div className="grid w-full max-w-xs gap-3 text-center text-sm font-semibold text-slate-800 md:text-right">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-600">Currently visible</p>
                <p className="mt-1 text-3xl font-bold text-slate-900">{filteredCount}</p>
                <p className="text-xs text-slate-600">after filters</p>
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
            No jobs match your filters. Try resetting or expanding your city/industry preferences.
          </div>
        )}
      </section>
    </>
  );
};

export default JobsPage;
