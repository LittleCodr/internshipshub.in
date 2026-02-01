import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
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

const CONTENT_ROOT = path.join(process.cwd(), "content");

const categoryDirectoryMap: Record<ContentCategory, string> = {
  internship: "internships",
  job: "jobs",
  research: "research"
};

const fileExtension = ".mdx";

const getDirectoryForCategory = (category: ContentCategory) =>
  path.join(CONTENT_ROOT, categoryDirectoryMap[category]);

const readJobFile = async (absolutePath: string) => {
  const source = await fs.readFile(absolutePath, "utf8");
  const { data, content } = matter(source);
  const parsed = jobFrontmatterSchema.parse(data);
  const expectedSlug = path.basename(absolutePath, fileExtension);
  if (parsed.slug !== expectedSlug) {
    throw new Error(`Slug mismatch for ${absolutePath}. Expected ${expectedSlug} but received ${parsed.slug}`);
  }
  return { frontmatter: parsed, body: content } satisfies {
    frontmatter: JobFrontmatter;
    body: string;
  };
};

const loadJobWithContent = async (
  category: ContentCategory,
  slug: string
): Promise<JobWithContent> => {
  const directory = getDirectoryForCategory(category);
  const filePath = path.join(directory, `${slug}${fileExtension}`);
  const { frontmatter, body } = await readJobFile(filePath);

  const { content } = await compileMDX<{ frontmatter: JobFrontmatter }>({
    source: body,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
      }
    },
    components: mdxComponents
  });

  return {
    ...frontmatter,
    content
  };
};

const readCategoryIndex = async (category: ContentCategory) => {
  const directory = getDirectoryForCategory(category);
  const files = await fs.readdir(directory);
  const mdxFiles = files.filter((file) => file.endsWith(fileExtension));

  const jobs = await Promise.all(
    mdxFiles.map(async (filename) => {
      const { frontmatter } = await readJobFile(path.join(directory, filename));
      return frontmatter;
    })
  );

  return jobs;
};

export const getAllJobs = cache(async (): Promise<JobFrontmatter[]> => {
  const [internships, jobs, research] = await Promise.all([
    readCategoryIndex("internship"),
    readCategoryIndex("job"),
    readCategoryIndex("research")
  ]);

  return [...internships, ...jobs, ...research].sort((a, b) =>
    new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  );
});

export const getJobsByCategory = cache(async (category: ContentCategory) => {
  const all = await readCategoryIndex(category);
  return all.sort(
    (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  );
});

export const getJobBySlug = cache(async (
  category: ContentCategory,
  slug: string
): Promise<JobWithContent> => loadJobWithContent(category, slug));

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
