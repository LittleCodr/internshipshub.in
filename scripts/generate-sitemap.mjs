import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.resolve(projectRoot, "dist");

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
      priority: entry.frontmatter.priority,
      lastmod: entry.frontmatter.lastUpdated
    }));

    const filteredStatic = staticRouteEntries.filter((route) => route.loc !== "/404");
    const urls = [...filteredStatic, ...dynamicRoutes];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      urls
        .map((route) => {
          const loc = `${baseUrl}${route.loc}`;
          const lastmod = route.lastmod ?? new Date().toISOString().split("T")[0];
          const priority = route.priority.toFixed(1);
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
