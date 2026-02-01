import type { Metadata } from "next";

import { FilterBar } from "@/components/filter-bar";
import { JobCard } from "@/components/job-card";
import { Pagination } from "@/components/pagination";
import { SearchInput } from "@/components/search-input";
import { StructuredData } from "@/components/structured-data";
import { getRemoteJobs } from "@/lib/content";
import { parseFilters, filterJobs, paginate, uniqueValues, uniqueSkills } from "@/lib/filters";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { buildListingMetadata } from "@/lib/seo";

const PAGE_SIZE = 12;

export const metadata: Metadata = buildListingMetadata({
  title: "Remote internships and jobs",
  description:
    "Remote-first internships, jobs, and research roles across India with verified stipends and deadlines.",
  path: "/remote-internships",
  keywords: [
    "remote internships india",
    "work from home internships",
    "remote jobs india",
    "virtual internships"
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

export default async function RemoteInternshipsPage({
  searchParams
}: {
  searchParams: SearchParams;
}) {
  const params = createUrlSearchParams(searchParams);
  const filters = parseFilters(params);
  const page = Number(params.get("page") ?? "1");

  const remote = await getRemoteJobs();
  const filtered = filterJobs(remote, { ...filters, remote: true });
  const { items, total, totalPages, currentPage } = paginate(filtered, page, PAGE_SIZE);

  const filterOptions = [
    {
      label: "Type",
      name: "type",
      options: [
        { label: "Internships", value: "internship" },
        { label: "Jobs", value: "job" },
        { label: "Research", value: "research" }
      ],
      placeholder: "All types"
    },
    {
      label: "Industry",
      name: "industry",
      options: uniqueValues(remote, "industry").map((value) => ({ label: value, value }))
    },
    {
      label: "Skill",
      name: "skill",
      options: uniqueSkills(remote).map((value) => ({ label: value, value })),
      placeholder: "Any skill"
    }
  ];

  return (
    <div className="space-y-8">
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "InternshipsHub.in", path: "/" },
          { name: "Remote Internships", path: "/remote-internships" }
        ])}
      />
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Remote internships & jobs</h1>
        <p className="max-w-3xl text-base text-slate-600">
          Work-from-anywhere internships and jobs with verified Indian employers and universities.
        </p>
        <SearchInput placeholder="Search remote internships and jobs" />
      </header>

      <FilterBar filters={filterOptions} />

      <div className="flex items-center justify-between text-sm text-slate-600">
        <p>
          Showing <span className="font-semibold text-slate-900">{items.length}</span> of
          {" "}
          <span className="font-semibold text-slate-900">{total}</span> remote opportunities
        </p>
      </div>

      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600">
          No remote roles match your filters yet. Adjust the filters or explore hybrid options.
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
        basePath="/remote-internships"
        params={params}
      />
    </div>
  );
}
