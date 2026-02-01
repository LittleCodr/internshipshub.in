import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.resolve(projectRoot, "dist");

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function prerender() {
  const templatePath = path.join(distDir, "index.html");
  const template = await fs.readFile(templatePath, "utf-8");

  const vite = await createServer({
    root: projectRoot,
    logLevel: "error",
    server: { middlewareMode: true },
    appType: "custom"
  });

  try {
    const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
    const { getAllContent } = await vite.ssrLoadModule("/src/lib/content.ts");
    const { allStaticRoutes, opportunityPath } = await vite.ssrLoadModule("/src/lib/sitemap.ts");
    const entries = getAllContent();

    const staticRoutes = allStaticRoutes();
    const dynamicRoutes = entries.map((entry) => opportunityPath(entry.category, entry.slug));

    const routes = Array.from(new Set([...staticRoutes, ...dynamicRoutes]));

    for (const route of routes) {
      const { html, head } = await render(route);
      const outHtml = template
        .replace("<!--app-head-->", head)
        .replace("<!--app-html-->", html);

      const outputPath = route === "/" ? templatePath : path.join(distDir, route.slice(1), "index.html");
      await ensureDir(outputPath);
      await fs.writeFile(outputPath, outHtml, "utf-8");

      if (route === "/404") {
        const fallbackPath = path.join(distDir, "404.html");
        await fs.writeFile(fallbackPath, outHtml, "utf-8");
      }
    }
  } finally {
    await vite.close();
  }
}

prerender().catch((error) => {
  console.error(error);
  process.exit(1);
});
