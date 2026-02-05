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
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-lime-50 to-emerald-50 text-emerald-900">
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl" aria-hidden />
        <div className="absolute bottom-0 right-[-10%] h-72 w-72 rounded-full bg-lime-200/40 blur-3xl" aria-hidden />
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-100 ring-1 ring-white/15">
              Curated, verified, student-first
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
              Internships &amp; Research Opportunities in India (2026) — built for students who want real work.
            </h1>
            <p className="text-lg text-emerald-800">
              IIT, NIT, IIIT, startup, and global roles with clear outcomes, deadlines, and eligibility. No fluff. No fake listings.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-200 via-lime-200 to-emerald-200 px-5 py-3 text-sm font-semibold text-emerald-900 shadow-sm ring-1 ring-emerald-200 transition hover:brightness-105"
                href="#latest"
              >
                Browse Latest Opportunities
              </a>
              <a
                className="inline-flex items-center justify-center rounded-xl border border-emerald-200 px-5 py-3 text-sm font-semibold text-emerald-900 hover:bg-white/70"
                href="#remote"
              >
                Explore Remote Internships
              </a>
            </div>
          </div>
          <div className="flex w-full max-w-sm flex-col gap-3 rounded-2xl bg-white p-6 text-sm text-emerald-900 ring-1 ring-emerald-100 shadow">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Why students pick us</p>
            <div className="grid gap-3">
              <div className="rounded-xl bg-amber-50 p-3 ring-1 ring-amber-100">Verified listings, refreshed daily</div>
              <div className="rounded-xl bg-lime-50 p-3 ring-1 ring-lime-100">Remote-first filters that actually work</div>
              <div className="rounded-xl bg-emerald-50 p-3 ring-1 ring-emerald-100">Deadlines, eligibility, and stipend clarity</div>
            </div>
          </div>
        </div>
      </section>

      <section id="latest" className="bg-gradient-to-b from-amber-50 via-white to-lime-50/60">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Latest Opportunities</p>
              <h2 className="text-2xl font-semibold text-slate-900">Fresh, verified roles updated daily</h2>
              <p className="text-sm text-slate-600">Sorted by newest first. Internal links point to complete details.</p>
            </div>
            <a href="/internships" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-200 to-lime-300 px-4 py-2 text-sm font-semibold text-emerald-900 shadow-sm ring-1 ring-emerald-200 hover:brightness-105">
              View all
            </a>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((entry) => (
              <OpportunityCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </div>
      </section>

      <section id="remote" className="bg-gradient-to-br from-amber-50 via-lime-50 to-emerald-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Remote-first Picks</p>
              <h2 className="text-2xl font-semibold text-emerald-900">Work from anywhere. Verified remote internships.</h2>
              <p className="text-sm text-emerald-800">Remote-only roles with clear deliverables and outcomes.</p>
            </div>
            <a href="/remote-internships" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-200 to-lime-200 px-4 py-2 text-sm font-semibold text-emerald-900 ring-1 ring-emerald-200 transition hover:brightness-105">
              Explore remote
            </a>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {remote.length > 0 ? (
              remote.map((entry) => <OpportunityCard key={entry.slug} entry={entry} />)
            ) : (
              <p className="text-sm text-slate-200">Remote internships update soon. Explore all listings meanwhile.</p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {["IIT Internships", "NIT Internships", "IIIT Internships", "Research Internships", "Paid Internships", "Remote Internships"].map((title, idx) => {
            const href = title.includes("Research") ? "/research" : title.includes("Remote") ? "/remote-internships" : "/internships";
            const copy = [
              "Guides to IIT summer research and internship calls with timelines.",
              "Verified NIT summer programs, eligibility, and expected deadlines.",
              "Remote-friendly and on-campus IIIT opportunities with clear deliverables.",
              "Faculty-led, lab-driven roles with publication or prototype outcomes.",
              "Stipend-backed roles across engineering, product, and data.",
              "Work-from-anywhere roles with defined deliverables and deadlines."
            ][idx];

            return (
              <div key={title} className="rounded-2xl bg-white shadow-lg ring-1 ring-emerald-100">
                <div className="h-1.5 rounded-t-2xl bg-gradient-to-r from-amber-200 via-lime-200 to-emerald-200" />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{copy}</p>
                  <a href={href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900 hover:text-emerald-700">
                    Browse {title.toLowerCase()}
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-gradient-to-r from-amber-50 via-white to-lime-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-100">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Why Internshipshub Exists</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Built for clarity and trust</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>Manually curated listings</li>
                <li>No middlemen or fake promises</li>
                <li>Focus on learning and outcomes</li>
                <li>Clear deadlines and eligibility</li>
                <li>No corporate fluff</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-100">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Who This Is For</p>
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
            {["Discover verified opportunities", "Check eligibility & deadlines", "Apply directly to the source"].map((title, idx) => (
              <div key={title} className="rounded-2xl bg-white p-4 shadow-lg ring-1 ring-emerald-100">
                <p className="text-sm font-semibold text-slate-900">{idx + 1}) {title}</p>
                <p className="mt-2 text-sm text-slate-600">
                  {[
                    "Fresh internships and research roles with complete metadata.",
                    "Clear requirements, stipend notes, and apply-by dates.",
                    "No intermediaries. Direct links to official portals or emails."
                  ][idx]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 text-slate-50">
        <div className="absolute -left-10 top-0 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl" aria-hidden />
        <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" aria-hidden />
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl space-y-3">
              <p className="pill bg-white/10 text-emerald-50 ring-emerald-200/30">Clarity, not chaos</p>
              <h2 className="text-3xl font-bold">Internships in India: what actually matters</h2>
              <p className="text-sm text-slate-200">
                We filter for verified listings, show deadlines up front, and keep canonical links intact so you can apply without chasing stale forms.
                Research roles emphasize experiments and publication; industry roles emphasize delivery and measurable outcomes. Remote roles widen access but still need crisp communication and proofs of work.
              </p>
            </div>
            <div className="grid w-full max-w-md gap-3 text-sm">
              {["Verified weekly", "Direct source links", "JSON-LD rich data", "Remote-first filters"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-sm shadow-emerald-500/10">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Curation cadence",
                desc: "Listings refreshed weekly with apply-by dates validated against official sources.",
                stat: "Weekly",
                hint: "Deadlines tracked"
              },
              {
                title: "Schema-rich pages",
                desc: "JobPosting + Article + Breadcrumb JSON-LD for better crawl and preview.",
                stat: "3x",
                hint: "Structured data layers"
              },
              {
                title: "Remote-first filters",
                desc: "Remote, hybrid, and onsite labels surfaced with stipend clarity.",
                stat: "Remote",
                hint: "Work-mode first"
              }
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-emerald-500/10">
                <div className="flex items-center justify-between text-sm text-emerald-100">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">{card.hint}</span>
                  <span className="text-lg font-bold text-white">{card.stat}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-200">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="pill">How we help you apply</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Three-step flow to a stronger application</h2>
              <p className="mt-2 text-sm text-slate-600">Built for both mobile and desktop, tuned for clarity and speed.</p>
            </div>
            <a
              href="/remote-internships"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
            >
              Explore remote roles <span aria-hidden>→</span>
            </a>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["Discover verified opportunities", "Check eligibility & deadlines", "Apply with the right link"].map((title, idx) => (
              <div key={title} className="glass-card border border-emerald-50/70 p-5 shadow-md shadow-emerald-100/50">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">{idx + 1}</span>
                  <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-700">
                  {[
                    "Filters and search keep institutes, remote-first roles, and research fellowships easy to find.",
                    "We surface eligibility, stipend, location, and apply-by dates so you do not waste time.",
                    "We link to the canonical source—career portals, faculty pages, or official PDFs—no fluff."
                  ][idx]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
