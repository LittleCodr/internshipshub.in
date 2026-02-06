import { Helmet } from "@lib/helmet";
import OpportunityCard from "../components/OpportunityCard";
import { useWishlist } from "../contexts/WishlistContext";
import { getContentByCategory } from "../lib/content";

const SavedPage = () => {
  const { items, remove } = useWishlist();

  const resolved = items
    .map((saved) => {
      const collection = getContentByCategory(saved.type);
      const match = collection.find((entry) => entry.slug === saved.slug);
      return match ?? null;
    })
    .filter(Boolean);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <Helmet>
        <title>Saved opportunities | internshipshub.in</title>
      </Helmet>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700">Your list</p>
          <h1 className="text-3xl font-bold text-slate-900">Saved opportunities</h1>
          <p className="text-sm text-slate-600">Internships, jobs, and research you’ve shortlisted.</p>
        </div>
        <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-800">{items.length} saved</span>
      </div>

      {items.length === 0 && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-6 text-sm text-slate-700">
          Nothing saved yet. Tap the heart on any opportunity to keep it here.
        </div>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resolved.map((entry) => (
          <div key={`${entry.category}-${entry.slug}`} className="relative">
            <OpportunityCard entry={entry} />
            <button
              type="button"
              onClick={() => remove(entry.slug, entry.category)}
              className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-rose-600 shadow-sm transition hover:-translate-y-0.5"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SavedPage;
