import { Helmet } from "@lib/helmet";

const TermsPage = () => {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <Helmet>
        <title>Terms of Use | internshipshub.in</title>
        <meta name="robots" content="index,follow" />
      </Helmet>
      <h1 className="text-3xl font-bold text-slate-900">Terms of Use</h1>
      <p className="mt-4 text-sm text-slate-600">
        By using internshipshub.in you agree to reference listings responsibly. We verify opportunities but encourage users to
        conduct independent due diligence before applying.
      </p>
    </section>
  );
};

export default TermsPage;
