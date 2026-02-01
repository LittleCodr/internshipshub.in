import { Helmet } from "@lib/helmet";
import { Navigate, useParams } from "react-router-dom";
import ApplyCta from "../components/ApplyCta";
import EligibilityList from "../components/EligibilityList";
import JsonLd from "../components/JsonLd";
import OpportunityCard from "../components/OpportunityCard";
import OpportunitySummary from "../components/OpportunitySummary";
import { getContentByCategory, getContentBySlug } from "../lib/content";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildJobPostingSchema,
  buildOrganizationSchema
} from "../lib/schema";
import { canonicalHref, robotsContent } from "../lib/seo";
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
  const categoryPath = category === "internship" ? "internships" : category === "job" ? "jobs" : "research";

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
        <meta property="og:url" content={frontmatter.canonicalUrl} />
        <meta property="og:image" content={frontmatter.companyLogo} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta name="keywords" content={frontmatter.keywords.join(", ")} />
        <link rel="canonical" href={canonicalHref(frontmatter.canonicalUrl)} />
        <meta name="robots" content={robotsContent(frontmatter.index)} />
      </Helmet>
      <JsonLd items={structuredData} />
      <article className="mx-auto max-w-5xl px-4 py-12">
        <nav className="text-xs text-slate-500" aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-1">
            <li>
              <a href="/" className="hover:text-brand-accent">
                Home
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <a href={`/${categoryPath}`} className="hover:text-brand-accent">
                {categoryLabels[category]}
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-700">{frontmatter.title}</li>
          </ol>
        </nav>
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-8">
          <p className="text-xs uppercase tracking-widest text-slate-500">{frontmatter.company}</p>
          <h1 className="text-3xl font-bold text-slate-900">{frontmatter.title}</h1>
          <p className="text-sm text-slate-600">{frontmatter.description}</p>
        </header>
        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-8">
            <OpportunitySummary data={frontmatter} />
            <EligibilityList data={frontmatter} />
            <section className="prose prose-slate max-w-none">
              <MDXContent />
            </section>
          </div>
          <div className="space-y-6">
            <ApplyCta data={frontmatter} />
            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Listing details</h2>
              <dl className="mt-4 space-y-3 text-xs text-slate-600">
                <div className="flex justify-between">
                  <dt>Posted</dt>
                  <dd>{new Date(frontmatter.postedAt).toLocaleDateString("en-IN")}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Published</dt>
                  <dd>{new Date(frontmatter.publishedAt).toLocaleDateString("en-IN")}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Updated</dt>
                  <dd>{new Date(frontmatter.lastUpdated).toLocaleDateString("en-IN")}</dd>
                </div>
              </dl>
            </section>
          </div>
        </div>
      </article>
      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <h2 className="text-2xl font-semibold text-slate-900">Related opportunities</h2>
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
