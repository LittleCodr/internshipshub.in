import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Helmet } from "@lib/helmet";
import AuthGate from "../components/AuthGate";
import { useToast } from "../contexts/ToastContext";
import { useUserData } from "../contexts/UserDataContext";

const ProfilePage = () => {
  const { profile, updateProfile, updateResume, removeResume, profileCompletion, loading } = useUserData();
  const { showToast } = useToast();

  const [form, setForm] = useState(profile);
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    setForm(profile);
  }, [profile]);

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    if (form.skills.some((skill) => skill.toLowerCase() === trimmed.toLowerCase())) {
      showToast("Skill already added", { type: "info" });
      return;
    }
    setForm((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setForm((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.fullName.trim() || !form.city.trim() || !form.state.trim() || !form.country.trim()) {
      showToast("Please fill required profile fields", { type: "error" });
      return;
    }
    if (!form.educationLevel.trim() || !form.fieldOfStudy.trim() || !form.graduationYear.trim()) {
      showToast("Add education details", { type: "error" });
      return;
    }
    if (form.skills.length === 0) {
      showToast("Add at least one skill", { type: "error" });
      return;
    }
    const res = updateProfile(form);
    if (!res.ok) {
      showToast(res.error, { type: "error" });
      return;
    }
    showToast("Profile updated", { type: "success" });
  };

  const handleResumeUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      showToast("Upload a PDF resume", { type: "error" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast("Max file size is 5MB", { type: "error" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result?.toString() ?? "";
      const res = updateResume(file.name, dataUrl);
      if (!res.ok) {
        showToast(res.error, { type: "error" });
        return;
      }
      showToast("Resume saved", { type: "success" });
    };
    reader.onerror = () => showToast("Could not read file", { type: "error" });
    reader.readAsDataURL(file);
  };

  return (
    <AuthGate title="Your profile" description="Keep your details up to date for faster applications.">
      <section className="mx-auto max-w-5xl px-4 py-12">
        <Helmet>
          <title>Profile | internshipshub.in</title>
        </Helmet>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700">Profile</p>
            <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
            <p className="text-sm text-slate-600">Add your contact, education, skills, and resume.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-800">
            <span>Completion</span>
            <span>{profileCompletion}%</span>
          </div>
        </div>

        {loading && <p className="mt-6 text-sm text-slate-600">Loading profile…</p>}

        {!loading && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-6 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm text-slate-700">
                <span className="font-semibold">Full name *</span>
                <input
                  required
                  value={form.fullName}
                  onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-slate-700">
                <span className="font-semibold">Phone (optional)</span>
                <input
                  value={form.phone ?? ""}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="flex flex-col gap-1 text-sm text-slate-700">
                <span className="font-semibold">City *</span>
                <input
                  required
                  value={form.city}
                  onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-slate-700">
                <span className="font-semibold">State *</span>
                <input
                  required
                  value={form.state}
                  onChange={(e) => setForm((prev) => ({ ...prev, state: e.target.value }))}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-slate-700">
                <span className="font-semibold">Country *</span>
                <input
                  required
                  value={form.country}
                  onChange={(e) => setForm((prev) => ({ ...prev, country: e.target.value }))}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="flex flex-col gap-1 text-sm text-slate-700">
                <span className="font-semibold">Education level *</span>
                <input
                  required
                  value={form.educationLevel}
                  onChange={(e) => setForm((prev) => ({ ...prev, educationLevel: e.target.value }))}
                  placeholder="e.g. B.Tech"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-slate-700">
                <span className="font-semibold">Field of study *</span>
                <input
                  required
                  value={form.fieldOfStudy}
                  onChange={(e) => setForm((prev) => ({ ...prev, fieldOfStudy: e.target.value }))}
                  placeholder="e.g. Computer Science"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-slate-700">
                <span className="font-semibold">Graduation year *</span>
                <input
                  required
                  value={form.graduationYear}
                  onChange={(e) => setForm((prev) => ({ ...prev, graduationYear: e.target.value }))}
                  placeholder="e.g. 2026"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </label>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-900">Skills *</p>
              <div className="flex flex-wrap gap-2">
                {form.skills.map((skill) => (
                  <span key={skill} className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800">
                    {skill}
                    <button type="button" aria-label={`Remove ${skill}`} onClick={() => removeSkill(skill)} className="text-emerald-700">×</button>
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  placeholder="Add a skill and press Enter"
                  className="flex-1 min-w-[200px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"
                >
                  Add skill
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-900">Resume (PDF) *</p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-700">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeUpload}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
                {profile.resumeFileName && (
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-semibold text-emerald-800">
                    {profile.resumeFileName}
                  </span>
                )}
                {profile.resumeFileName && (
                  <button
                    type="button"
                    onClick={() => {
                      const res = removeResume();
                      if (!res.ok) {
                        showToast(res.error, { type: "error" });
                        return;
                      }
                      showToast("Resume removed", { type: "info" });
                    }}
                    className="rounded-full border border-rose-200 bg-white px-3 py-1 text-[12px] font-semibold text-rose-700 transition hover:bg-rose-50"
                  >
                    Remove
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-600">Uploads stay in your account only. No automatic sharing.</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-600">Fields marked * are required for a complete profile.</p>
              <button
                type="submit"
                className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"
              >
                Save profile
              </button>
            </div>
          </form>
        )}
      </section>
    </AuthGate>
  );
};

export default ProfilePage;
