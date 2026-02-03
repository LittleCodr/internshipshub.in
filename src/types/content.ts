import type { ComponentType } from "react";

export type CompanyType = "startup" | "mnc" | "government" | "university" | "ngo";
export type OpportunityType = "internship" | "job" | "research";
export type EmploymentType = "INTERN" | "FULL_TIME" | "PART_TIME" | "CONTRACT";
export type ApplyMethod = "external" | "email" | "form";

export interface ContentFrontmatter {
  metaTitle?: string;
  metaDescription?: string;
  instituteType?: "IIT" | "NIT" | "IIIT";
  year?: number;
  title: string;
  slug: string;
  description: string;
  company: string;
  companyLogo: string;
  companyWebsite: string;
  companyType: CompanyType;
  type: OpportunityType;
  role: string;
  industry: string;
  employmentType: EmploymentType;
  workHours: string;
  experienceRequired: string;
  location: string;
  city: string;
  state: string;
  country: "India";
  remote: boolean;
  hybrid: boolean;
  stipend: string;
  stipendCurrency: "INR";
  salaryMin: number;
  salaryMax: number;
  salaryPeriod: "MONTH" | "YEAR";
  paid: boolean;
  duration: string;
  startDate: string;
  endDate: string;
  deadline: string;
  postedAt: string;
  publishedAt: string;
  validThrough: string;
  eligibility: string;
  education: string;
  skills: string[];
  branchesAllowed: string[];
  yearOfStudy: string;
  ageLimit: string;
  applyLink: string;
  applyMethod: ApplyMethod;
  applicationFee: number;
  numberOfOpenings: number;
  keywords: string[];
  canonicalUrl: string;
  index: boolean;
  priority: number;
  author: string;
  source: string;
  lastUpdated: string;
}

export interface ContentEntry {
  frontmatter: ContentFrontmatter;
  slug: string;
  category: OpportunityType;
  component: ComponentType;
}
