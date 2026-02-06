import { useEffect, useMemo, useState } from "react";
import { Helmet } from "@lib/helmet";
import { useWishlist } from "../contexts/WishlistContext";
import OpportunityCard from "../components/OpportunityCard";
import { getContentByCategory } from "../lib/content";

const STATUS_OPTIONS = ["Saved", "Applied", "Interviewing", "Offer", "Rejected", "On Hold"] as const;

const trackerKeyFor = (slug: string, category: string) => `${category}:${slug}`;

const ApplicationTrackerPage = () => {
  const { items } = useWishlist();
  const [statusMap, setStatusMap] = useState<Record<string, (typeof STATUS_OPTIONS)[number]>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("tracker:statuses");
    if (stored) {
      try {
        setStatusMap(JSON.parse(stored));
      } catch {
        setStatusMap({});
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("tracker:statuses", JSON.stringify(statusMap));
  }, [statusMap]);

  const resolved = useMemo(() => {
    return items
      .map((saved) => {
        const collection = getContentByCategory(saved.type);
        const match = collection.find((entry) => entry.slug === saved.slug);
        if (!match) return null;
        const key = trackerKeyFor(saved.slug, saved.type);
        return { entry: match, key };
      })
      .filter(Boolean) as { entry: ReturnType<typeof getContentByCategory>[number]; key: string }[];
  }, [items]);

  const buckets = useMemo(() => {
    const grouped: Record<string, typeof resolved> = {};
    STATUS_OPTIONS.forEach((status) => {
      grouped[status] = [];
    });
    resolved.forEach((item) => {
      const status = statusMap[item.key] ?? "Saved";
      grouped[status] = grouped[status] || [];
      grouped[status].push(item);
    });
    return grouped;
  }, [resolved, statusMap]);

  const updateStatus = (key: string, status: (typeof STATUS_OPTIONS)[number]) => {
    setStatusMap((prev) => ({ ...prev, [key]: status }));
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <Helmet>
        <title>Application tracker | internshipshub.in</title>
      </Helmet>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700">Stay organized</p>
          <h1 className="text-3xl font-bold text-slate-900">Application tracker</h1>
          <p className="text-sm text-slate-600">Move each saved listing through stages and keep tabs on progress.</p>
        </div>
        <div className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-800">
          {items.length} saved · {resolved.length} trackable
        </div>
      </div>

      {resolved.length === 0 && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-6 text-sm text-slate-700">
          Save an opportunity first, then it will appear here to track.
        </div>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {STATUS_OPTIONS.map((status) => (
          <div key={status} className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">{status}</p>
                <p className="text-sm text-slate-600">{buckets[status]?.length ?? 0} items</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-800">{buckets[status]?.length ?? 0}</span>
            </div>

            <div className="mt-3 space-y-3">
              {(buckets[status] ?? []).map(({ entry, key }) => (
                <div key={key} className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
                  <OpportunityCard entry={entry} />
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px] text-slate-700">
                    <label className="text-xs font-semibold text-emerald-800">Status</label>
                    <div className="inline-flex gap-1 overflow-auto rounded-full bg-white p-1 text-[11px] font-semibold">
                      {STATUS_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => updateStatus(key, opt)}
                          className={`rounded-full px-3 py-1 transition ${
                            statusMap[key] === opt || (!statusMap[key] && opt === "Saved")
                              ? "bg-emerald-600 text-white"
                              : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {((buckets[status] ?? []).length === 0) && (
                <p className="text-sm text-slate-500">No items in this stage.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ApplicationTrackerPage;
