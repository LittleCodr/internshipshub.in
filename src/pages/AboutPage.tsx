import { Helmet } from "@lib/helmet";

const AboutPage = () => {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <Helmet>
        <title>About internshipshub.in</title>
        <meta
          name="description"
          content="Learn how Internshipshub curates internships and research roles with transparent, student-first standards compliant with Google AdSense policies."
        />
      </Helmet>
      <h1 className="text-3xl font-bold text-slate-900">About internshipshub.in</h1>
      <div className="mt-4 space-y-4 text-sm text-slate-700">
        <p>
          Internshipshub.in is a student-first directory of internships and research programs across India. We manually curate
          official opportunities, annotate deadlines, and ship schema-rich pages so students can verify eligibility, stipends,
          and application steps quickly.
        </p>
        <p>
          We follow Google AdSense-friendly standards: clear navigation, original content, no misleading claims, and transparent
          disclaimers when data is Expected/Indicative. Listings are sourced from official portals; we do not sell placements or
          promise outcomes.
        </p>
        <p>
          Contact: <a className="font-semibold text-brand-accent" href="mailto:tacaz956@gmail.com">tacaz956@gmail.com</a> ·
          Phone: <a className="font-semibold text-brand-accent" href="tel:+919917191829">+91 99171 91829</a>
        </p>
      </div>
    </section>
  );
};

export default AboutPage;
