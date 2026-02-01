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
  title: "Latest internships in India",
  description:
    "Discover structured, verified internships across India. Filter by city, company type, stipend, and work model to build your weekly pipeline.",
  path: "/internships",
  keywords: ["internships in india", "remote internships", "paid internships"]
});

export default function InternshipsIndex({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const filters = parseListingFilters(searchParams);
  const collection = getContentByCategory("internship");
  const filtered = filterItems(collection, filters);
  const page = Number(searchParams.page ?? "1") || 1;
  const paginated = paginate(filtered, page, DEFAULT_PAGE_SIZE);
  const options = getFilterOptions(collection);

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Internships ready for Google Jobs
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Every listing ships with full JobPosting schema, stipend transparency, and direct apply links.
        </p>
      </header>

      <FilterBar options={options} selected={filters} action="/internships" total={filtered.length} />

      <div className="grid gap-6 md:grid-cols-2">
        {paginated.items.map((item) => (
          <JobCard key={item.frontmatter.slug} item={item} />
        ))}
        {!paginated.items.length && (
          <p className="text-sm text-slate-500">
            No internships match these filters yet. Adjust filters or check back in a few days.
          </p>
        )}
      </div>

      <Pagination
        page={paginated.page}
        totalPages={paginated.totalPages}
        basePath="/internships"
        searchParams={searchParams}
      />
    </div>
  );
}
