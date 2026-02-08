import { Helmet } from "@lib/helmet";
import AuthGate from "../components/AuthGate";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { useUserData } from "../contexts/UserDataContext";

const ProfileSettingsPage = () => {
  const { signOut } = useAuth();
  const { showToast } = useToast();
  const { settings, updateSettings, clearUserData, loading } = useUserData();

  const toggleSetting = (key: keyof typeof settings) => {
    const res = updateSettings({ [key]: !settings[key] });
    if (!res.ok) {
      showToast(res.error, { type: "error" });
    }
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm("Delete your account data on this device? This clears saved jobs, applications, and alerts.");
    if (!confirmed) return;
    clearUserData();
    signOut();
    showToast("Account data cleared", { type: "info" });
  };

  return (
    <AuthGate title="Settings" description="Control notifications, visibility, and account data.">
      <section className="mx-auto max-w-4xl px-4 py-12">
        <Helmet>
          <title>Settings | internshipshub.in</title>
        </Helmet>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700">Preferences</p>
            <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
            <p className="text-sm text-slate-600">Notifications, visibility, and account controls.</p>
          </div>
        </div>

        {loading && <p className="mt-6 text-sm text-slate-600">Loading settings…</p>}

        {!loading && (
          <div className="mt-8 space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Email notifications</p>
                  <p className="text-xs text-slate-600">Show reminders inside the app. No automated emails.</p>
                </div>
                <button
                  type="button"
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${settings.emailNotifications ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-800"}`}
                  onClick={() => toggleSetting("emailNotifications")}
                  aria-pressed={settings.emailNotifications}
                >
                  {settings.emailNotifications ? "On" : "Off"}
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Weekly digest</p>
                  <p className="text-xs text-slate-600">Toggle the weekly summary inside your account.</p>
                </div>
                <button
                  type="button"
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${settings.weeklyDigest ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-800"}`}
                  onClick={() => toggleSetting("weeklyDigest")}
                  aria-pressed={settings.weeklyDigest}
                >
                  {settings.weeklyDigest ? "On" : "Off"}
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Profile visibility</p>
                  <p className="text-xs text-slate-600">Control whether your profile is marked visible in-app.</p>
                </div>
                <button
                  type="button"
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${settings.profileVisibility ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-800"}`}
                  onClick={() => toggleSetting("profileVisibility")}
                  aria-pressed={settings.profileVisibility}
                >
                  {settings.profileVisibility ? "Visible" : "Hidden"}
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-rose-200 bg-rose-50/70 p-6 shadow-sm">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-rose-800">Delete account data</p>
                <p className="text-xs text-rose-700">Removes saved jobs, applications, alerts, and profile data from this device. Sign out included.</p>
                <button
                  type="button"
                  className="w-fit rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-rose-700"
                  onClick={handleDeleteAccount}
                >
                  Delete account data
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-slate-900">Sign out</p>
                <p className="text-xs text-slate-600">End the session on this device.</p>
                <button
                  type="button"
                  className="w-fit rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </div>
            </section>
          </div>
        )}
      </section>
    </AuthGate>
  );
};

export default ProfileSettingsPage;
