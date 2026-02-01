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
        <header className="max-w-3xl">
          <h1 className="text-3xl font-bold text-slate-900">Jobs for students and fresh graduates</h1>
          <p className="mt-4 text-sm text-slate-600">
            Every listing highlights employment type, salary range, and remote options so you can prioritise the right offers.
          </p>
        </header>
        <OpportunityFiltersBar filters={filters} />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((entry) => (
            <OpportunityCard key={entry.slug} entry={entry} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-6 text-sm text-slate-500">No jobs match your filters. Reset to view all roles.</p>
        )}
      </section>
    </>
  );
};

export default JobsPage;
