import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { frontmatterSchema, type JobCategory, type JobContentItem } from "@lib/content-types";

const CONTENT_DIR = path.join(process.cwd(), "content");

const CATEGORY_FOLDER: Record<JobCategory, string> = {
  internship: "internships",
  job: "jobs",
  research: "research"
};

type RawContent = {
  category: JobCategory;
  filePath: string;
  content: JobContentItem;
};

const readFileSafe = (filePath: string) => fs.readFileSync(filePath, "utf8");

const walkDirectory = (dirPath: string): string[] => {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      return walkDirectory(entryPath);
    }
    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      return [entryPath];
    }
    return [];
  });
};

const computeReadingTime = (body: string) => {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
};

const normalizeFrontmatter = (data: unknown) => {
  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(`Invalid frontmatter: ${JSON.stringify(parsed.error.issues)}`);
  }
  return parsed.data;
};

const readContentFile = (category: JobCategory, filePath: string): RawContent => {
  const raw = readFileSafe(filePath);
  const { content, data } = matter(raw);
  const frontmatter = normalizeFrontmatter(data);
  const readingTimeMinutes = computeReadingTime(content);

  return {
    category,
    filePath,
    content: {
      frontmatter,
      body: content.trim(),
      slug: frontmatter.slug,
      readingTimeMinutes
    }
  };
};

const loadAllContent = (): RawContent[] => {
  const categories = Object.entries(CATEGORY_FOLDER) as Array<[JobCategory, string]>;
  return categories.flatMap(([category, folder]) => {
    const directory = path.join(CONTENT_DIR, folder);
    if (!fs.existsSync(directory)) {
      return [];
    }
    const files = walkDirectory(directory);
    return files.map((filePath) => readContentFile(category, filePath));
  });
};

const cachedContent = cache(() => {
  const records = loadAllContent();
  const deduped = new Map<string, RawContent>();

  for (const record of records) {
    if (deduped.has(record.content.slug)) {
      throw new Error(`Duplicate slug detected: ${record.content.slug}`);
    }
    deduped.set(record.content.slug, record);
  }

  return {
    items: Array.from(deduped.values()).map((entry) => entry.content),
    byCategory: records.reduce<Record<JobCategory, JobContentItem[]>>(
      (acc, record) => {
        acc[record.category] = acc[record.category] ?? [];
        acc[record.category].push(record.content);
        return acc;
      },
      {
        internship: [],
        job: [],
        research: []
      }
    )
  };
});

export const getAllContent = cache(() => {
  const { items } = cachedContent();
  return items.sort((a, b) => {
    const dateA = new Date(a.frontmatter.postedAt).getTime();
    const dateB = new Date(b.frontmatter.postedAt).getTime();
    return dateB - dateA;
  });
});

export const getContentByCategory = cache((category: JobCategory) => {
  const { byCategory } = cachedContent();
  return [...byCategory[category]].sort((a, b) => {
    const dateA = new Date(a.frontmatter.postedAt).getTime();
    const dateB = new Date(b.frontmatter.postedAt).getTime();
    return dateB - dateA;
  });
});

export const getContentBySlug = cache((slug: string) => {
  const all = getAllContent();
  return all.find((item) => item.frontmatter.slug === slug) ?? null;
});

export const getRelatedContent = (
  item: JobContentItem,
  limit = 3
): JobContentItem[] => {
  const all = getContentByCategory(item.frontmatter.type);
  return all
    .filter((entry) => entry.frontmatter.slug !== item.frontmatter.slug)
    .sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      if (a.frontmatter.city === item.frontmatter.city) scoreA += 2;
      if (a.frontmatter.industry === item.frontmatter.industry) scoreA += 2;
      if (a.frontmatter.remote === item.frontmatter.remote) scoreA += 1;

      if (b.frontmatter.city === item.frontmatter.city) scoreB += 2;
      if (b.frontmatter.industry === item.frontmatter.industry) scoreB += 2;
      if (b.frontmatter.remote === item.frontmatter.remote) scoreB += 1;

      return scoreB - scoreA;
    })
    .slice(0, limit);
};

export const getAllSlugs = cache(() => getAllContent().map((item) => item.frontmatter.slug));

export const getCategoryCounts = cache(() => {
  const { byCategory } = cachedContent();
  return Object.entries(byCategory).reduce<Record<JobCategory, number>>(
    (acc, [category, items]) => {
      acc[category as JobCategory] = items.length;
      return acc;
    },
    {
      internship: 0,
      job: 0,
      research: 0
    }
  );
});
