import { formatCurrency, formatDate } from "@/lib/utils";
import type { JobFrontmatter } from "@/lib/types";

const summaryFields: Array<{ label: string; value: (job: JobFrontmatter) => string }> = [
  { label: "Company", value: (job) => job.company },
  { label: "Role", value: (job) => job.role },
  { label: "Location", value: (job) => job.location },
  { label: "Mode", value: (job) => (job.remote ? "Remote" : job.hybrid ? "Hybrid" : "On-site") },
  { label: "Employment", value: (job) => job.employmentType.replace("_", " ") },
  { label: "Duration", value: (job) => job.duration },
  { label: "Start Date", value: (job) => formatDate(job.startDate) },
  { label: "End Date", value: (job) => formatDate(job.endDate) },
  {
    label: "Compensation",
    value: (job) =>
      `${formatCurrency(job.salaryMin, job.stipendCurrency)} – ${formatCurrency(
        job.salaryMax,
        job.stipendCurrency
      )} / ${job.salaryPeriod.toLowerCase()}`
  },
  { label: "Stipend", value: (job) => job.stipend },
  { label: "Experience", value: (job) => job.experienceRequired },
  { label: "Apply By", value: (job) => formatDate(job.deadline) }
];

export function JobSummaryTable({ job }: { job: JobFrontmatter }) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <tbody>
          {summaryFields.map((field) => (
            <tr key={field.label} className="border-b border-slate-100 last:border-none">
              <th className="w-40 bg-slate-50 px-4 py-3 text-left font-semibold text-slate-600">
                {field.label}
              </th>
              <td className="px-4 py-3 text-slate-700">{field.value(job)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
