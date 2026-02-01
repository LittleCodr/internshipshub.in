import { Helmet } from "@lib/helmet";
import OpportunityCard from "../components/OpportunityCard";
import OpportunityFiltersBar from "../components/OpportunityFiltersBar";
import JsonLd from "../components/JsonLd";
import { useOpportunityFilters } from "../hooks/useOpportunityFilters";
import { getContentByCategory } from "../lib/content";
import { buildBreadcrumbSchema } from "../lib/schema";
import { canonicalHref, robotsContent } from "../lib/seo";

const InternshipsPage = () => {
  const internships = getContentByCategory("internship");
  const filters = useOpportunityFilters(internships);
  const filtered = filters.filtered;
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", url: "https://internshipshub.in/" },
    { name: "Internships", url: "https://internshipshub.in/internships" }
  ]);

  return (
    <>
      <Helmet>
        <title>Internships in India | Internshipshub.in</title>
        <meta
          name="description"
          content="Browse curated internship openings across India with verified stipends, eligibility, and structured JSON-LD metadata."
        />
        <link rel="canonical" href={canonicalHref("https://internshipshub.in/internships")} />
        <meta name="robots" content={robotsContent(true)} />
      </Helmet>
      <JsonLd items={[breadcrumbs]} />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-bold text-slate-900">Internship listings across India</h1>
          <p className="mt-4 text-sm text-slate-600">
            Frontmatter-driven filters keep categories crawlable while helping candidates identify remote, city-specific, or
            industry-aligned internships instantly.
          </p>
        </header>
        <OpportunityFiltersBar filters={filters} />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((entry) => (
            <OpportunityCard key={entry.slug} entry={entry} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-6 text-sm text-slate-500">No internships match your filters. Reset to view all opportunities.</p>
        )}
      </section>
    </>
  );
};

export default InternshipsPage;
