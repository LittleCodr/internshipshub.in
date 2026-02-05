import type { ApplyMethod, ContentFrontmatter } from "../types/content";

const methodLabel: Record<ApplyMethod, string> = {
  external: "External portal",
  email: "Email application",
  form: "Embedded form"
};

interface Props {
  data: ContentFrontmatter;
}

const ApplyCta = ({ data }: Props) => {
  return (
    <aside className="glass-card border border-emerald-50/80 bg-gradient-to-br from-emerald-500 to-cyan-500 p-6 text-white shadow-xl shadow-emerald-300/40">
      <h2 className="text-lg font-semibold">Ready to apply?</h2>
      <p className="mt-2 text-sm text-emerald-50">
        Applications close on {new Date(data.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.
      </p>
      <a
        href={data.applyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/95 px-4 py-3 text-sm font-semibold text-emerald-700 shadow-lg transition hover:-translate-y-0.5"
      >
        <span>Apply now</span>
        <span aria-hidden>↗</span>
      </a>
      <dl className="mt-5 grid gap-3 rounded-2xl bg-white/10 p-3 text-xs text-emerald-50 ring-1 ring-white/20">
        <div>
          <dt className="font-semibold text-white">Application method</dt>
          <dd>{methodLabel[data.applyMethod]}</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Application fee</dt>
          <dd>{data.applicationFee}</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Openings</dt>
          <dd>{data.numberOfOpenings}</dd>
        </div>
      </dl>
    </aside>
  );
};

export default ApplyCta;
