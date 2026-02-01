import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import {
  jobFrontmatterSchema,
  type ContentCategory,
  type JobFrontmatter,
  type JobWithContent
} from "@/lib/types";
import { mdxComponents } from "@/components/mdx-components";
import rawContentIndex from "@/generated/content-index.json";

type RawEntry = {
  frontmatter: unknown;
  body: string;
};

type RawContentIndex = Record<ContentCategory, RawEntry[]>;

const rawIndex = rawContentIndex as RawContentIndex;

const parsedIndex: Record<ContentCategory, Array<{ frontmatter: JobFrontmatter; body: string }>> = {
  internship: rawIndex.internship.map((entry) => ({
    frontmatter: jobFrontmatterSchema.parse(entry.frontmatter),
    body: entry.body
  })),
  job: rawIndex.job.map((entry) => ({
    frontmatter: jobFrontmatterSchema.parse(entry.frontmatter),
    body: entry.body
  })),
  research: rawIndex.research.map((entry) => ({
    frontmatter: jobFrontmatterSchema.parse(entry.frontmatter),
    body: entry.body
  }))
};

const getCategoryEntries = (category: ContentCategory) => parsedIndex[category];

const compileJobBody = async (body: string) =>
  compileMDX<{ frontmatter: JobFrontmatter }>({
    source: body,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm as any],
        rehypePlugins: [rehypeSlug as any, rehypeAutolinkHeadings as any]
      }
    },
    components: mdxComponents
  });

export const getAllJobs = cache(async (): Promise<JobFrontmatter[]> => {
  const combined = [
    ...getCategoryEntries("internship"),
    ...getCategoryEntries("job"),
    ...getCategoryEntries("research")
  ].map((entry) => entry.frontmatter);

  return combined.sort(
    (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  );
});

export const getJobsByCategory = cache(async (category: ContentCategory) => {
  const entries = getCategoryEntries(category).map((entry) => entry.frontmatter);
  return entries.sort(
    (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  );
});

export const getJobBySlug = cache(async (
  category: ContentCategory,
  slug: string
): Promise<JobWithContent> => {
  const match = getCategoryEntries(category).find((entry) => entry.frontmatter.slug === slug);

  if (!match) {
    throw new Error(`Job with slug ${slug} not found in category ${category}`);
  }

  const { content } = await compileJobBody(match.body);

  return {
    ...match.frontmatter,
    content
  };
});

export const getJobPath = (job: JobFrontmatter) => {
  switch (job.type) {
    case "internship":
      return `/internships/${job.slug}`;
    case "job":
      return `/jobs/${job.slug}`;
    case "research":
      return `/research/${job.slug}`;
    default:
      return `/internships/${job.slug}`;
  }
};

export const getTrendingJobs = cache(async (limit = 6) => {
  const all = await getAllJobs();
  return all.slice(0, limit);
});

export const getRemoteJobs = cache(async () => {
  const all = await getAllJobs();
  return all.filter((job) => job.remote);
});
