import { FALLBACK_LOGO } from "./content";
import { absoluteUrl, canonicalHref } from "./seo";
import type { ContentEntry } from "../types/content";

export function buildOrganizationSchema(entry: ContentEntry) {
  const logo = absoluteUrl(entry.frontmatter.companyLogo?.trim() ? entry.frontmatter.companyLogo : FALLBACK_LOGO);
  const website = entry.frontmatter.companyWebsite ? absoluteUrl(entry.frontmatter.companyWebsite) : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: entry.frontmatter.company,
    url: website,
    logo,
    sameAs: website ? [website] : []
  };
}

export function buildJobPostingSchema(entry: ContentEntry) {
  const { frontmatter } = entry;
  const employmentType = frontmatter.employmentType.replace("_", "-");
  const logo = absoluteUrl(frontmatter.companyLogo?.trim() ? frontmatter.companyLogo : FALLBACK_LOGO);
  const canonical = canonicalHref(frontmatter.canonicalUrl);
  const hiringSite = frontmatter.companyWebsite ? absoluteUrl(frontmatter.companyWebsite) : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: frontmatter.title,
    description: frontmatter.description,
    datePosted: frontmatter.postedAt,
    validThrough: frontmatter.validThrough,
    employmentType,
    jobLocationType: frontmatter.remote ? "TELECOMMUTE" : "ONSITE",
    hiringOrganization: {
      "@type": "Organization",
      name: frontmatter.company,
      sameAs: hiringSite,
      logo
    },
    jobLocation: frontmatter.remote
      ? undefined
      : {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            streetAddress: frontmatter.location,
            addressLocality: frontmatter.city,
            addressRegion: frontmatter.state,
            addressCountry: frontmatter.country
          }
        },
    applicantLocationRequirements: frontmatter.remote
      ? {
          "@type": "Country",
          name: "India"
        }
      : undefined,
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: frontmatter.stipendCurrency,
      value: {
        "@type": "QuantitativeValue",
        minValue: frontmatter.salaryMin,
        maxValue: frontmatter.salaryMax,
        unitText: frontmatter.salaryPeriod
      }
    },
    directApply: frontmatter.applyMethod === "form",
    identifier: {
      "@type": "PropertyValue",
      name: frontmatter.company,
      value: frontmatter.slug
    },
    estimatedSalary: frontmatter.stipend,
    workHours: frontmatter.workHours,
    educationRequirements: frontmatter.education,
    experienceRequirements: frontmatter.experienceRequired,
    skills: frontmatter.skills,
    url: canonical,
    industry: frontmatter.industry,
    occupationalCategory: frontmatter.role
  };
}

export function buildBreadcrumbSchema(crumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}

export function buildArticleSchema(entry: ContentEntry) {
  const { frontmatter } = entry;
  const logo = absoluteUrl(frontmatter.companyLogo?.trim() ? frontmatter.companyLogo : FALLBACK_LOGO);
  const canonical = canonicalHref(frontmatter.canonicalUrl);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    author: {
      "@type": "Person",
      name: frontmatter.author
    },
    publisher: {
      "@type": "Organization",
      name: "internshipshub.in",
      logo: {
        "@type": "ImageObject",
        url: logo
      }
    },
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.lastUpdated,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical
    },
    image: [logo],
    url: canonical
  };
}
