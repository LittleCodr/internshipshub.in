import {
  type JobContentItem,
  type CompanyType,
  type EmploymentType
} from "@lib/content-types";

export interface ListingFilters {
  city?: string;
  state?: string;
  industry?: string;
  companyType?: CompanyType;
  employmentType?: EmploymentType;
  remote?: boolean;
  hybrid?: boolean;
  paid?: boolean;
  keywords?: string;
}

const normalizeBoolean = (value: string | undefined) => {
  if (!value) return undefined;
  if (["true", "1", "yes"].includes(value.toLowerCase())) return true;
  if (["false", "0", "no"].includes(value.toLowerCase())) return false;
  return undefined;
};

export const parseListingFilters = (
  searchParams: Record<string, string | string[] | undefined>
): ListingFilters => {
  const valueOf = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value ?? undefined;
  };

  return {
    city: valueOf("city"),
    state: valueOf("state"),
    industry: valueOf("industry"),
    companyType: valueOf("companyType") as ListingFilters["companyType"],
    employmentType: valueOf("employmentType") as ListingFilters["employmentType"],
    remote: normalizeBoolean(valueOf("remote")),
    hybrid: normalizeBoolean(valueOf("hybrid")),
    paid: normalizeBoolean(valueOf("paid")),
    keywords: valueOf("keywords")
  };
};

export const filterItems = (
  items: JobContentItem[],
  filters: ListingFilters
): JobContentItem[] => {
  return items.filter(({ frontmatter }) => {
    if (filters.city && frontmatter.city.toLowerCase() !== filters.city.toLowerCase()) {
      return false;
    }
    if (filters.state && frontmatter.state.toLowerCase() !== filters.state.toLowerCase()) {
      return false;
    }
    if (
      filters.industry &&
      !frontmatter.industry.toLowerCase().includes(filters.industry.toLowerCase())
    ) {
      return false;
    }
    if (filters.companyType && frontmatter.companyType !== filters.companyType) {
      return false;
    }
    if (filters.employmentType && frontmatter.employmentType !== filters.employmentType) {
      return false;
    }
    if (filters.remote !== undefined && frontmatter.remote !== filters.remote) {
      return false;
    }
    if (filters.hybrid !== undefined && frontmatter.hybrid !== filters.hybrid) {
      return false;
    }
    if (filters.paid !== undefined && frontmatter.paid !== filters.paid) {
      return false;
    }
    if (filters.keywords) {
      const needle = filters.keywords.toLowerCase();
      const haystack = [
        frontmatter.title,
        frontmatter.description,
        frontmatter.role,
        ...frontmatter.keywords
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(needle)) {
        return false;
      }
    }
    return true;
  });
};

export const getFilterOptions = (items: JobContentItem[]) => {
  const unique = <T>(values: T[]) => Array.from(new Set(values)).sort();

  return {
    cities: unique(items.map((item) => item.frontmatter.city)),
    states: unique(items.map((item) => item.frontmatter.state)),
    industries: unique(items.map((item) => item.frontmatter.industry)),
    companyTypes: unique(items.map((item) => item.frontmatter.companyType)),
    employmentTypes: unique(items.map((item) => item.frontmatter.employmentType))
  };
};
