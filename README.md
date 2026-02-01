# Internshipshub.in

SEO-first internship, job, and research discovery engine for India. Pages are authored in MDX, rendered with React 18 + Vite, and pre-rendered to static HTML with JSON-LD inlined for Google Jobs.

## Tech Stack

- React 18 with React Router v6
- TypeScript (strict mode)
- Vite 5 + custom static prerender pipeline
- Tailwind CSS 3 with typography plugin
- React Helmet Async for canonical + OpenGraph tags
- MDX content sourced from `/content`

## Getting Started

```bash
npm install
npm run dev
```

## Build & Prerender

```bash
npm run build
```

The build step compiles the client bundle, server-renders every static and content-driven route, and emits a sitemap plus robots.txt in `dist/`.

## Content Model

- MDX files live in `content/internships`, `content/jobs`, `content/research`
- Frontmatter must include the full canonical schema documented in `src/types/content.ts`
- JSON-LD (JobPosting, Article, Organization, BreadcrumbList) is emitted during prerender

## Output

- Static HTML per route under `dist/`
- `dist/sitemap.xml` defined via frontmatter priorities
- `public/robots.txt` advertises the sitemap