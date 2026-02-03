import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const contentDir = path.join(projectRoot, "content");
const outputFile = path.join(projectRoot, "generated", "content-index.json");

async function walk(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        return walk(res);
      }
      return res;
    })
  );
  return files.flat();
}

async function buildIndex() {
  const files = (await walk(contentDir)).filter((filePath) => {
    const normalized = filePath.replace(/\\/g, "/");
    if (normalized.includes("/templates/")) return false;
    return normalized.endsWith(".mdx");
  });

  const records = await Promise.all(
    files.map(async (filePath) => {
      const raw = await fs.readFile(filePath, "utf8");
      const { data } = matter(raw);
      const relativePath = path.relative(contentDir, filePath).replace(/\\/g, "/");

      if (!data.slug) {
        throw new Error(`Missing slug in frontmatter for ${relativePath}`);
      }

      if (!data.type) {
        throw new Error(`Missing type in frontmatter for ${relativePath}`);
      }

      return {
        slug: data.slug,
        category: data.type,
        frontmatter: data,
        filePath: relativePath
      };
    })
  );

  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(outputFile, JSON.stringify(records, null, 2), "utf8");
}

buildIndex().catch((error) => {
  console.error(error);
  process.exit(1);
});
