import { promises as fs } from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "content", "internships");
const skip = new Set([
  "iit-bombay-summer-internship-2026.mdx",
  "iit-delhi-summer-internship-2026.mdx",
  "iit-madras-summer-internship-2026.mdx",
  "isro-nrsc-remote-sensing-internship.mdx"
]);

const replacements = [
  [/\u2013/g, "-"],
  [/\u2014/g, "-"],
  [/\u2018/g, "'"],
  [/\u2019/g, "'"],
  [/\u201c/g, '"'],
  [/\u201d/g, '"']
];

async function run() {
  const files = await fs.readdir(dir);
  for (const file of files) {
    if (!file.endsWith(".mdx") || skip.has(file)) continue;
    const full = path.join(dir, file);
    const raw = await fs.readFile(full, "utf8");
    let next = raw;
    for (const [pattern, value] of replacements) {
      next = next.replace(pattern, value);
    }
    if (next !== raw) {
      await fs.writeFile(full, next, "utf8");
    }
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
