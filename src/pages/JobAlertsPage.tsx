import { FormEvent, useMemo, useState } from "react";
import { Helmet } from "@lib/helmet";
import AuthGate from "../components/AuthGate";
import { useToast } from "../contexts/ToastContext";
import { useUserData } from "../contexts/UserDataContext";

const JobAlertsPage = () => {
  const { jobAlerts, addJobAlert, updateJobAlert, deleteJobAlert, loading } = useUserData();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    keywords: "",
    location: "",
    type: "internship" as "internship" | "job" | "research",
    remoteOnly: false,
    frequency: "weekly" as "daily" | "weekly"
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<typeof form | null>(null);

  const sortedAlerts = useMemo(
    () => [...jobAlerts].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)),
    [jobAlerts]
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.keywords.trim() || !form.location.trim()) {
      showToast("Keywords and location are required", { type: "error" });
      return;
    }
    const res = addJobAlert(form);
    if (!res.ok) {
      showToast(res.error, { type: "error" });
      return;
    }
    showToast("Alert created", { type: "success" });
    setForm({ keywords: "", location: "", type: form.type, remoteOnly: false, frequency: form.frequency });
  };

  const startEdit = (id: string) => {
    const existing = jobAlerts.find((alert) => alert.id === id);
    if (!existing) return;
    setEditingId(id);
    setEditDraft({
      keywords: existing.keywords,
      location: existing.location,
      type: existing.type,
      remoteOnly: existing.remoteOnly,
      frequency: existing.frequency
    });
  };

  const saveEdit = () => {
    if (!editingId || !editDraft) return;
    if (!editDraft.keywords.trim() || !editDraft.location.trim()) {
      showToast("Keywords and location are required", { type: "error" });
      return;
    }
    const res = updateJobAlert(editingId, editDraft);
    if (!res.ok) {
      showToast(res.error, { type: "error" });
      return;
    }
    showToast("Alert updated", { type: "success" });
    setEditingId(null);
    setEditDraft(null);
  };

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm("Delete this alert?");
    if (!confirmDelete) return;
    const res = deleteJobAlert(id);
    if (!res.ok) {
      showToast(res.error, { type: "error" });
      return;
    }
    showToast("Alert removed", { type: "info" });
  };

  return (
    <AuthGate title="Job alerts" description="Create saved searches for roles you care about.">
      <section className="mx-auto max-w-5xl px-4 py-12">
        <Helmet>
          <title>Job alerts | internshipshub.in</title>
        </Helmet>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700">Stay updated</p>
            <h1 className="text-3xl font-bold text-slate-900">Job alerts</h1>
            <p className="text-sm text-slate-600">Store alert rules. No emails are sent automatically.</p>
          </div>
          <div className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-800">{jobAlerts.length} active</div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              <span className="font-semibold">Keywords *</span>
              <input
                required
                value={form.keywords}
                onChange={(e) => setForm((prev) => ({ ...prev, keywords: e.target.value }))}
                placeholder="e.g. frontend internship"
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              <span className="font-semibold">Location *</span>
              <input
                required
                value={form.location}
                onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="City or remote"
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              <span className="font-semibold">Type *</span>
              <select
                value={form.type}
                onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value as typeof form.type }))}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              >
                <option value="internship">Internship</option>
                <option value="job">Job</option>
                <option value="research">Research</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              <span className="font-semibold">Frequency *</span>
              <select
                value={form.frequency}
                onChange={(e) => setForm((prev) => ({ ...prev, frequency: e.target.value as typeof form.frequency }))}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={form.remoteOnly}
                onChange={(e) => setForm((prev) => ({ ...prev, remoteOnly: e.target.checked }))}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              Remote only
            </label>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-600">Alerts are stored locally to your account. No emails are sent.</p>
            <button
              type="submit"
              className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              Create alert
            </button>
          </div>
        </form>

        <h2 className="mt-8 text-xl font-semibold text-slate-900">Saved alerts</h2>
        {loading && <p className="mt-3 text-sm text-slate-600">Loading alerts…</p>}
        {!loading && sortedAlerts.length === 0 && (
          <div className="mt-3 rounded-2xl border border-slate-200 bg-white/80 p-6 text-sm text-slate-700">No alerts yet. Add your first above.</div>
        )}

        <div className="mt-4 space-y-3">
          {sortedAlerts.map((alert) => (
            <div key={alert.id} className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
              {editingId === alert.id && editDraft ? (
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  <input
                    value={editDraft.keywords}
                    onChange={(e) => setEditDraft((prev) => (prev ? { ...prev, keywords: e.target.value } : prev))}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                  <input
                    value={editDraft.location}
                    onChange={(e) => setEditDraft((prev) => (prev ? { ...prev, location: e.target.value } : prev))}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                  <select
                    value={editDraft.type}
                    onChange={(e) => setEditDraft((prev) => (prev ? { ...prev, type: e.target.value as typeof form.type } : prev))}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="internship">Internship</option>
                    <option value="job">Job</option>
                    <option value="research">Research</option>
                  </select>
                  <select
                    value={editDraft.frequency}
                    onChange={(e) => setEditDraft((prev) => (prev ? { ...prev, frequency: e.target.value as typeof form.frequency } : prev))}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={editDraft.remoteOnly}
                      onChange={(e) => setEditDraft((prev) => (prev ? { ...prev, remoteOnly: e.target.checked } : prev))}
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    Remote only
                  </label>
                  <div className="flex flex-wrap gap-2 text-sm font-semibold md:col-span-3">
                    <button
                      type="button"
                      className="rounded-full bg-emerald-600 px-4 py-2 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"
                      onClick={saveEdit}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-800 transition hover:bg-slate-50"
                      onClick={() => {
                        setEditingId(null);
                        setEditDraft(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{alert.keywords}</p>
                    <p className="text-xs text-slate-600">{alert.location} · {alert.type} · {alert.remoteOnly ? "Remote only" : "On-site/Hybrid"}</p>
                    <p className="text-xs text-slate-600">{alert.frequency === "daily" ? "Daily" : "Weekly"} check-ins (stored only)</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                    <button
                      type="button"
                      className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-emerald-800 transition hover:bg-emerald-50"
                      onClick={() => startEdit(alert.id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-rose-200 bg-white px-3 py-1 text-rose-700 transition hover:bg-rose-50"
                      onClick={() => handleDelete(alert.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </AuthGate>
  );
};

export default JobAlertsPage;
