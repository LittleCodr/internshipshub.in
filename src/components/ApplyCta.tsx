import type { ApplyMethod, ContentFrontmatter } from "../types/content";

const methodLabel: Record<ApplyMethod, string> = {
  external: "External portal",
  email: "Email application",
  form: "Embedded form"
};

interface Props {
  data: ContentFrontmatter;
  onApply?: () => void;
}

const ApplyCta = ({ data, onApply }: Props) => {
  return (
    <aside className="rounded-2xl border border-emerald-100 bg-white p-6 text-slate-900 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Ready to apply?</h2>
      <p className="mt-2 text-sm text-slate-600">
        Applications close on {new Date(data.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.
      </p>
      <button
        type="button"
        onClick={onApply}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"
      >
        <span>Apply now</span>
        <span aria-hidden>↗</span>
      </button>
      <dl className="mt-5 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
        <div>
          <dt className="font-semibold text-slate-900">Application method</dt>
          <dd>{methodLabel[data.applyMethod]}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900">Application fee</dt>
          <dd>{data.applicationFee}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900">Openings</dt>
          <dd>{data.numberOfOpenings}</dd>
        </div>
      </dl>
    </aside>
  );
};

export default ApplyCta;
