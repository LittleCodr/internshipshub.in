import { Helmet } from "@lib/helmet";
import OpportunityCard from "../components/OpportunityCard";
import JsonLd from "../components/JsonLd";
import { getAllContent, getRemoteInternships } from "../lib/content";
import { buildBreadcrumbSchema, buildOrganizationSchema } from "../lib/schema";
import { canonicalHref, robotsContent } from "../lib/seo";

const HomePage = () => {
  const allContent = getAllContent();
  const latest = allContent.slice(0, 10);
  const remote = getRemoteInternships().slice(0, 5);

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", url: "https://internshipshub.in/" }
  ]);

  const organizationSchema = allContent.length > 0 ? buildOrganizationSchema(allContent[0]) : null;
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Internshipshub",
    url: "https://internshipshub.in/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://internshipshub.in/search?q={query}",
      "query-input": "required name=query"
    }
  };

  const latestItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Latest Opportunities",
    itemListOrder: "Descending",
    itemListElement: latest.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: entry.frontmatter.canonicalUrl,
      name: entry.frontmatter.title
    }))
  };

  return (
    <>
      <Helmet>
        <title>Paid Internships &amp; Research Programs 2026 | Internshipshub</title>
        <meta
          name="description"
          content="Discover verified internships, research programs, and remote-first opportunities for students in India. Updated daily. Apply smarter with Internshipshub."
        />
        <link rel="canonical" href={canonicalHref("https://internshipshub.in/")} />
        <meta name="robots" content={robotsContent(true)} />
        <meta property="og:title" content="Paid Internships & Research Programs 2026 | Internshipshub" />
        <meta
          property="og:description"
          content="Discover verified internships, research programs, and remote-first opportunities for students in India. Updated daily."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://internshipshub.in/" />
        <meta property="og:image" content="https://internshipshub.in/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Paid Internships & Research Programs 2026 | Internshipshub" />
        <meta
          name="twitter:description"
          content="Discover verified internships, research programs, and remote-first opportunities for students in India. Updated daily."
        />
      </Helmet>
      <JsonLd items={[breadcrumbs, websiteSchema, latestItemList, ...(organizationSchema ? [organizationSchema] : [])]} />
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="max-w-4xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Homepage</p>
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Internships &amp; Research Opportunities in India (2026) | Internshipshub
            </h1>
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Find Internships That Actually Matter</h2>
            <p className="text-lg text-slate-700">
              Curated internships and research programs from IITs, NITs, IIITs, startups, and global companies. No spam. No fake
              listings.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                className="inline-flex items-center justify-center rounded bg-brand-accent px-5 py-3 text-sm font-semibold text-white hover:bg-blue-600"
                href="#latest"
              >
                Browse Latest Opportunities
              </a>
              <a
                className="inline-flex items-center justify-center rounded border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                href="#remote"
              >
                Explore Remote Internships
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="latest" className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Latest Opportunities</p>
            <h2 className="text-2xl font-semibold text-slate-900">Fresh, verified roles updated daily</h2>
            <p className="text-sm text-slate-600">Sorted by newest first. Internal links point to complete details.</p>
          </div>
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

      <section id="remote" className="bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Remote-first Picks</p>
              <h2 className="text-2xl font-semibold text-slate-900">Work from anywhere. Verified remote internships.</h2>
              <p className="text-sm text-slate-600">Remote-only roles with clear deliverables and outcomes.</p>
            </div>
            <a href="/remote-internships" className="text-sm font-semibold text-brand-accent hover:underline">
              Explore remote
            </a>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {remote.length > 0 ? (
              remote.map((entry) => <OpportunityCard key={entry.slug} entry={entry} />)
            ) : (
              <p className="text-sm text-slate-500">Remote internships update soon. Explore all listings meanwhile.</p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">IIT Internships</h3>
            <p className="mt-2 text-sm text-slate-600">Guides to IIT summer research and internship calls with timelines.</p>
            <a href="/internships" className="mt-3 inline-flex text-sm font-semibold text-brand-accent hover:underline">
              Browse IIT internships
            </a>
          </div>
          <div className="rounded-lg border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">NIT Internships</h3>
            <p className="mt-2 text-sm text-slate-600">Verified NIT summer programs, eligibility, and expected deadlines.</p>
            <a href="/internships" className="mt-3 inline-flex text-sm font-semibold text-brand-accent hover:underline">
              Explore NIT internships
            </a>
          </div>
          <div className="rounded-lg border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">IIIT Internships</h3>
            <p className="mt-2 text-sm text-slate-600">Remote-friendly and on-campus IIIT opportunities with clear deliverables.</p>
            <a href="/internships" className="mt-3 inline-flex text-sm font-semibold text-brand-accent hover:underline">
              See IIIT internships
            </a>
          </div>
          <div className="rounded-lg border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Research Internships</h3>
            <p className="mt-2 text-sm text-slate-600">Faculty-led, lab-driven roles with publication or prototype outcomes.</p>
            <a href="/research" className="mt-3 inline-flex text-sm font-semibold text-brand-accent hover:underline">
              View research internships
            </a>
          </div>
          <div className="rounded-lg border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Paid Internships</h3>
            <p className="mt-2 text-sm text-slate-600">Stipend-backed roles across engineering, product, and data.</p>
            <a href="/internships" className="mt-3 inline-flex text-sm font-semibold text-brand-accent hover:underline">
              Find paid internships
            </a>
          </div>
          <div className="rounded-lg border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Remote Internships</h3>
            <p className="mt-2 text-sm text-slate-600">Work-from-anywhere roles with defined deliverables and deadlines.</p>
            <a href="/remote-internships" className="mt-3 inline-flex text-sm font-semibold text-brand-accent hover:underline">
              Browse remote internships
            </a>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Why Internshipshub Exists</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Built for clarity and trust</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>Manually curated listings</li>
                <li>No middlemen or fake promises</li>
                <li>Focus on learning and outcomes</li>
                <li>Clear deadlines and eligibility</li>
                <li>No corporate fluff</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Who This Is For</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Students with intent</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>Engineering students</li>
                <li>CS / AI / ML students</li>
                <li>Research-focused undergrads</li>
                <li>Students seeking paid or remote internships</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="col-span-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">How It Works</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Apply smarter in three steps</h2>
          </div>
          <div className="col-span-2 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-slate-200 p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">1) Discover verified opportunities</p>
              <p className="mt-2 text-sm text-slate-600">Fresh internships and research roles with complete metadata.</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">2) Check eligibility & deadlines</p>
              <p className="mt-2 text-sm text-slate-600">Clear requirements, stipend notes, and apply-by dates.</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">3) Apply directly to the source</p>
              <p className="mt-2 text-sm text-slate-600">No intermediaries. Direct links to official portals or emails.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold text-slate-900">Internships in India: what matters</h2>
          <p className="mt-4 text-sm text-slate-700">
            Internships are short, outcome-focused roles where students work on real projects under guided mentorship. In India,
            they bridge classroom learning with industry or lab practice, shaping placement outcomes and research readiness.
            Research internships emphasize experimentation, publication, or prototypes with faculty, while industry internships
            focus on product delivery and customer impact. Curated platforms beat random job boards because they filter out stale
            or fake listings, surface deadlines clearly, and highlight eligibility up front. This reduces wasted applications and
            improves match quality. For students comparing options, look at domain fit, mentor quality, and expected deliverables
            alongside brand names. Remote internships expand access beyond geography but still demand disciplined communication
            and verifiable outputs. A student-first hub that keeps everything updated and links to original sources helps you
            apply smarter and avoid surprises.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Internshipshub</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li><a className="hover:underline" href="/about">About</a></li>
                <li><a className="hover:underline" href="/contact">Contact</a></li>
                <li><a className="hover:underline" href="/contact">Submit an Opportunity</a></li>
                <li><a className="hover:underline" href="/privacy-policy">Privacy Policy</a></li>
                <li><a className="hover:underline" href="/terms">Terms</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Explore</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li><a className="hover:underline" href="/internships">IIT Internships</a></li>
                <li><a className="hover:underline" href="/internships">NIT Internships</a></li>
                <li><a className="hover:underline" href="/internships">IIIT Internships</a></li>
                <li><a className="hover:underline" href="/research">Research Internships</a></li>
                <li><a className="hover:underline" href="/remote-internships">Remote Internships</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Popular Searches</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Summer Internships 2026</li>
                <li>Paid Internships for Students</li>
                <li>Research Internships in India</li>
                <li>Remote Internships for Engineers</li>
              </ul>
            </div>
          </div>
          <p className="mt-8 text-sm text-slate-600">© Internshipshub.in — Built for students who care about real work.</p>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
