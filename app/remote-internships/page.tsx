import type { Metadata } from "next";
import { JobCard } from "@components/job-card";
import { FilterBar } from "@components/filter-bar";
import { Pagination } from "@components/pagination";
import { getAllContent } from "@lib/content";
import { parseListingFilters, filterItems, getFilterOptions } from "@lib/filters";
import { paginate, DEFAULT_PAGE_SIZE } from "@lib/pagination";
import { buildListingMetadata } from "@lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = buildListingMetadata({
  title: "Remote internships and early jobs",
  description:
    "Verified remote-first internships and jobs hiring across India. Includes stipend bands, async collaboration practices, and deadlines.",
  path: "/remote-internships",
  keywords: ["remote internships india", "work from home internships", "remote jobs for students"]
});

export default function RemoteInternshipsIndex({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const coercedParams = { ...searchParams } as Record<string, string | string[] | undefined>;
  if (!coercedParams.remote) {
    coercedParams.remote = "true";
  }
  const filters = parseListingFilters(coercedParams);
  const collection = getAllContent().filter((item) => item.frontmatter.remote);
  const filtered = filterItems(collection, filters);
  const page = Number(searchParams.page ?? "1") || 1;
  const paginated = paginate(filtered, page, DEFAULT_PAGE_SIZE);
  const options = getFilterOptions(collection);

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Remote-first internships and jobs hiring now
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Opportunities built for distributed teams across India with async onboarding and global exposure.
        </p>
      </header>

      <FilterBar options={options} selected={filters} action="/remote-internships" total={filtered.length} />

      <div className="grid gap-6 md:grid-cols-2">
        {paginated.items.map((item) => (
          <JobCard key={item.frontmatter.slug} item={item} />
        ))}
        {!paginated.items.length && (
          <p className="text-sm text-slate-500">
            No remote roles match these filters. Loosen filters or check again soon.
          </p>
        )}
      </div>

      <Pagination
        page={paginated.page}
        totalPages={paginated.totalPages}
        basePath="/remote-internships"
        searchParams={searchParams}
      />
    </div>
  );
}
