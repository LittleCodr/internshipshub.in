import { FormEvent, useMemo, useState } from "react";
import { Helmet } from "@lib/helmet";
import AuthGate from "../components/AuthGate";
import { useToast } from "../contexts/ToastContext";
import { useUserData } from "../contexts/UserDataContext";

const STATUS_OPTIONS = ["Applied", "Interview", "Offer", "Rejected"] as const;
type Status = (typeof STATUS_OPTIONS)[number];

const statusOrder: Record<Status, number> = {
  Applied: 1,
  Interview: 2,
  Offer: 3,
  Rejected: 4
};

const ApplicationTrackerPage = () => {
  const { applications, addApplication, updateApplication, deleteApplication, loading } = useUserData();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    companyName: "",
    role: "",
    status: "Applied" as Status,
    appliedDate: new Date().toISOString().slice(0, 10),
    notes: ""
  });

  const [sortBy, setSortBy] = useState<"date_desc" | "date_asc" | "status">("date_desc");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<typeof form | null>(null);

  const sortedApplications = useMemo(() => {
    const next = [...applications];
    if (sortBy === "status") {
      return next.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    }
    return next.sort((a, b) => {
      const aDate = new Date(a.appliedDate).valueOf();
      const bDate = new Date(b.appliedDate).valueOf();
      return sortBy === "date_desc" ? bDate - aDate : aDate - bDate;
    });
  }, [applications, sortBy]);

  const resetForm = () =>
    setForm({ companyName: "", role: "", status: "Applied", appliedDate: new Date().toISOString().slice(0, 10), notes: "" });

  const handleAdd = (event: FormEvent) => {
    event.preventDefault();
    if (!form.companyName.trim() || !form.role.trim() || !form.appliedDate) {
      showToast("Company, role, and applied date are required", { type: "error" });
      return;
    }

    const res = addApplication({ ...form, relatedSlug: undefined, relatedType: undefined });
    if (!res.ok) {
      showToast(res.error, { type: "error" });
      return;
    }
    showToast("Application added", { type: "success" });
    resetForm();
  };

  const startEdit = (id: string) => {
    const existing = applications.find((app) => app.id === id);
    if (!existing) return;
    setEditingId(id);
    setEditDraft({
      companyName: existing.companyName,
      role: existing.role,
      status: existing.status,
      appliedDate: existing.appliedDate,
      notes: existing.notes ?? ""
    });
  };

  const handleUpdate = () => {
    if (!editingId || !editDraft) return;
    if (!editDraft.companyName.trim() || !editDraft.role.trim() || !editDraft.appliedDate) {
      showToast("Company, role, and applied date are required", { type: "error" });
      return;
    }
    const res = updateApplication(editingId, editDraft);
    if (!res.ok) {
      showToast(res.error, { type: "error" });
      return;
    }
    showToast("Application updated", { type: "success" });
    setEditingId(null);
    setEditDraft(null);
  };

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm("Delete this application?");
    if (!confirmDelete) return;
    const res = deleteApplication(id);
    if (!res.ok) {
      showToast(res.error, { type: "error" });
      return;
    }
    showToast("Application removed", { type: "info" });
  };

  return (
    <AuthGate title="Applications" description="Manually track every application with statuses and notes.">
      <section className="mx-auto max-w-5xl px-4 py-12">
        <Helmet>
          <title>Applications | internshipshub.in</title>
        </Helmet>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700">Stay organized</p>
            <h1 className="text-3xl font-bold text-slate-900">Applications</h1>
            <p className="text-sm text-slate-600">Add, edit, and track every application in one place.</p>
          </div>
          <div className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-800">
            {applications.length} total
          </div>
        </div>

        <form onSubmit={handleAdd} className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              <span className="font-semibold">Company name *</span>
              <input
                required
                value={form.companyName}
                onChange={(e) => setForm((prev) => ({ ...prev, companyName: e.target.value }))}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              <span className="font-semibold">Role *</span>
              <input
                required
                value={form.role}
                onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              <span className="font-semibold">Status *</span>
              <select
                value={form.status}
                onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as Status }))}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              <span className="font-semibold">Applied date *</span>
              <input
                type="date"
                required
                value={form.appliedDate}
                onChange={(e) => setForm((prev) => ({ ...prev, appliedDate: e.target.value }))}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              <span className="font-semibold">Notes</span>
              <input
                value={form.notes}
                onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Next steps, recruiter name, etc."
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </label>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-600">Required fields are marked with *.</p>
            <button
              type="submit"
              className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              Add application
            </button>
          </div>
        </form>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-900">Tracked applications</h2>
          <div className="flex items-center gap-2 text-sm">
            <label className="text-slate-700">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            >
              <option value="date_desc">Recent first</option>
              <option value="date_asc">Oldest first</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        {loading && <p className="mt-4 text-sm text-slate-600">Loading applications…</p>}

        {!loading && sortedApplications.length === 0 && (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white/80 p-6 text-sm text-slate-700">No applications yet. Add your first above.</div>
        )}

        <div className="mt-6 space-y-4">
          {sortedApplications.map((app) => (
            <div key={app.id} className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
              {editingId === app.id && editDraft ? (
                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      value={editDraft.companyName}
                      onChange={(e) => setEditDraft((prev) => (prev ? { ...prev, companyName: e.target.value } : prev))}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    />
                    <input
                      value={editDraft.role}
                      onChange={(e) => setEditDraft((prev) => (prev ? { ...prev, role: e.target.value } : prev))}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <select
                      value={editDraft.status}
                      onChange={(e) => setEditDraft((prev) => (prev ? { ...prev, status: e.target.value as Status } : prev))}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={editDraft.appliedDate}
                      onChange={(e) => setEditDraft((prev) => (prev ? { ...prev, appliedDate: e.target.value } : prev))}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    />
                    <input
                      value={editDraft.notes}
                      onChange={(e) => setEditDraft((prev) => (prev ? { ...prev, notes: e.target.value } : prev))}
                      placeholder="Notes"
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm font-semibold">
                    <button
                      type="button"
                      className="rounded-full bg-emerald-600 px-4 py-2 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"
                      onClick={handleUpdate}
                    >
                      Save changes
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
                    <p className="text-sm font-semibold text-slate-900">{app.role}</p>
                    <p className="text-xs text-slate-600">{app.companyName}</p>
                    {app.notes && <p className="text-xs text-slate-700">{app.notes}</p>}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-800">{app.status}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">Applied {new Date(app.appliedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <div className="inline-flex gap-2 text-xs">
                      <button
                        type="button"
                        className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-emerald-800 transition hover:bg-emerald-50"
                        onClick={() => startEdit(app.id)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-rose-200 bg-white px-3 py-1 text-rose-700 transition hover:bg-rose-50"
                        onClick={() => handleDelete(app.id)}
                      >
                        Delete
                      </button>
                    </div>
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

export default ApplicationTrackerPage;
