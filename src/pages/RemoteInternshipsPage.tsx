import { Helmet } from "@lib/helmet";
import OpportunityCard from "../components/OpportunityCard";
import JsonLd from "../components/JsonLd";
import { getRemoteInternships } from "../lib/content";
import { buildBreadcrumbSchema } from "../lib/schema";
import { canonicalHref, robotsContent } from "../lib/seo";

const RemoteInternshipsPage = () => {
  const remoteInternships = getRemoteInternships();
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
        <header className="max-w-3xl">
          <h1 className="text-3xl font-bold text-slate-900">Remote-first internships</h1>
          <p className="mt-4 text-sm text-slate-600">
            Every role is vetted for remote eligibility, stipend transparency, and India-based hiring scope.
          </p>
        </header>
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
