import { Helmet } from "@lib/helmet";
import OpportunityCard from "../components/OpportunityCard";
import JsonLd from "../components/JsonLd";
import { getRemoteInternships } from "../lib/content";
import { buildBreadcrumbSchema } from "../lib/schema";
import { canonicalHref, robotsContent } from "../lib/seo";

const RemoteInternshipsPage = () => {
  const remoteInternships = getRemoteInternships();
  const totalCount = remoteInternships.length;
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", url: "https://internshipshub.in/" },
    { name: "Remote Internships", url: "https://internshipshub.in/remote-internships" }
  ]);

  return (
    <>
      <Helmet>
        <title>Remote Internships | Internshipshub.in</title>
        <meta
          name="description"
          content="Remote-friendly internships for Indian students with flexible hours, verified stipends, and direct application links."
        />
        <link rel="canonical" href={canonicalHref("https://internshipshub.in/remote-internships")} />
        <meta name="robots" content={robotsContent(true)} />
      </Helmet>
      <JsonLd items={[breadcrumbs]} />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500 p-[1px] shadow-xl shadow-emerald-200/50">
          <header className="flex flex-col gap-6 rounded-[22px] bg-white/95 p-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-emerald-800">
                <span className="pill bg-white/80 ring-emerald-100">Remote</span>
                <span className="pill bg-emerald-50 ring-emerald-100">Anywhere in India</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Remote-first internships</h1>
                <p className="mt-3 text-sm text-slate-600">
                  Every role is vetted for remote eligibility, stipend transparency, and India-based hiring scope.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-slate-700">
                <span className="pill bg-emerald-50 ring-emerald-100">{totalCount} remote internships</span>
                <span className="pill bg-white ring-emerald-100">Flexible hours & timezones</span>
                <span className="pill bg-white ring-emerald-100">Direct apply links</span>
              </div>
            </div>
            <div className="grid w-full max-w-xs gap-3 text-center text-sm font-semibold text-slate-800 md:text-right">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 px-4 py-3 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-emerald-700">Remote-ready</p>
                <p className="mt-1 text-3xl font-bold text-emerald-900">{totalCount}</p>
                <p className="text-xs text-emerald-700">across industries</p>
              </div>
            </div>
          </header>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {remoteInternships.map((entry) => (
            <OpportunityCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </section>
    </>
  );
};

export default RemoteInternshipsPage;
