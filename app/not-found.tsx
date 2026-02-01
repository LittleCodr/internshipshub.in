export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start gap-4 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">Opportunity not found</h1>
      <p className="text-sm text-slate-600">
        The internship or job you&apos;re trying to access no longer exists or has been moved. Explore
        the latest openings to find a similar opportunity.
      </p>
      <a
        href="/"
        className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
      >
        Browse internships
      </a>
    </div>
  );
}
