import { Helmet } from "@lib/helmet";

const DisclaimerPage = () => {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <Helmet>
        <title>Disclaimer | internshipshub.in</title>
        <meta name="robots" content="index,follow" />
      </Helmet>
      <h1 className="text-3xl font-bold text-slate-900">Disclaimer</h1>
      <div className="mt-4 space-y-4 text-sm text-slate-700">
        <p>
          internshipshub.in provides informational content on internships and research programs. We do not guarantee selection,
          stipend amounts, or availability. Details are often Expected/Indicative until official notices are published.
        </p>
        <p>
          External links point to third-party sites; we are not responsible for their content, privacy, or security practices.
          Always verify details and use your own judgment before applying or sharing information.
        </p>
        <p>
          Ads or sponsored placements, if present, will be labeled and do not influence editorial decisions.
        </p>
        <p>
          Contact: <a className="font-semibold text-brand-accent" href="mailto:hello@internshipshub.in">hello@internshipshub.in</a> ·
          Phone: <a className="font-semibold text-brand-accent" href="tel:+919917191829">+91 99171 91829</a>
        </p>
      </div>
    </section>
  );
};

export default DisclaimerPage;
