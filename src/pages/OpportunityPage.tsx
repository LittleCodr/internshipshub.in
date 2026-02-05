import { Helmet } from "@lib/helmet";
import { Navigate, useParams } from "react-router-dom";
import ApplyCta from "../components/ApplyCta";
import EligibilityList from "../components/EligibilityList";
import JsonLd from "../components/JsonLd";
import OpportunityCard from "../components/OpportunityCard";
import OpportunitySummary from "../components/OpportunitySummary";
import { FALLBACK_LOGO, getContentByCategory, getContentBySlug } from "../lib/content";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildJobPostingSchema,
  buildOrganizationSchema
} from "../lib/schema";
import { absoluteUrl, canonicalHref, robotsContent } from "../lib/seo";
import type { OpportunityType } from "../types/content";

interface OpportunityPageProps {
  category: OpportunityType;
}

const categoryLabels: Record<OpportunityType, string> = {
  internship: "Internships",
  job: "Jobs",
  research: "Research"
};

const OpportunityPage = ({ category }: OpportunityPageProps) => {
  const { slug } = useParams();
  const entry = slug ? getContentBySlug(category, slug) : undefined;

  if (!entry) {
    return <Navigate to="/404" replace />;
  }

  const MDXContent = entry.component;
  const { frontmatter } = entry;
  const metaImage = absoluteUrl(frontmatter.companyLogo?.trim() ? frontmatter.companyLogo : FALLBACK_LOGO);
  const categoryPath = category === "internship" ? "internships" : category === "job" ? "jobs" : "research";
  const canonical = canonicalHref(frontmatter.canonicalUrl);

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", url: "https://internshipshub.in/" },
    {
      name: categoryLabels[category],
      url: `https://internshipshub.in/${categoryPath}`
    },
    { name: frontmatter.title, url: frontmatter.canonicalUrl }
  ]);

  const structuredData = [
    buildJobPostingSchema(entry),
    buildArticleSchema(entry),
    buildOrganizationSchema(entry),
    breadcrumbs
  ];

  const related = getContentByCategory(category)
    .filter((item) => item.slug !== entry.slug)
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{frontmatter.title} | internshipshub.in</title>
        <meta name="description" content={frontmatter.description} />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={metaImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta name="keywords" content={frontmatter.keywords.join(", ")} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content={robotsContent(frontmatter.index)} />
      </Helmet>
      <JsonLd items={structuredData} />
      <article className="mx-auto max-w-6xl px-4 py-12">
        <nav className="text-xs text-slate-500" aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-1">
            <li>
              <a href="/" className="hover:text-emerald-700">
                Home
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <a href={`/${categoryPath}`} className="hover:text-emerald-700">
                {categoryLabels[category]}
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-700">{frontmatter.title}</li>
          </ol>
        </nav>

        <header className="relative mt-6 overflow-hidden rounded-3xl border border-emerald-50/80 bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-6 shadow-[0_22px_60px_-32px_rgba(6,95,70,0.4)]">
          <div className="absolute right-10 top-0 h-32 w-32 rotate-12 bg-gradient-to-br from-emerald-200/40 to-cyan-200/20 blur-3xl" aria-hidden />
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800">
                <span className="pill">{frontmatter.type}</span>
                <span className="pill bg-emerald-50 ring-emerald-100/80">{frontmatter.remote ? "Remote" : `${frontmatter.city}, ${frontmatter.state}`}</span>
                <span className="pill bg-amber-50 ring-amber-100/80">Apply by {new Date(frontmatter.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-700">{frontmatter.company}</p>
                <h1 className="mt-1 text-3xl font-bold text-slate-900 leading-tight">{frontmatter.title}</h1>
              </div>
              <p className="max-w-3xl text-sm text-slate-700">{frontmatter.description}</p>
              <div className="flex flex-wrap gap-2 text-xs text-emerald-800">
                {frontmatter.keywords.slice(0, 6).map((kw) => (
                  <span key={kw} className="rounded-full bg-white/90 px-3 py-1 font-semibold ring-1 ring-emerald-100">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <a
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5"
                href="#apply"
              >
                Apply now
                <span aria-hidden>↗</span>
              </a>
              <div className="rounded-2xl border border-emerald-100 bg-white/70 px-4 py-3 text-xs text-slate-700 shadow">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-emerald-800">Posted</span>
                  <span>{new Date(frontmatter.postedAt).toLocaleDateString("en-IN")}</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-semibold text-emerald-800">Updated</span>
                  <span>{new Date(frontmatter.lastUpdated).toLocaleDateString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-8">
            <OpportunitySummary data={frontmatter} />
            <EligibilityList data={frontmatter} />
            <section className="prose prose-slate max-w-none">
              <MDXContent />
            </section>
          </div>
          <div className="space-y-6 lg:sticky lg:top-20" id="apply">
            <ApplyCta data={frontmatter} />
            <section className="glass-card border border-emerald-50/80 p-6 shadow-lg shadow-emerald-100/50">
              <h2 className="text-lg font-semibold text-slate-900">Listing details</h2>
              <dl className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="flex justify-between">
                  <dt>Published</dt>
                  <dd>{new Date(frontmatter.publishedAt).toLocaleDateString("en-IN")}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Last updated</dt>
                  <dd>{new Date(frontmatter.lastUpdated).toLocaleDateString("en-IN")}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Valid through</dt>
                  <dd>{new Date(frontmatter.validThrough).toLocaleDateString("en-IN")}</dd>
                </div>
              </dl>
            </section>
          </div>
        </div>
      </article>
      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Related opportunities</h2>
            <a href={`/${categoryPath}`} className="text-sm font-semibold text-emerald-700 hover:text-emerald-600">
              View all {categoryLabels[category].toLowerCase()} ↗
            </a>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <OpportunityCard key={item.slug} entry={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default OpportunityPage;
