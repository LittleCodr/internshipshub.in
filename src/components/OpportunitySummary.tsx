import type { ContentFrontmatter } from "../types/content";

interface Props {
  data: ContentFrontmatter;
}

const summaryItems: Array<{ label: string; key: keyof ContentFrontmatter }> = [
  { label: "Company", key: "company" },
  { label: "Role", key: "role" },
  { label: "Location", key: "location" },
  { label: "Duration", key: "duration" },
  { label: "Stipend", key: "stipend" },
  { label: "Work Hours", key: "workHours" },
  { label: "Employment Type", key: "employmentType" },
  { label: "Experience", key: "experienceRequired" }
];

const formatValue = (key: keyof ContentFrontmatter, value: ContentFrontmatter[keyof ContentFrontmatter]) => {
  if (key === "employmentType") {
    const transformed = String(value).toLowerCase().replace("_", " ");
    return transformed.replace(/(^|\s)\w/g, (match) => match.toUpperCase());
  }
  return String(value);
};

const OpportunitySummary = ({ data }: Props) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.1em] text-emerald-700">Snapshot</p>
          <h2 className="text-lg font-semibold text-slate-900">Role overview</h2>
        </div>
        <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-800">Key facts</span>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {summaryItems.map((item) => (
          <div key={item.key} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.1em] text-emerald-700">{item.label}</p>
            <p className="mt-1 text-sm font-medium text-slate-900">{formatValue(item.key, data[item.key])}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OpportunitySummary;
