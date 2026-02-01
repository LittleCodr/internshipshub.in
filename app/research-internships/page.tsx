import type { Metadata } from "next";
import { JobCard } from "@components/job-card";
import { FilterBar } from "@components/filter-bar";
import { Pagination } from "@components/pagination";
import { getContentByCategory } from "@lib/content";
import { parseListingFilters, filterItems, getFilterOptions } from "@lib/filters";
import { paginate, DEFAULT_PAGE_SIZE } from "@lib/pagination";
import { buildListingMetadata } from "@lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = buildListingMetadata({
  title: "Research internships across India",
  description:
    "Handpicked research internships from IISc, IITs, and top labs. Structured data ready for citations and Google Jobs coverage.",
  path: "/research-internships",
  keywords: ["research internships india", "iisc internships", "ai research internships"]
});

export default function ResearchInternshipsIndex({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const filters = parseListingFilters(searchParams);
  const collection = getContentByCategory("research");
  const filtered = filterItems(collection, filters);
  const page = Number(searchParams.page ?? "1") || 1;
  const paginated = paginate(filtered, page, DEFAULT_PAGE_SIZE);
  const options = getFilterOptions(collection);

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Research internships with publication tracks
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          University-backed roles with mentorship pods, stipends, and clear expectations. Perfect for graduate school applications.
        </p>
      </header>

      <FilterBar
        options={options}
        selected={filters}
        action="/research-internships"
        total={filtered.length}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {paginated.items.map((item) => (
          <JobCard key={item.frontmatter.slug} item={item} />
        ))}
        {!paginated.items.length && (
          <p className="text-sm text-slate-500">
            No research roles match these filters. Try removing a filter or check back later.
          </p>
        )}
      </div>

      <Pagination
        page={paginated.page}
        totalPages={paginated.totalPages}
        basePath="/research-internships"
        searchParams={searchParams}
      />
    </div>
  );
}
