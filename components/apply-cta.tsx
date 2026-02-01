export function ApplyCta({ applyLink }: { applyLink: string }) {
  return (
    <div className="sticky top-20 rounded-xl border border-primary/40 bg-primary/5 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Ready to apply?</h2>
      <p className="mt-2 text-sm text-slate-600">
        Submit your application directly on the organization&apos;s portal. Keep your resume and
        supporting documents handy.
      </p>
      <a
        href={applyLink}
        target="_blank"
        rel="noopener"
        className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
      >
        Apply Now
      </a>
    </div>
  );
}
