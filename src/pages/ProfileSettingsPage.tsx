import { Helmet } from "@lib/helmet";
import { useAuth } from "../contexts/AuthContext";
import { useProfilePreferences } from "../hooks/useProfilePreferences";

const ProfileSettingsPage = () => {
  const { user, signOut } = useAuth();
  const { alertsEnabled, digestEnabled, themePref, setAlertsEnabled, setDigestEnabled, setThemePref, cycleThemePref } =
    useProfilePreferences();

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <Helmet>
        <title>Profile & preferences | internshipshub.in</title>
      </Helmet>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700">You control this</p>
          <h1 className="text-3xl font-bold text-slate-900">Profile & preferences</h1>
          <p className="text-sm text-slate-600">Update alerts, digest emails, and display settings.</p>
        </div>
        {user && <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-800">{user.email}</span>}
      </div>

      <div className="mt-8 space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Job alerts</p>
              <p className="text-xs text-slate-600">Get pinged when similar roles drop.</p>
            </div>
            <button
              type="button"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                alertsEnabled ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-800"
              }`}
              onClick={() => setAlertsEnabled(!alertsEnabled)}
              aria-pressed={alertsEnabled}
            >
              {alertsEnabled ? "Enabled" : "Off"}
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Weekly digest</p>
              <p className="text-xs text-slate-600">One email on Fridays with the best picks.</p>
            </div>
            <button
              type="button"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                digestEnabled ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-800"
              }`}
              onClick={() => setDigestEnabled(!digestEnabled)}
              aria-pressed={digestEnabled}
            >
              {digestEnabled ? "Enabled" : "Muted"}
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Theme</p>
              <p className="text-xs text-slate-600">Switch between light, dark, or follow system.</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
              <button
                type="button"
                className={`rounded-full border px-3 py-2 transition ${themePref === "light" ? "border-emerald-300 bg-emerald-50" : "border-slate-200"}`}
                onClick={() => setThemePref("light")}
              >
                Light
              </button>
              <button
                type="button"
                className={`rounded-full border px-3 py-2 transition ${themePref === "dark" ? "border-emerald-300 bg-emerald-50" : "border-slate-200"}`}
                onClick={() => setThemePref("dark")}
              >
                Dark
              </button>
              <button
                type="button"
                className={`rounded-full border px-3 py-2 transition ${themePref === "system" ? "border-emerald-300 bg-emerald-50" : "border-slate-200"}`}
                onClick={() => setThemePref("system")}
              >
                System
              </button>
              <button
                type="button"
                className="rounded-full border border-emerald-200 bg-white px-3 py-2 text-emerald-800 transition hover:bg-emerald-50"
                onClick={cycleThemePref}
              >
                Cycle
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-slate-900">Account</p>
            <p className="text-xs text-slate-600">Sign out from this device or re-login to refresh sessions.</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
                onClick={() => window.location.assign("/auth")}
              >
                Manage login
              </button>
              <button
                type="button"
                className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ProfileSettingsPage;
