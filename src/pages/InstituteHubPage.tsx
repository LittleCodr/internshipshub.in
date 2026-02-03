import { Helmet } from "@lib/helmet";
import OpportunityCard from "../components/OpportunityCard";
import { getContentByCategory } from "../lib/content";

interface Props {
  instituteType: "IIT" | "NIT" | "IIIT";
}

const titles: Record<Props["instituteType"], string> = {
  IIT: "IIT Internships 2026",
  NIT: "NIT Internships 2026",
  IIIT: "IIIT Internships 2026"
};

const descriptions: Record<Props["instituteType"], string> = {
  IIT: "Curated IIT summer internship guides and research opportunities with expected timelines, selection processes, and funding clarity.",
  NIT: "NIT summer internship playbooks with domains, eligibility, and application tips across campuses.",
  IIIT: "IIIT summer internship coverage with domains, eligibility, and faculty outreach steps for 2026."
};

const slugs: Record<Props["instituteType"], string> = {
  IIT: "iit-internships",
  NIT: "nit-internships",
  IIIT: "iiit-internships"
};

const InstituteHubPage = ({ instituteType }: Props) => {
  const items = getContentByCategory("internship").filter((entry) => entry.frontmatter.instituteType === instituteType);
  const title = titles[instituteType];
  const description = descriptions[instituteType];
  const canonical = `https://internshipshub.in/internships/${slugs[instituteType]}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Helmet>
        <title>{title} | internshipshub.in</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <header className="mb-8 space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Summer Internship 2026</p>
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
        <p className="text-slate-600">{description}</p>
      </header>
      {items.length === 0 ? (
        <p className="text-slate-600">Guides are being added. Check back soon for detailed institute playbooks.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((entry) => (
            <OpportunityCard key={entry.slug} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InstituteHubPage;
