# Internshipshub.in

SEO-first job discovery engine for internships, jobs, and research roles across India. Built on Next.js 14 (App Router), TypeScript, Tailwind CSS, and MDX content mapped to Google JobPosting schema.

## Tech Stack

- Next.js 14 with App Router and Server Components
- TypeScript (strict) and ESLint/Prettier tooling
- Tailwind CSS with typography plugin
- MDX content sourced from local filesystem
- Programmatic SEO utilities for metadata, JSON-LD, sitemaps, and robots.txt

## Getting Started

```bash
npm install
npm run dev
```

## Content Model

- Store MDX entries under `content/internships`, `content/jobs`, and `content/research`
- Frontmatter fields align 1:1 with JobPosting schema requirements
- Use `npm run dev` to preview pages and structured data outputs

## Deployment

- Optimized for Vercel static generation
- Dynamic sitemap and robots exposed via `/sitemap.xml` and `/robots.txt`