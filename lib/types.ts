import type { ReactNode } from "react";
import { z } from "zod";

export const companyTypeEnum = z.enum([
  "startup",
  "mnc",
  "government",
  "university",
  "ngo"
]);

export const jobCategoryEnum = z.enum(["internship", "job", "research"]);

export const employmentTypeEnum = z.enum([
  "INTERN",
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT"
]);

export const salaryPeriodEnum = z.enum(["MONTH", "YEAR"]);

export const applyMethodEnum = z.enum(["external", "email", "form"]);

export const jobFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  company: z.string().min(1),
  companyLogo: z.string().min(1),
  companyWebsite: z.string().url(),
  companyType: companyTypeEnum,
  type: jobCategoryEnum,
  role: z.string().min(1),
  industry: z.string().min(1),
  employmentType: employmentTypeEnum,
  workHours: z.string().min(1),
  experienceRequired: z.string().min(1),
  location: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.literal("India"),
  remote: z.boolean(),
  hybrid: z.boolean(),
  stipend: z.string().min(1),
  stipendCurrency: z.literal("INR"),
  salaryMin: z.number(),
  salaryMax: z.number(),
  salaryPeriod: salaryPeriodEnum,
  paid: z.boolean(),
  duration: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  deadline: z.string().min(1),
  postedAt: z.string().min(1),
  publishedAt: z.string().min(1),
  validThrough: z.string().min(1),
  eligibility: z.string().min(1),
  education: z.array(z.string().min(1)),
  skills: z.array(z.string().min(1)),
  branchesAllowed: z.array(z.string().min(1)),
  yearOfStudy: z.array(z.string().min(1)),
  ageLimit: z.string().min(1),
  applyLink: z.string().url(),
  applyMethod: applyMethodEnum,
  applicationFee: z.number(),
  numberOfOpenings: z.number().int().positive(),
  keywords: z.array(z.string().min(1)),
  canonicalUrl: z.string().url(),
  index: z.boolean(),
  priority: z.number().min(0).max(1),
  author: z.string().min(1),
  source: z.string().min(1),
  lastUpdated: z.string().min(1)
});

export type JobFrontmatter = z.infer<typeof jobFrontmatterSchema>;

export type JobWithContent = JobFrontmatter & {
  content: ReactNode;
};

export type JobSummary = JobFrontmatter;

export type ContentCategory = z.infer<typeof jobCategoryEnum>;
