import type { Metadata } from "next";
import { SITE_META } from "@lib/site";
import { type JobContentItem } from "@lib/content-types";

interface BaseMetaInput {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
}

const buildSharedMeta = ({ title, description, canonical, keywords = [] }: BaseMetaInput): Metadata => ({
  title,
  description,
  keywords,
  alternates: {
    canonical
  },
  openGraph: {
    title,
    description,
    url: canonical,
    siteName: SITE_META.name,
    type: "article"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: SITE_META.twitter
  }
});

export const buildListingMetadata = ({
  title,
  description,
  path,
  keywords
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata =>
  buildSharedMeta({
    title,
    description,
    canonical: `${SITE_META.url}${path}`,
    keywords
  });

export const buildJobMetadata = (item: JobContentItem): Metadata =>
  buildSharedMeta({
    title: `${item.frontmatter.title} | ${SITE_META.name}`,
    description: item.frontmatter.description,
    canonical: item.frontmatter.canonicalUrl,
    keywords: item.frontmatter.keywords
  });

export const DEFAULT_SITE_METADATA: Metadata = {
  metadataBase: new URL(SITE_META.url),
  title: {
    default: `${SITE_META.name} | Internships & Jobs in India`,
    template: `%s | ${SITE_META.name}`
  },
  description: SITE_META.description,
  keywords: ["internships", "jobs", "research internships", "india", "student careers"],
  openGraph: {
    type: "website",
    siteName: SITE_META.name,
    locale: SITE_META.locale,
    url: SITE_META.url,
    title: SITE_META.name,
    description: SITE_META.description
  },
  twitter: {
    card: "summary_large_image",
    site: SITE_META.twitter,
    creator: SITE_META.twitter
  },
  robots: {
    index: true,
    follow: true
  }
};
