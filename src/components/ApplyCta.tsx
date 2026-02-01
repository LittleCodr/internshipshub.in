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
    <aside className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Ready to apply?</h2>
      <p className="mt-2 text-sm text-slate-600">
        Applications close on {new Date(data.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.
      </p>
      <a
        href={data.applyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center rounded bg-brand-accent px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
      >
        Apply now
      </a>
      <dl className="mt-4 grid gap-2 text-xs text-slate-500">
        <div>
          <dt className="font-medium text-slate-600">Application method</dt>
          <dd>{methodLabel[data.applyMethod]}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-600">Application fee</dt>
          <dd>{data.applicationFee}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-600">Openings</dt>
          <dd>{data.numberOfOpenings}</dd>
        </div>
      </dl>
    </aside>
  );
};

export default ApplyCta;
