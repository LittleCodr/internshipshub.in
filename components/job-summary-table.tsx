import { formatCurrencyRange, formatDate } from "@lib/utils";
import type { JobContentItem } from "@lib/content-types";

export function JobSummaryTable({ item }: { item: JobContentItem }) {
  const { frontmatter } = item;

  const rows = [
    { label: "Company", value: `${frontmatter.company} (${frontmatter.companyType})` },
    { label: "Role", value: frontmatter.role },
    { label: "Location", value: `${frontmatter.city}, ${frontmatter.state}` },
    { label: "Remote", value: frontmatter.remote ? "Yes" : "No" },
    { label: "Hybrid", value: frontmatter.hybrid ? "Yes" : "No" },
    {
      label: "Compensation",
      value: `${formatCurrencyRange(frontmatter.salaryMin, frontmatter.salaryMax, frontmatter.salaryPeriod)} | ${frontmatter.stipend}`
    },
    { label: "Duration", value: frontmatter.duration },
    {
      label: "Timeline",
      value: `Start ${formatDate(frontmatter.startDate)} · End ${formatDate(frontmatter.endDate)}`
    },
    { label: "Apply by", value: formatDate(frontmatter.deadline) },
    { label: "Experience required", value: frontmatter.experienceRequired },
    { label: "Number of openings", value: frontmatter.numberOfOpenings.toString() }
  ];

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Role Snapshot</h2>
      <dl className="mt-4 grid grid-cols-1 gap-4 text-sm text-slate-600 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-xs uppercase tracking-wide text-slate-400">{row.label}</dt>
            <dd className="mt-1 text-slate-700">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
