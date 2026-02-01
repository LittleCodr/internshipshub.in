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
        <header className="max-w-3xl">
          <h1 className="text-3xl font-bold text-slate-900">Research opportunities</h1>
          <p className="mt-4 text-sm text-slate-600">
            Long-form listings with detailed project scopes, faculty mentors, and publication opportunities help you pick the
            right research stint.
          </p>
        </header>
        <OpportunityFiltersBar filters={filters} />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((entry) => (
            <OpportunityCard key={entry.slug} entry={entry} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-6 text-sm text-slate-500">No research opportunities match your filters right now.</p>
        )}
      </section>
    </>
  );
};

export default ResearchPage;
