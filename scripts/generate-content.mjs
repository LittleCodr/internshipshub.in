import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const OUTPUT_FILE = path.join(process.cwd(), "generated", "content-index.json");

const categories = [
  { key: "internship", dir: "internships" },
  { key: "job", dir: "jobs" },
  { key: "research", dir: "research" }
];

const serialize = async () => {
  const index = {};

  for (const category of categories) {
    const directory = path.join(CONTENT_ROOT, category.dir);
    const files = await fs.readdir(directory);
    const entries = [];

    for (const filename of files) {
      if (!filename.endsWith(".mdx")) {
        continue;
      }

      const absolute = path.join(directory, filename);
      const source = await fs.readFile(absolute, "utf8");
      const { data, content } = matter(source);

      if (!data?.slug) {
        throw new Error(`Missing slug in frontmatter for ${absolute}`);
      }

      const expectedSlug = filename.replace(/\.mdx$/, "");
      if (data.slug !== expectedSlug) {
        throw new Error(
          `Slug mismatch in ${absolute}. Expected ${expectedSlug} but received ${data.slug}`
        );
      }

      entries.push({ frontmatter: data, body: content });
    }

    index[category.key] = entries;
  }

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(index, null, 2));
};

serialize().catch((error) => {
  console.error("Failed to generate content index:", error);
  process.exit(1);
});
