import { type JobContentItem } from "@lib/content-types";
import { ORGANIZATION, SITE_META } from "@lib/site";
import { toBreadcrumbSegments } from "@lib/utils";

const toAbsoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE_META.url}${path}`;

export const buildOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: ORGANIZATION.name,
  legalName: ORGANIZATION.legalName,
  url: ORGANIZATION.url,
  logo: ORGANIZATION.logo,
  sameAs: [SITE_META.url]
});

export const buildBreadcrumbSchema = (item: JobContentItem) => {
  const crumbs = toBreadcrumbSegments(item);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_META.url}${crumb.href}`
    }))
  };
};

export const buildArticleSchema = (item: JobContentItem) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: item.frontmatter.title,
  description: item.frontmatter.description,
  datePublished: item.frontmatter.publishedAt,
  dateModified: item.frontmatter.lastUpdated,
  author: {
    "@type": "Organization",
    name: ORGANIZATION.name,
    url: SITE_META.url
  },
  publisher: {
    "@type": "Organization",
    name: ORGANIZATION.name,
    logo: {
      "@type": "ImageObject",
      url: ORGANIZATION.logo
    }
  },
  mainEntityOfPage: item.frontmatter.canonicalUrl,
  image: toAbsoluteUrl(item.frontmatter.companyLogo)
});

export const buildJobPostingSchema = (item: JobContentItem) => {
  const {
    frontmatter: {
      title,
      description,
      postedAt,
      validThrough,
      employmentType,
      company,
      companyWebsite,
      companyLogo,
      role,
      industry,
      workHours,
      experienceRequired,
      location,
      city,
      state,
      country,
      remote,
      hybrid,
      stipend,
      stipendCurrency,
      salaryMin,
      salaryMax,
      salaryPeriod,
      applyLink,
      applyMethod,
      education,
      skills,
      eligibility,
      numberOfOpenings,
      canonicalUrl,
      startDate,
      endDate,
      deadline
    }
  } = item;

  const jobLocation = remote
    ? {
        "@type": "VirtualLocation",
        url: SITE_META.url
      }
    : {
        "@type": "Place",
        name: location,
        address: {
          "@type": "PostalAddress",
          addressLocality: city,
          addressRegion: state,
          addressCountry: country
        }
      };

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    datePosted: postedAt,
    validThrough,
    employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: company,
      sameAs: companyWebsite,
      logo: toAbsoluteUrl(companyLogo)
    },
    jobLocation,
    jobLocationType: remote ? "TELECOMMUTE" : undefined,
    applicantLocationRequirements: remote
      ? [
          {
            "@type": "Country",
            name: country
          }
        ]
      : undefined,
    directApply: applyMethod === "external" || applyMethod === "form",
    occupationalCategory: industry,
    estimatedSalary: {
      "@type": "MonetaryAmount",
      currency: stipendCurrency,
      value: {
        "@type": "QuantitativeValue",
        minValue: salaryMin,
        maxValue: salaryMax,
        unitText: salaryPeriod
      }
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: stipendCurrency,
      value: {
        "@type": "QuantitativeValue",
        minValue: salaryMin,
        maxValue: salaryMax,
        unitText: salaryPeriod
      }
    },
    incentives: stipend,
    workHours,
    experienceRequirements: experienceRequired,
    qualifications: eligibility,
    educationRequirements: education,
    skills,
    totalJobOpenings: numberOfOpenings,
    jobBenefits: hybrid ? ["Hybrid work flexibility"] : undefined,
    applicationStartDate: postedAt,
    applicationDeadline: deadline,
    url: canonicalUrl,
    identifier: {
      "@type": "PropertyValue",
      name: company,
      value: role
    },
    jobStartDate: startDate,
    jobEndDate: endDate,
    employmentApplication: applyLink
  };
};

export const buildJsonLdPayload = (item: JobContentItem) => {
  const schemas = [
    buildJobPostingSchema(item),
    buildArticleSchema(item),
    buildBreadcrumbSchema(item),
    buildOrganizationSchema()
  ].map((schema) => JSON.parse(JSON.stringify(schema, (_key, value) => value ?? undefined)));

  return JSON.stringify(schemas.length === 1 ? schemas[0] : schemas, null, 2);
};
