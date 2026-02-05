import { Helmet } from "@lib/helmet";
import { useState } from "react";
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
  const [shareStatus, setShareStatus] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);

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

  const shareText = `${frontmatter.title} — ${frontmatter.company}`;
  const shareLinks = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${canonical}`)}`
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}`
    },
    {
      label: "X (Twitter)",
      href: `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(canonical)}`
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(canonical)}`
    }
  ];

  const handleShare = async () => {
    const linkToShare = canonical;
    try {
      if (navigator.share) {
        await navigator.share({ title: frontmatter.title, text: frontmatter.description, url: linkToShare });
        setShareStatus("Shared");
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(linkToShare);
        setShareStatus("Link copied");
      } else {
        setShareStatus("Copy not supported");
      }
    } catch (error) {
      setShareStatus("Share cancelled");
    } finally {
      setTimeout(() => setShareStatus(null), 1800);
    }
  };

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
      <article className="mx-auto max-w-6xl px-4 pt-12 pb-24">
        <div className="fixed left-3 top-1/2 z-30 -translate-y-1/2">
          <button
            type="button"
            aria-expanded={shareOpen}
            onClick={() => setShareOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:text-emerald-800"
          >
            ✦
          </button>
          {shareOpen && (
            <div className="mt-3 w-44 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
              <p className="text-xs font-semibold text-slate-700">Share</p>
              <div className="mt-2 grid gap-2 text-sm font-semibold text-emerald-700">
                {shareLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 transition hover:border-emerald-200 hover:bg-white"
                  >
                    <span>{item.label}</span>
                    <span aria-hidden>↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
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

        <header className="mt-6 rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex flex-wrap items-center gap-3">
              <a href={`/${categoryPath}`} className="font-semibold text-emerald-700 hover:text-emerald-800">
                ← Back to {categoryLabels[category]}
              </a>
              <span className="hidden sm:inline text-slate-300">•</span>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-800"
              >
                Share
              </button>
              {shareStatus && <span className="text-emerald-700">{shareStatus}</span>}
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <span>Posted {new Date(frontmatter.postedAt).toLocaleDateString("en-IN")}</span>
              <span className="text-slate-300">•</span>
              <span>Updated {new Date(frontmatter.lastUpdated).toLocaleDateString("en-IN")}</span>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-800">
                <span className="pill bg-white ring-emerald-100">{frontmatter.type}</span>
                <span className="pill bg-emerald-50 ring-emerald-100">{frontmatter.remote ? "Remote" : `${frontmatter.city}, ${frontmatter.state}`}</span>
                <span className="pill bg-amber-50 ring-amber-100">Apply by {new Date(frontmatter.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-emerald-700">{frontmatter.company}</p>
                <h1 className="mt-1 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">{frontmatter.title}</h1>
              </div>
              <p className="max-w-3xl text-sm text-slate-700">{frontmatter.description}</p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-700">
                {frontmatter.keywords.slice(0, 6).map((kw) => (
                  <span key={kw} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-semibold">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <a
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"
                href="#apply"
              >
                Apply now
                <span aria-hidden>↗</span>
              </a>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">Deadline</span>
                  <span>{new Date(frontmatter.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-semibold text-slate-900">Location</span>
                  <span>{frontmatter.remote ? "Remote" : `${frontmatter.city}, ${frontmatter.state}`}</span>
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
      <div className="fixed bottom-4 left-4 right-4 z-20 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg shadow-emerald-200/40 lg:hidden">
        <div>
          <p className="text-xs font-semibold text-slate-900">Apply by {new Date(frontmatter.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
          <p className="text-[11px] text-slate-600">{frontmatter.company}</p>
        </div>
        <a
          href={frontmatter.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"
        >
          Apply
          <span aria-hidden>↗</span>
        </a>
      </div>
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
