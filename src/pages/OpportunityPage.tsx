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
            aria-label="Share"
          >
           <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#1976D2" d="M38.1,31.2L19.4,24l18.7-7.2c1.5-0.6,2.3-2.3,1.7-3.9c-0.6-1.5-2.3-2.3-3.9-1.7l-26,10C8.8,21.6,8,22.8,8,24s0.8,2.4,1.9,2.8l26,10c0.4,0.1,0.7,0.2,1.1,0.2c1.2,0,2.3-0.7,2.8-1.9C40.4,33.5,39.6,31.8,38.1,31.2z"/><path fill="#1E88E5" d="M11 17A7 7 0 1 0 11 31 7 7 0 1 0 11 17zM37 7A7 7 0 1 0 37 21 7 7 0 1 0 37 7zM37 27A7 7 0 1 0 37 41 7 7 0 1 0 37 27z"/></svg>
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
                    aria-label={`Share on ${item.label}`}
                  >
                    <span aria-hidden>
                      {item.label === "WhatsApp" && (
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                          <path d="M12 2a10 10 0 0 0-8.9 14.9L2 22l5.3-1.4A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 6.8 12.3l-.2.3-.6.9-1-.2-.6-.2a7.9 7.9 0 0 1-3.5-1.5c-.8-.6-2-1.8-2.7-2.8-.5-.7-1.2-1.9-1.4-2.7-.1-.6 0-1 .2-1.4l.6-.7c.3-.3.5-.4.8-.3l.3.1.4.2c.3.3.4.6.4 1l-.1.5c-.1.2-.2.5-.3.6l-.1.2c-.1.2-.1.3 0 .5.3.6.7 1.1 1.2 1.7.5.5 1.2 1 1.8 1.3.2.1.3.1.5 0l.7-.3c.4-.2.8-.3 1.1-.2.3.1.7.4 1 .7.2.3.5.6.6.9.1.3.1.6 0 .9l-.4.9-.2.4c-.1.3-.4.4-.7.5l-.4.1A8 8 0 0 1 12 4Z" />
                        </svg>
                      )}
                      {item.label === "LinkedIn" && (
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 8.98h4v12H3v-12Zm7 0h3.8v1.6h.1c.5-1 1.8-2 3.6-2 3.8 0 4.5 2.4 4.5 5.6v6.8h-4v-6c0-1.4 0-3.2-2-3.2s-2.2 1.5-2.2 3.1v6.1h-4v-12Z" />
                        </svg>
                      )}
                      {item.label === "X (Twitter)" && (
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                          <path d="M4 3h4.5l3.1 4.6L15.9 3H20l-6 7.2 6.6 9.8h-4.5l-3.6-5.4-4.1 5.4H4.3l6.4-7.6L4 3Z" />
                        </svg>
                      )}
                      {item.label === "Email" && (
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                          <path d="M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm14.4 2H5.6L12 11.3 18.4 6Z" />
                          <path d="m20 7.7-8 5.8-8-5.8V18h16V7.7Z" />
                        </svg>
                      )}
                    </span>
                    <span className="sr-only">{item.label}</span>
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
