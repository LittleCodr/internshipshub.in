import { Helmet } from "@lib/helmet";
import { Link } from "react-router-dom";
import AuthGate from "../components/AuthGate";
import OpportunityCard from "../components/OpportunityCard";
import { useToast } from "../contexts/ToastContext";
import { useUserData } from "../contexts/UserDataContext";
import { getContentByCategory } from "../lib/content";

const SavedPage = () => {
  const { savedJobs, removeJob, loading } = useUserData();
  const { showToast } = useToast();

  const resolved = savedJobs.map((saved) => {
    const collection = getContentByCategory(saved.type);
    const match = collection.find((entry) => entry.slug === saved.slug);
    return { saved, entry: match ?? null };
  });

  return (
    <AuthGate title="Your saved jobs" description="Keep all bookmarked roles together.">
      <section className="mx-auto max-w-6xl px-4 py-12">
        <Helmet>
          <title>Saved jobs | internshipshub.in</title>
        </Helmet>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700">Your list</p>
            <h1 className="text-3xl font-bold text-slate-900">Saved jobs</h1>
            <p className="text-sm text-slate-600">Internships, jobs, and research you’ve shortlisted.</p>
          </div>
          <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-800">{savedJobs.length} saved</span>
        </div>

        {loading && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-700">Loading your saved list…</div>
        )}

        {!loading && savedJobs.length === 0 && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-6 text-sm text-slate-700">
            Nothing saved yet. Tap the heart on any opportunity to keep it here.
          </div>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resolved.map(({ saved, entry }) => (
            <div key={`${saved.type}-${saved.slug}`} className="relative">
              {entry ? (
                <OpportunityCard entry={entry} />
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">{saved.title}</p>
                  <p className="text-xs text-slate-700">{saved.company}</p>
                  <p className="text-xs text-emerald-700">Link may be unavailable</p>
                </div>
              )}
              <div className="absolute right-3 top-3 flex gap-2">
                <Link
                  to={saved.type === "internship" ? `/internships/${saved.slug}` : saved.type === "job" ? `/jobs/${saved.slug}` : `/research/${saved.slug}`}
                  className="rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-emerald-700 shadow-sm transition hover:-translate-y-0.5"
                >
                  Open
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    const res = removeJob(saved.slug, saved.type);
                    if (!res.ok) {
                      showToast(res.error, { type: "error" });
                      return;
                    }
                    showToast("Removed from saved", { type: "info" });
                  }}
                  className="rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-rose-600 shadow-sm transition hover:-translate-y-0.5"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AuthGate>
  );
};

export default SavedPage;
