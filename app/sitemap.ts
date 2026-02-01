import type { MetadataRoute } from "next";
import { SITE_META } from "@lib/site";
import { getAllContent } from "@lib/content";

const STATIC_ROUTES = [
  "/",
  "/internships",
  "/jobs",
  "/research-internships",
  "/remote-internships",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/disclaimer"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const listings = getAllContent().map((item) => ({
    url: item.frontmatter.canonicalUrl,
    lastModified: item.frontmatter.lastUpdated,
    changeFrequency: "weekly" as const,
    priority: item.frontmatter.priority
  }));

  const staticRoutes = STATIC_ROUTES.map((route) => ({
    url: `${SITE_META.url}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.7
  }));

  return [...staticRoutes, ...listings];
}
