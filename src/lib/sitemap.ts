import type { ContentEntry } from "../types/content";

export const baseUrl = "https://internshipshub.in";

export const staticRouteEntries: Array<{ loc: string; priority: number }> = [
  { loc: "/", priority: 1 },
  { loc: "/internships", priority: 0.9 },
  { loc: "/jobs", priority: 0.9 },
  { loc: "/research", priority: 0.9 },
  { loc: "/remote-internships", priority: 0.8 },
  { loc: "/about", priority: 0.5 },
  { loc: "/contact", priority: 0.5 },
  { loc: "/privacy-policy", priority: 0.4 },
  { loc: "/terms", priority: 0.4 },
  { loc: "/disclaimer", priority: 0.4 },
  { loc: "/404", priority: 0.1 }
];

export function opportunityPath(category: ContentEntry["category"], slug: string) {
  if (category === "internship") return `/internships/${slug}`;
  if (category === "job") return `/jobs/${slug}`;
  return `/research/${slug}`;
}

export function allStaticRoutes(): string[] {
  return staticRouteEntries.map((route) => route.loc);
}
