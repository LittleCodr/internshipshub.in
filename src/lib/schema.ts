import { FALLBACK_LOGO } from "./content";
import type { ContentEntry } from "../types/content";

export function buildOrganizationSchema(entry: ContentEntry) {
  const logo = entry.frontmatter.companyLogo?.trim() ? entry.frontmatter.companyLogo : FALLBACK_LOGO;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: entry.frontmatter.company,
    url: entry.frontmatter.companyWebsite,
    logo,
    sameAs: [entry.frontmatter.companyWebsite]
  };
}

export function buildJobPostingSchema(entry: ContentEntry) {
  const { frontmatter } = entry;
  const employmentType = frontmatter.employmentType.replace('_', '-');
  const logo = frontmatter.companyLogo?.trim() ? frontmatter.companyLogo : FALLBACK_LOGO;

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: frontmatter.title,
    description: frontmatter.description,
    datePosted: frontmatter.postedAt,
    validThrough: frontmatter.validThrough,
    employmentType,
    jobLocationType: frontmatter.remote ? 'TELECOMMUTE' : 'ONSITE',
    hiringOrganization: {
      '@type': 'Organization',
      name: frontmatter.company,
      sameAs: frontmatter.companyWebsite,
      logo
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: frontmatter.location,
        addressLocality: frontmatter.city,
        addressRegion: frontmatter.state,
        addressCountry: frontmatter.country
      }
    },
    applicantLocationRequirements: frontmatter.remote
      ? {
          '@type': 'Country',
          name: 'India'
        }
      : undefined,
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: frontmatter.stipendCurrency,
      value: {
        '@type': 'QuantitativeValue',
        minValue: frontmatter.salaryMin,
        maxValue: frontmatter.salaryMax,
        unitText: frontmatter.salaryPeriod
      }
    },
    directApply: frontmatter.applyMethod === 'form',
    identifier: {
      '@type': 'PropertyValue',
      name: frontmatter.company,
      value: frontmatter.slug
    },
    estimatedSalary: frontmatter.stipend,
    workHours: frontmatter.workHours,
    educationRequirements: frontmatter.education,
    experienceRequirements: frontmatter.experienceRequired,
    skills: frontmatter.skills,
    url: frontmatter.canonicalUrl,
    industry: frontmatter.industry,
    occupationalCategory: frontmatter.role
  };
}

export function buildBreadcrumbSchema(crumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}

export function buildArticleSchema(entry: ContentEntry) {
  const { frontmatter } = entry;
  const logo = frontmatter.companyLogo?.trim() ? frontmatter.companyLogo : FALLBACK_LOGO;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    author: {
      '@type': 'Person',
      name: frontmatter.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'internshipshub.in',
      logo: {
        '@type': 'ImageObject',
        url: logo
      }
    },
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.lastUpdated,
    mainEntityOfPage: frontmatter.canonicalUrl
  };
}import type { ContentEntry } from "../types/content";

export function buildOrganizationSchema(entry: ContentEntry) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    import { FALLBACK_LOGO } from "./content";
    name: entry.frontmatter.company,
    url: entry.frontmatter.companyWebsite,
    logo: entry.frontmatter.companyLogo,
      const logo = entry.frontmatter.companyLogo?.trim() ? entry.frontmatter.companyLogo : FALLBACK_LOGO;
    sameAs: [entry.frontmatter.companyWebsite]
  };
}

export function buildJobPostingSchema(entry: ContentEntry) {
        logo,
  const employmentType = frontmatter.employmentType.replace('_', '-');

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: frontmatter.title,
    description: frontmatter.description,
    datePosted: frontmatter.postedAt,
    validThrough: frontmatter.validThrough,
    employmentType,
    jobLocationType: frontmatter.remote ? 'TELECOMMUTE' : 'ONSITE',
    hiringOrganization: {
      '@type': 'Organization',
      name: frontmatter.company,
      sameAs: frontmatter.companyWebsite,
      logo: frontmatter.companyLogo
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: frontmatter.location,
        addressLocality: frontmatter.city,
        addressRegion: frontmatter.state,
        addressCountry: frontmatter.country
      }
    },
    applicantLocationRequirements: frontmatter.remote
      ? {
          '@type': 'Country',
          name: 'India'
        }
      : undefined,
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: frontmatter.stipendCurrency,
      value: {
        '@type': 'QuantitativeValue',
        minValue: frontmatter.salaryMin,
        maxValue: frontmatter.salaryMax,
        unitText: frontmatter.salaryPeriod
      }
    },
    directApply: frontmatter.applyMethod === 'form',
    identifier: {
      '@type': 'PropertyValue',
      name: frontmatter.company,
      value: frontmatter.slug
    },
    estimatedSalary: frontmatter.stipend,
    workHours: frontmatter.workHours,
    educationRequirements: frontmatter.education,
    experienceRequirements: frontmatter.experienceRequired,
    skills: frontmatter.skills,
    url: frontmatter.canonicalUrl,
    industry: frontmatter.industry,
    occupationalCategory: frontmatter.role
  };
}

export function buildBreadcrumbSchema(crumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}

export function buildArticleSchema(entry: ContentEntry) {
  const { frontmatter } = entry;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    author: {
      const logo = frontmatter.companyLogo?.trim() ? frontmatter.companyLogo : FALLBACK_LOGO;
      '@type': 'Person',
      name: frontmatter.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'internshipshub.in',
      logo: {
        '@type': 'ImageObject',
        url: frontmatter.companyLogo
      }
    },
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.lastUpdated,
    mainEntityOfPage: frontmatter.canonicalUrl
            url: logo
}
