import { Helmet } from "@lib/helmet";
import { Link } from "react-router-dom";
import AuthGate from "../components/AuthGate";
import { useUserData } from "../contexts/UserDataContext";
import { getContentByCategory } from "../lib/content";
import type { ContentEntry } from "../types/content";

const pathFor = (type: string, slug: string) =>
  type === "internship" ? `/internships/${slug}` : type === "job" ? `/jobs/${slug}` : `/research/${slug}`;

const DashboardPage = () => {
  const {
    savedJobs,
    applications,
    jobAlerts,
    profileCompletion,
    recentSavedJobs,
    recentApplications,
    loading
  } = useUserData();

  const resolvedRecentSaved = recentSavedJobs
    .map((saved) => {
      const collection = getContentByCategory(saved.type);
      const match = collection.find((entry) => entry.slug === saved.slug);
      return match ?? null;
    })
    .filter((entry): entry is ContentEntry => Boolean(entry));

  return (
    <AuthGate title="Personal dashboard" description="Track saved roles, applications, alerts, and profile health.">
    <section className="mx-auto max-w-6xl px-4 py-12">
      <Helmet>
        <title>Dashboard | internshipshub.in</title>
      </Helmet>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700">Welcome back</p>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-600">Snapshot of your saved jobs, applications, alerts, and profile.</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-800">{profileCompletion}% profile</span>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[{
          label: "Saved jobs",
          value: savedJobs.length,
          href: "/saved",
          description: "Bookmarked roles"
        }, {
          label: "Applications",
          value: applications.length,
          href: "/applications",
          description: "Tracked entries"
        }, {
          label: "Job alerts",
          value: jobAlerts.length,
          href: "/alerts",
          description: "Active filters"
        }, {
          label: "Profile health",
          value: `${profileCompletion}%`,
          href: "/profile",
          description: "Completion score"
        }].map((card) => (
          <Link
            key={card.label}
            to={card.href}
            className="rounded-2xl border border-emerald-100 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{card.value}</p>
            <p className="text-sm text-slate-600">{card.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700">Recently saved</p>
              <h2 className="text-xl font-semibold text-slate-900">Saved jobs</h2>
              <p className="text-sm text-slate-600">Latest 5 roles you saved.</p>
            </div>
            <Link to="/saved" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {loading && <p className="text-sm text-slate-600">Loading your saved jobs…</p>}
            {!loading && resolvedRecentSaved.length === 0 && <p className="text-sm text-slate-600">Nothing saved yet.</p>}
            {!loading && resolvedRecentSaved.map((entry) => (
              <Link
                key={`${entry.category}-${entry.slug}`}
                to={pathFor(entry.category, entry.slug)}
                className="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/50 px-3 py-2 text-sm font-semibold text-emerald-900 transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                <span>{entry.frontmatter.title}</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-700">{entry.frontmatter.company}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700">Applications</p>
              <h2 className="text-xl font-semibold text-slate-900">Recently added</h2>
              <p className="text-sm text-slate-600">Last 5 application updates.</p>
            </div>
            <Link to="/applications" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
              Manage
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {loading && <p className="text-sm text-slate-600">Loading applications…</p>}
            {!loading && recentApplications.length === 0 && <p className="text-sm text-slate-600">No applications tracked yet.</p>}
            {!loading && recentApplications.map((app) => (
              <div key={app.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800">
                <div>
                  <p className="font-semibold text-slate-900">{app.role}</p>
                  <p className="text-xs text-slate-600">{app.companyName}</p>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-semibold">
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-800">{app.status}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-700">
                    {new Date(app.appliedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  </AuthGate>
  );
};

export default DashboardPage;
