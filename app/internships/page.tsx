import type { Metadata } from "next";

import { FilterBar } from "@/components/filter-bar";
import { JobCard } from "@/components/job-card";
import { Pagination } from "@/components/pagination";
import { SearchInput } from "@/components/search-input";
import { StructuredData } from "@/components/structured-data";
import { getJobsByCategory } from "@/lib/content";
import { parseFilters, filterJobs, paginate, uniqueValues, uniqueSkills } from "@/lib/filters";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { buildListingMetadata } from "@/lib/seo";

const PAGE_SIZE = 12;

export const metadata: Metadata = buildListingMetadata({
  title: "Internships across India",
  description:
    "Structured internship listings across India with stipend transparency, eligibility, and deadlines mapped to Google Jobs schema.",
  path: "/internships",
  keywords: [
    "internships in india",
    "paid internships",
    "engineering internships",
    "management internships"
  ]
});

type SearchParams = Record<string, string | string[] | undefined>;

const createUrlSearchParams = (searchParams: SearchParams) => {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (!value) {
      return;
    }
    if (Array.isArray(value)) {
      value.filter(Boolean).forEach((entry) => params.append(key, entry));
    } else {
      params.set(key, value);
    }
  });
  return params;
};

export default async function InternshipsPage({
  searchParams
}: {
  searchParams: SearchParams;
}) {
  const params = createUrlSearchParams(searchParams);
  const filters = parseFilters(params);
  const page = Number(params.get("page") ?? "1");

  const internships = await getJobsByCategory("internship");
  const filtered = filterJobs(internships, { ...filters, type: "internship" });
  const { items, total, totalPages, currentPage } = paginate(filtered, page, PAGE_SIZE);

  const filterOptions = [
    {
      label: "City",
      name: "city",
      options: uniqueValues(internships, "city").map((value) => ({ label: value, value }))
    },
    {
      label: "State",
      name: "state",
      options: uniqueValues(internships, "state").map((value) => ({ label: value, value }))
    },
    {
      label: "Industry",
      name: "industry",
      options: uniqueValues(internships, "industry").map((value) => ({ label: value, value }))
    },
    {
      label: "Remote",
      name: "remote",
      options: [
        { label: "Remote only", value: "true" },
        { label: "On-site", value: "false" }
      ],
      placeholder: "All modes"
    },
    {
      label: "Skill",
      name: "skill",
      options: uniqueSkills(internships).map((value) => ({ label: value, value })),
      placeholder: "Any skill"
    }
  ];

  return (
    <div className="space-y-8">
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "InternshipsHub.in", path: "/" },
          { name: "Internships", path: "/internships" }
        ])}
      />
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Internships in India</h1>
        <p className="max-w-3xl text-base text-slate-600">
          Discover internships curated for Indian campuses with complete stipend, eligibility, and
          application timelines.
        </p>
        <SearchInput placeholder="Search internships by role, company, or keyword" />
      </header>

      <FilterBar filters={filterOptions} />

      <div className="flex items-center justify-between text-sm text-slate-600">
        <p>
          Showing <span className="font-semibold text-slate-900">{items.length}</span> of
          {" "}
          <span className="font-semibold text-slate-900">{total}</span> internships
        </p>
      </div>

      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600">
          No internships match your filters yet. Adjust the filters or check back soon.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((job) => (
            <JobCard key={`${job.type}-${job.slug}`} job={job} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/internships"
        params={params}
      />
    </div>
  );
}
