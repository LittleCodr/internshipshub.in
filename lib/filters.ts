import type { JobFrontmatter } from "@/lib/types";

export type ListingFilters = {
  q?: string;
  city?: string;
  state?: string;
  industry?: string;
  remote?: boolean;
  hybrid?: boolean;
  paid?: boolean;
  type?: string;
  skill?: string;
};

export const parseFilters = (params: URLSearchParams): ListingFilters => {
  const toBoolean = (value: string | null) => value === "true";

  return {
    q: params.get("q") ?? undefined,
    city: params.get("city") ?? undefined,
    state: params.get("state") ?? undefined,
    industry: params.get("industry") ?? undefined,
    remote: params.has("remote") ? toBoolean(params.get("remote")) : undefined,
    hybrid: params.has("hybrid") ? toBoolean(params.get("hybrid")) : undefined,
    paid: params.has("paid") ? toBoolean(params.get("paid")) : undefined,
    type: params.get("type") ?? undefined,
    skill: params.get("skill") ?? undefined
  };
};

const textIncludes = (haystack: string, needle?: string) =>
  needle ? haystack.toLowerCase().includes(needle.toLowerCase()) : true;

export const filterJobs = (jobs: JobFrontmatter[], filters: ListingFilters) =>
  jobs.filter((job) => {
    if (!textIncludes(`${job.title} ${job.description} ${job.role}`, filters.q)) {
      return false;
    }

    if (filters.city && job.city.toLowerCase() !== filters.city.toLowerCase()) {
      return false;
    }

    if (filters.state && job.state.toLowerCase() !== filters.state.toLowerCase()) {
      return false;
    }

    if (filters.industry && job.industry.toLowerCase() !== filters.industry.toLowerCase()) {
      return false;
    }

    if (typeof filters.remote === "boolean" && job.remote !== filters.remote) {
      return false;
    }

    if (typeof filters.hybrid === "boolean" && job.hybrid !== filters.hybrid) {
      return false;
    }

    if (typeof filters.paid === "boolean" && job.paid !== filters.paid) {
      return false;
    }

    if (filters.type && job.type !== filters.type) {
      return false;
    }

    if (filters.skill) {
      const match = job.skills.some(
        (skill) => skill.toLowerCase() === filters.skill?.toLowerCase()
      );
      if (!match) {
        return false;
      }
    }

    return true;
  });

export const paginate = <T,>(items: T[], page: number, perPage: number) => {
  const total = items.length;
  const totalPages = Math.ceil(total / perPage) || 1;
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  return {
    items: items.slice(start, end),
    total,
    totalPages,
    currentPage
  };
};

export const uniqueValues = (jobs: JobFrontmatter[], field: keyof JobFrontmatter) =>
  Array.from(new Set(jobs.map((job) => job[field] as string))).sort();

export const uniqueSkills = (jobs: JobFrontmatter[]) =>
  Array.from(new Set(jobs.flatMap((job) => job.skills))).sort();
