import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Breadcrumbs } from "@components/breadcrumbs";
import { JobSummaryTable } from "@components/job-summary-table";
import { ApplyCard } from "@components/apply-card";
import { PillList } from "@components/pill-list";
import { JobCard } from "@components/job-card";
import { FilterBar } from "@components/filter-bar";
import { Pagination } from "@components/pagination";
import { JsonLd } from "@components/json-ld";
import { renderMDX } from "@lib/mdx";
import {
  getContentByCategory,
  getContentBySlug,
  getRelatedContent
} from "@lib/content";
import { buildJobMetadata, buildListingMetadata } from "@lib/seo";
import { buildJsonLdPayload } from "@lib/schema";
import { toBreadcrumbSegments, formatDate } from "@lib/utils";
import { filterItems, getFilterOptions, parseListingFilters } from "@lib/filters";
import { paginate, DEFAULT_PAGE_SIZE } from "@lib/pagination";

const collection = getContentByCategory("internship");

export function generateStaticParams() {
  return collection.map((item) => ({ segments: [item.frontmatter.slug] }));
}

export function generateMetadata({
  params
}: {
  params: { segments: string[] };
}): Metadata {
  const [firstSegment] = params.segments ?? [];
  const match = firstSegment ? getContentBySlug(firstSegment) : null;
  if (match && match.frontmatter.type === "internship" && params.segments.length === 1) {
    return buildJobMetadata(match);
  }
  const keyword = params.segments.join(" ").replace(/-/g, " ");
  return buildListingMetadata({
    title: `Internships for ${keyword}`,
    description: `Curated internships tagged with ${keyword}. Filter further by stipend, location, or work model to find the right fit.`,
    path: `/internships/${params.segments.join("/")}`,
    keywords: [keyword, "internships", "india internships"]
  });
}

const decodeSegments = (segments: string[]) => segments.map((segment) => segment.replace(/-/g, " ")).join(" ");

export default async function InternshipDetailOrCategory({
  params,
  searchParams
}: {
  params: { segments: string[] };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { segments } = params;
  const [firstSegment] = segments ?? [];
  if (!firstSegment) notFound();

  const match = getContentBySlug(firstSegment);
  if (match && match.frontmatter.type === "internship" && segments.length === 1) {
    const mdxContent = await renderMDX(match.body);
    const related = getRelatedContent(match, 4);

    return (
      <article className="flex flex-col gap-10">
        <JsonLd json={buildJsonLdPayload(match)} />
        <Breadcrumbs items={toBreadcrumbSegments(match)} />
        <header className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded bg-white shadow-sm">
              <Image
                fill
                src={match.frontmatter.companyLogo}
                alt={`${match.frontmatter.company} logo`}
                className="object-contain p-2"
                sizes="56px"
              />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                {match.frontmatter.title}
              </h1>
              <p className="text-sm text-slate-600">
                {match.frontmatter.company} · Posted {formatDate(match.frontmatter.postedAt)}
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-6">
            <JobSummaryTable item={match} />
            <section className="prose prose-slate max-w-none">
              {mdxContent}
            </section>
            <PillList title="Skills" items={match.frontmatter.skills} />
            <PillList title="Eligible branches" items={match.frontmatter.branchesAllowed} />
            <PillList title="Year of study" items={match.frontmatter.yearOfStudy} />
            <PillList title="Education" items={match.frontmatter.education} />
          </div>
          <div className="flex flex-col gap-6">
            <ApplyCard item={match} />
          </div>
        </div>

        {related.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-slate-900">Similar internships</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {related.map((item) => (
                <JobCard key={item.frontmatter.slug} item={item} />
              ))}
            </div>
          </section>
        )}
      </article>
    );
  }

  // Category mode for programmatic SEO paths
  const keyword = decodeSegments(segments);
  const filters = parseListingFilters({ ...searchParams, keywords: searchParams.keywords ?? keyword });
  const filtered = filterItems(collection, filters);
  const page = Number(searchParams.page ?? "1") || 1;
  const paginated = paginate(filtered, page, DEFAULT_PAGE_SIZE);
  const options = getFilterOptions(collection);

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Internships tagged “{keyword}”
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Filter-ready listing seeded for future Google Jobs expansion. Adjust filters to tighten the cohort.
        </p>
      </header>

      <FilterBar options={options} selected={filters} action={`/internships/${segments.join("/")}`} total={filtered.length} />

      <div className="grid gap-6 md:grid-cols-2">
        {paginated.items.map((item) => (
          <JobCard key={item.frontmatter.slug} item={item} />
        ))}
        {!paginated.items.length && (
          <p className="text-sm text-slate-500">
            No internships indexed for this tag yet. New roles are added every week.
          </p>
        )}
      </div>

      <Pagination
        page={paginated.page}
        totalPages={paginated.totalPages}
        basePath={`/internships/${segments.join("/")}`}
        searchParams={searchParams}
      />
    </div>
  );
}
