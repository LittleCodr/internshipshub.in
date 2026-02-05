import type { ContentFrontmatter } from "../types/content";

interface Props {
  data: ContentFrontmatter;
}

const EligibilityList = ({ data }: Props) => {
  return (
    <section className="glass-card border border-emerald-50/70 p-6 shadow-lg shadow-emerald-100/50">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-emerald-700">Fit check</p>
          <h2 className="text-xl font-semibold text-slate-900">Eligibility & Skills</h2>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-800">Check before applying</span>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-50 bg-white/80 px-4 py-3 shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700">Eligibility</p>
          <p className="mt-1 text-sm text-slate-800">{data.eligibility}</p>
        </div>
        <div className="rounded-2xl border border-emerald-50 bg-white/80 px-4 py-3 shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700">Education</p>
          <p className="mt-1 text-sm text-slate-800">{data.education}</p>
        </div>
        <div className="rounded-2xl border border-emerald-50 bg-white/80 px-4 py-3 shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700">Branches</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-800">
            {data.branchesAllowed.map((branch) => (
              <span key={branch} className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-800">
                {branch}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-50 bg-white/80 px-4 py-3 shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700">Skills</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-800">
            {data.skills.map((skill) => (
              <span key={skill} className="rounded-full bg-amber-50 px-3 py-1 font-semibold text-amber-800">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-50 bg-white/80 px-4 py-3 shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700">Year of study</p>
          <p className="mt-1 text-sm text-slate-800">{data.yearOfStudy}</p>
        </div>
        <div className="rounded-2xl border border-emerald-50 bg-white/80 px-4 py-3 shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700">Age limit</p>
          <p className="mt-1 text-sm text-slate-800">{data.ageLimit}</p>
        </div>
      </div>
    </section>
  );
};

export default EligibilityList;
