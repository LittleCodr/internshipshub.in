import type { Metadata } from "next";

import { SITE_URL, siteConfig } from "@/lib/site";
import type { JobFrontmatter } from "@/lib/types";
import { getCanonicalUrl } from "@/lib/utils";

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${siteConfig.name} | Internships & Jobs in India`,
    template: "%s | InternshipsHub.in"
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Internships & Jobs in India`,
    description: siteConfig.description
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Internships & Jobs in India`,
    description: siteConfig.description
  }
};

export const buildListingMetadata = (
  {
    title,
    description,
    path,
    keywords
  }: {
    title: string;
    description: string;
    path: string;
    keywords?: string[];
  }
): Metadata => ({
  title,
  description,
  keywords,
  alternates: {
    canonical: getCanonicalUrl(path, SITE_URL)
  },
  openGraph: {
    title,
    description,
    url: getCanonicalUrl(path, SITE_URL)
  },
  twitter: {
    title,
    description
  }
});

export const buildJobMetadata = (job: JobFrontmatter): Metadata => {
  return {
    title: job.title,
    description: job.description,
    keywords: job.keywords,
    alternates: {
      canonical: job.canonicalUrl
    },
    openGraph: {
      type: "article",
      title: job.title,
      description: job.description,
      url: job.canonicalUrl,
      publishedTime: job.publishedAt,
      modifiedTime: job.lastUpdated
    },
    twitter: {
      card: "summary_large_image",
      title: job.title,
      description: job.description
    }
  };
};
