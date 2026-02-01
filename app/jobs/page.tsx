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
  title: "Entry-level jobs across India",
  description:
    "Structured fresher and associate roles from India’s top product teams. Filters for city, industry, and employment type included.",
  path: "/jobs",
  keywords: ["entry level jobs india", "associate product manager jobs", "graduate jobs india"]
});

export default function JobsIndex({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const filters = parseListingFilters(searchParams);
  const collection = getContentByCategory("job");
  const filtered = filterItems(collection, filters);
  const page = Number(searchParams.page ?? "1") || 1;
  const paginated = paginate(filtered, page, DEFAULT_PAGE_SIZE);
  const options = getFilterOptions(collection);

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Fresher-friendly jobs ready to apply
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Associate and analyst roles with transparent salary bands, direct company links, and Google Jobs-ready metadata.
        </p>
      </header>

      <FilterBar options={options} selected={filters} action="/jobs" total={filtered.length} />

      <div className="grid gap-6 md:grid-cols-2">
        {paginated.items.map((item) => (
          <JobCard key={item.frontmatter.slug} item={item} />
        ))}
        {!paginated.items.length && (
          <p className="text-sm text-slate-500">
            No jobs match these filters yet. Adjust filters or check back soon.
          </p>
        )}
      </div>

      <Pagination
        page={paginated.page}
        totalPages={paginated.totalPages}
        basePath="/jobs"
        searchParams={searchParams}
      />
    </div>
  );
}
