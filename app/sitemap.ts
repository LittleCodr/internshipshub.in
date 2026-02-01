import type { MetadataRoute } from "next";

import { getAllJobs } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

const staticRoutes = [
  "/",
  "/internships",
  "/jobs",
  "/research-internships",
  "/remote-internships"
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const jobs = await getAllJobs();

  const jobEntries = jobs.map((job) => ({
    url: job.canonicalUrl,
    lastModified: job.lastUpdated,
    priority: job.priority,
    changeFrequency: "daily" as const
  }));

  const staticEntries = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    priority: 0.8,
    changeFrequency: "daily" as const
  }));

  return [...staticEntries, ...jobEntries];
}
