import contentIndex from "../../generated/content-index.json";
import type { ContentEntry, ContentFrontmatter, OpportunityType } from "../types/content";

interface ContentIndexRecord {
  slug: string;
  category: OpportunityType;
  frontmatter: ContentFrontmatter;
  filePath: string;
}

type ContentModule = {
  default: ContentEntry["component"];
};

const mdxModules = import.meta.glob<ContentModule>("@content/**/*.mdx", { eager: true });

const moduleEntries = Object.entries(mdxModules).map(([key, mod]) => [key.replace(/\\/g, "/"), mod] as const);

const entries: ContentEntry[] = (contentIndex as ContentIndexRecord[]).map((record) => {
  const matched = moduleEntries.find(([key]) => key.endsWith(record.filePath));

  if (!matched) {
    throw new Error(`Unable to locate MDX module for ${record.filePath}`);
  }

  const [, module] = matched;

  return {
    frontmatter: record.frontmatter,
    slug: record.slug,
    category: record.category,
    component: module.default
  };
});

function sortEntries(list: ContentEntry[]): ContentEntry[] {
  return [...list].sort((a, b) => (a.frontmatter.publishedAt < b.frontmatter.publishedAt ? 1 : -1));
}

export function getAllContent(): ContentEntry[] {
  return sortEntries(entries);
}

export function getContentByCategory(type: OpportunityType): ContentEntry[] {
  return sortEntries(entries.filter((entry) => entry.category === type));
}

export function getContentBySlug(type: OpportunityType, slug: string): ContentEntry | undefined {
  return entries.find((entry) => entry.category === type && entry.slug === slug);
}

export function getRemoteInternships(): ContentEntry[] {
  return sortEntries(entries.filter((entry) => entry.category === "internship" && entry.frontmatter.remote));
}
