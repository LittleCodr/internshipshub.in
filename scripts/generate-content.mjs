import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const root = process.cwd();
const contentDir = path.join(root, "content");
const outputFile = path.join(root, "generated", "content-index.json");

const companyTypeEnum = z.enum(["startup", "mnc", "government", "university", "ngo"]);
const jobCategoryEnum = z.enum(["internship", "job", "research"]);
const employmentTypeEnum = z.enum(["INTERN", "FULL_TIME", "PART_TIME", "CONTRACT"]);
const salaryPeriodEnum = z.enum(["MONTH", "YEAR"]);
const applyMethodEnum = z.enum(["external", "email", "form"]);

const frontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  company: z.string().min(1),
  companyLogo: z.string().min(1),
  companyWebsite: z.string().url(),
  companyType: companyTypeEnum,
  type: jobCategoryEnum,
  role: z.string().min(1),
  industry: z.string().min(1),
  employmentType: employmentTypeEnum,
  workHours: z.string().min(1),
  experienceRequired: z.string().min(1),
  location: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.literal("India"),
  remote: z.boolean(),
  hybrid: z.boolean(),
  stipend: z.string().min(1),
  stipendCurrency: z.literal("INR"),
  salaryMin: z.number().nonnegative(),
  salaryMax: z.number().nonnegative(),
  salaryPeriod: salaryPeriodEnum,
  paid: z.boolean(),
  duration: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  deadline: z.string().min(1),
  postedAt: z.string().min(1),
  publishedAt: z.string().min(1),
  validThrough: z.string().min(1),
  eligibility: z.string().min(1),
  education: z.array(z.string().min(1)).nonempty(),
  skills: z.array(z.string().min(1)).nonempty(),
  branchesAllowed: z.array(z.string().min(1)).nonempty(),
  yearOfStudy: z.array(z.string().min(1)).nonempty(),
  ageLimit: z.string().min(1),
  applyLink: z.string().url(),
  applyMethod: applyMethodEnum,
  applicationFee: z.number().min(0),
  numberOfOpenings: z.number().min(1),
  keywords: z.array(z.string().min(1)).nonempty(),
  canonicalUrl: z.string().url(),
  index: z.boolean(),
  priority: z.number().min(0).max(1),
  author: z.string().min(1),
  source: z.string().min(1),
  lastUpdated: z.string().min(1)
});

const listMdxFiles = async (directory) => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return listMdxFiles(entryPath);
      }
      if (entry.isFile() && entry.name.endsWith(".mdx")) {
        return [entryPath];
      }
      return [];
    })
  );
  return files.flat();
};

const computeReadingTime = (body) => {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
};

const toRelativeContent = (filePath) => path.relative(contentDir, filePath).replace(/\\/g, "/");

const buildIndex = async () => {
  const files = await listMdxFiles(contentDir);
  const buckets = {
    internship: [],
    job: [],
    research: []
  };

  for (const file of files) {
    const raw = await fs.readFile(file, "utf8");
    const { data, content } = matter(raw);
    const parsed = frontmatterSchema.safeParse(data);
    if (!parsed.success) {
      console.error(`Invalid frontmatter in ${file}`);
      console.error(parsed.error.format());
      throw new Error(`Frontmatter validation failed for ${file}`);
    }
    const frontmatter = parsed.data;
    const readingTimeMinutes = computeReadingTime(content);
    const entry = {
      frontmatter,
      body: content.trim(),
      slug: frontmatter.slug,
      readingTimeMinutes,
      sourceFile: toRelativeContent(file)
    };
    buckets[frontmatter.type].push(entry);
  }

  const index = Object.fromEntries(
    Object.entries(buckets).map(([key, value]) => [key, value.sort((a, b) => new Date(b.frontmatter.postedAt) - new Date(a.frontmatter.postedAt))])
  );

  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(outputFile, JSON.stringify(index, null, 2));
  console.log(`Generated content index with ${files.length} entries.`);
};

buildIndex().catch((error) => {
  console.error(error);
  process.exit(1);
});
