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
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <tbody className="divide-y divide-slate-200">
            {summaryItems.map((item) => (
              <tr key={item.key} className="odd:bg-slate-50">
                <th scope="row" className="w-1/3 px-4 py-3 text-left font-semibold text-slate-600">
                  {item.label}
                </th>
                <td className="px-4 py-3 text-slate-700">{formatValue(item.key, data[item.key])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OpportunitySummary;
