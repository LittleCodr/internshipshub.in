import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.resolve(projectRoot, "dist");

function normalizeLoc(loc, baseUrl) {
  try {
    const url = new URL(loc, baseUrl);
    url.search = "";
    url.hash = "";
    const normalized = url.toString();
    if (url.pathname !== "/" && normalized.endsWith("/")) {
      return normalized.slice(0, -1);
    }
    return normalized;
  } catch (error) {
    console.error("Failed to normalize loc", loc, error);
    return `${baseUrl}/`;
  }
}

function isoDate(value) {
  if (!value) return new Date().toISOString().split("T")[0];
  try {
    return new Date(value).toISOString().split("T")[0];
  } catch {
    return new Date().toISOString().split("T")[0];
  }
}

async function generateSitemap() {
  const vite = await createServer({
    root: projectRoot,
    logLevel: "error",
    server: { middlewareMode: true },
    appType: "custom"
  });

  try {
    const { getAllContent } = await vite.ssrLoadModule("/src/lib/content.ts");
    const { staticRouteEntries, opportunityPath, baseUrl } = await vite.ssrLoadModule("/src/lib/sitemap.ts");
    const entries = getAllContent();

    const dynamicRoutes = entries.map((entry) => ({
      loc: opportunityPath(entry.category, entry.slug),
      priority: entry.frontmatter.priority ?? 0.7,
      lastmod: entry.frontmatter.lastUpdated || entry.frontmatter.publishedAt
    }));

    const canonicalRoutes = entries
      .map((entry) => entry.frontmatter.canonicalUrl)
      .filter(Boolean)
      .map((loc) => ({ loc: new URL(loc).pathname, priority: 0.7, lastmod: null }));

    const filteredStatic = staticRouteEntries.filter((route) => route.loc !== "/404");
    const allRoutes = [...filteredStatic, ...dynamicRoutes, ...canonicalRoutes];

    const seen = new Set();
    const urls = allRoutes.filter((route) => {
      const normalizedLoc = normalizeLoc(route.loc, baseUrl);
      if (seen.has(normalizedLoc)) return false;
      seen.add(normalizedLoc);
      route.loc = normalizedLoc;
      return true;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      urls
        .map((route) => {
          const loc = normalizeLoc(route.loc, baseUrl);
          const lastmod = isoDate(route.lastmod);
          const priority = (route.priority ?? 0.7).toFixed(1);
          return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
        })
        .join("\n") +
      "\n</urlset>\n";

    await fs.writeFile(path.join(distDir, "sitemap.xml"), xml, "utf-8");
  } finally {
    await vite.close();
  }
}

generateSitemap().catch((error) => {
  console.error(error);
  process.exit(1);
});
