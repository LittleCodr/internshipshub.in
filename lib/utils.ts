import { type JobContentItem } from "@lib/content-types";

const INR_FORMATTER = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

const DATE_FORMATTER = new Intl.DateTimeFormat("en-IN", {
  year: "numeric",
  month: "short",
  day: "numeric"
});

export const formatCurrencyRange = (
  min: number,
  max: number,
  period: "MONTH" | "YEAR"
) => {
  const minFormatted = INR_FORMATTER.format(min);
  const maxFormatted = INR_FORMATTER.format(max);
  const periodLabel = period === "MONTH" ? "month" : "year";
  return `${minFormatted} – ${maxFormatted} / ${periodLabel}`;
};

export const formatDate = (date: string) => DATE_FORMATTER.format(new Date(date));

export const toBreadcrumbSegments = (item: JobContentItem) => [
  {
    name: "Home",
    href: "/"
  },
  {
    name: item.frontmatter.type === "job" ? "Jobs" : item.frontmatter.type === "research" ? "Research" : "Internships",
    href:
      item.frontmatter.type === "job"
        ? "/jobs"
        : item.frontmatter.type === "research"
        ? "/research-internships"
        : "/internships"
  },
  {
    name: item.frontmatter.title,
    href: `/${item.frontmatter.type === "job" ? "jobs" : item.frontmatter.type === "research" ? "research" : "internships"}/${item.frontmatter.slug}`
  }
];
