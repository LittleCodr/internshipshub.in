import type { ContentFrontmatter } from "../types/content";

interface Props {
  data: ContentFrontmatter;
}

const EligibilityList = ({ data }: Props) => {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Eligibility & Skills</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
        <li>{data.eligibility}</li>
        <li>Education: {data.education}</li>
        <li>Branches allowed: {data.branchesAllowed.join(", ")}</li>
        <li>Skills: {data.skills.join(", ")}</li>
        <li>Year of study: {data.yearOfStudy}</li>
        <li>Age limit: {data.ageLimit}</li>
      </ul>
    </section>
  );
};

export default EligibilityList;
