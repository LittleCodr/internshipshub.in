import type { JobFrontmatter } from "@/lib/types";
import { SITE_URL, siteConfig } from "@/lib/site";
import { getCanonicalUrl } from "@/lib/utils";

export type Breadcrumb = {
  name: string;
  path: string;
};

const toUrl = (path: string) => getCanonicalUrl(path, SITE_URL);

export const buildJobPostingSchema = (job: JobFrontmatter) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: job.title,
  description: job.description,
  datePosted: job.postedAt,
  validThrough: job.validThrough,
  employmentType: job.employmentType,
  hiringOrganization: {
    "@type": "Organization",
    name: job.company,
    sameAs: job.companyWebsite,
    logo: job.companyLogo.startsWith("http")
      ? job.companyLogo
      : toUrl(job.companyLogo)
  },
  jobLocationType: job.remote ? "TELECOMMUTE" : undefined,
  applicantLocationRequirements: {
    "@type": "Country",
    name: job.country
  },
  jobLocation: job.remote
    ? undefined
    : {
        "@type": "Place",
        name: job.location,
        address: {
          "@type": "PostalAddress",
          streetAddress: job.location,
          addressLocality: job.city,
          addressRegion: job.state,
          addressCountry: job.country
        }
      },
  baseSalary: {
    "@type": "MonetaryAmount",
    currency: job.stipendCurrency,
    value: {
      "@type": "QuantitativeValue",
      minValue: job.salaryMin,
      maxValue: job.salaryMax,
      unitText: job.salaryPeriod
    }
  },
  image: job.companyLogo.startsWith("http") ? job.companyLogo : toUrl(job.companyLogo),
  occupationalCategory: job.industry,
  experienceRequirements: job.experienceRequired,
  qualifications: job.education.join(", "),
  skills: job.skills.join(", "),
  jobStartDate: job.startDate,
  jobEndDate: job.endDate,
  totalJobOpenings: job.numberOfOpenings,
  workHours: job.workHours,
  directApply: job.applyMethod === "form",
  incentives: job.stipend,
  applicationContact: {
    "@type": "ContactPoint",
    contactType: "recruiting",
    url: job.applyLink
  },
  industry: job.industry,
  identifier: {
    "@type": "PropertyValue",
    name: job.company,
    value: job.slug
  },
  url: job.canonicalUrl
});

export const buildBreadcrumbSchema = (crumbs: Breadcrumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: toUrl(crumb.path)
  }))
});

export const buildArticleSchema = (job: JobFrontmatter) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: job.title,
  description: job.description,
  datePublished: job.publishedAt,
  dateModified: job.lastUpdated,
  image: job.companyLogo.startsWith("http") ? job.companyLogo : toUrl(job.companyLogo),
  author: {
    "@type": "Person",
    name: job.author
  },
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: SITE_URL
  },
  mainEntityOfPage: job.canonicalUrl
});

export const buildOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: SITE_URL,
  logo: toUrl(siteConfig.logoPath),
  sameAs: Object.values(siteConfig.socials).filter(Boolean),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: siteConfig.email
  }
});
