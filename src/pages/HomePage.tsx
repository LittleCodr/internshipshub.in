import { Helmet } from "@lib/helmet";
import OpportunityCard from "../components/OpportunityCard";
import JsonLd from "../components/JsonLd";
import { getAllContent, getRemoteInternships } from "../lib/content";
import { buildBreadcrumbSchema, buildOrganizationSchema } from "../lib/schema";
import { canonicalHref, robotsContent } from "../lib/seo";

const HomePage = () => {
  const allContent = getAllContent();
  const latest = allContent.slice(0, 6);
  const remote = getRemoteInternships().slice(0, 3);

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", url: "https://internshipshub.in/" }
  ]);

  const organizationSchema = allContent.length > 0 ? buildOrganizationSchema(allContent[0]) : null;

  return (
    <>
      <Helmet>
        <title>Internshipshub.in | Discover Internships, Jobs, and Research Roles Across India</title>
        <meta
          name="description"
          content="Find curated internships, freshers jobs, and research opportunities across India. Explore remote-friendly roles, verified stipends, and application deadlines on internshipshub.in."
        />
        <link rel="canonical" href={canonicalHref("https://internshipshub.in/")} />
        <meta name="robots" content={robotsContent(true)} />
        <meta property="og:title" content="Internshipshub.in" />
        <meta property="og:description" content="Dominate your internship search with structured listings, filters, and remote opportunities." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://internshipshub.in/" />
        <meta property="og:image" content="https://internshipshub.in/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Internshipshub.in" />
        <meta
          name="twitter:description"
          content="Discover internships, jobs, and research opportunities with pre-rendered SEO pages built for Google Jobs."
        />
      </Helmet>
      <JsonLd items={[breadcrumbs, ...(organizationSchema ? [organizationSchema] : [])]} />
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Dominate internship and job searches with structured, Google-friendly listings.
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              internshipshub.in pre-renders every opportunity with JSON-LD, canonical metadata, and blazing-fast performance so
              you outrank the competition.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Latest opportunities</h2>
          <a href="/internships" className="text-sm font-semibold text-brand-accent hover:underline">
            View all
          </a>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((entry) => (
            <OpportunityCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </section>
      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Remote-first picks</h2>
            <a href="/remote-internships" className="text-sm font-semibold text-brand-accent hover:underline">
              Explore remote
            </a>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {remote.length > 0 ? (
              remote.map((entry) => <OpportunityCard key={entry.slug} entry={entry} />)
            ) : (
              <p className="text-sm text-slate-500">Remote internships update soon. Explore all listings meanwhile.</p>
            )}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-16 text-slate-700">
        <h2 className="text-2xl font-semibold text-slate-900">Why internshipshub.in wins search</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Google Jobs ready</h3>
            <p className="mt-2 text-sm">
              Every listing ships with JobPosting JSON-LD in the initial HTML so crawlers index complete salary, location, and
              eligibility data without executing JavaScript.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Programmatic SEO scale</h3>
            <p className="mt-2 text-sm">
              MDX-driven content with strict frontmatter keeps thousands of internship variants consistent while static builds
              guarantee lightning-fast page loads.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Performance obsessed</h3>
            <p className="mt-2 text-sm">
              Tailwind, pre-rendered HTML, and minimal hydration ensure Lighthouse scores stay above 95 on both mobile and
              desktop.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Structured internal linking</h3>
            <p className="mt-2 text-sm">
              Category hubs, related opportunities, and breadcrumbs help search engines crawl deeply while keeping students on
              the platform.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
