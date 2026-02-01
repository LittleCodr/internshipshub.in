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
  title: "Research internships in India",
  description:
    "Research internships and fellowships across Indian universities, labs, and think tanks with structured eligibility and deadlines.",
  path: "/research-internships",
  keywords: [
    "research internships india",
    "summer research fellowships",
    "iit research internships",
    "research assistant internships"
  ]
});

type SearchParams = Record<string, string | string[] | undefined>;

export const runtime = "edge";

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

export default async function ResearchInternshipsPage({
  searchParams
}: {
  searchParams: SearchParams;
}) {
  const params = createUrlSearchParams(searchParams);
  const filters = parseFilters(params);
  const page = Number(params.get("page") ?? "1");

  const research = await getJobsByCategory("research");
  const filtered = filterJobs(research, { ...filters, type: "research" });
  const { items, total, totalPages, currentPage } = paginate(filtered, page, PAGE_SIZE);

  const filterOptions = [
    {
      label: "City",
      name: "city",
      options: uniqueValues(research, "city").map((value) => ({ label: value, value }))
    },
    {
      label: "State",
      name: "state",
      options: uniqueValues(research, "state").map((value) => ({ label: value, value }))
    },
    {
      label: "Industry",
      name: "industry",
      options: uniqueValues(research, "industry").map((value) => ({ label: value, value }))
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
      options: uniqueSkills(research).map((value) => ({ label: value, value })),
      placeholder: "Any skill"
    }
  ];

  return (
    <div className="space-y-8">
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "InternshipsHub.in", path: "/" },
          { name: "Research Internships", path: "/research-internships" }
        ])}
      />
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Research internships</h1>
        <p className="max-w-3xl text-base text-slate-600">
          Explore labs, think tanks, and university-led research internships with structured
          eligibility details.
        </p>
        <SearchInput placeholder="Search research internships" />
      </header>

      <FilterBar filters={filterOptions} />

      <div className="flex items-center justify-between text-sm text-slate-600">
        <p>
          Showing <span className="font-semibold text-slate-900">{items.length}</span> of
          {" "}
          <span className="font-semibold text-slate-900">{total}</span> research roles
        </p>
      </div>

      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600">
          No research internships match your selection yet. Adjust the filters or subscribe for
          updates.
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
        basePath="/research-internships"
        params={params}
      />
    </div>
  );
}
