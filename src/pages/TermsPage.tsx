import { Helmet } from "@lib/helmet";

const TermsPage = () => {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <Helmet>
        <title>Terms of Use | internshipshub.in</title>
        <meta name="robots" content="index,follow" />
      </Helmet>
      <h1 className="text-3xl font-bold text-slate-900">Terms of Use</h1>
      <div className="mt-4 space-y-4 text-sm text-slate-700">
        <p>
          By accessing internshipshub.in you agree to use listings responsibly and comply with applicable laws. We provide
          informational content only; applications must be submitted on the official provider sites.
        </p>
        <p>
          We do not guarantee selection, stipend amounts, or availability. Details may change; always verify on the official
          portal before applying or making financial commitments.
        </p>
        <p>
          You may not scrape, republish, or misrepresent our content. External links belong to their respective owners. Ads or
          affiliate placements, if any, will be disclosed and will not alter editorial independence.
        </p>
        <p>
          Contact: <a className="font-semibold text-brand-accent" href="mailto:hello@internshipshub.in">hello@internshipshub.in</a> ·
          Phone: <a className="font-semibold text-brand-accent" href="tel:+919917191829">+91 99171 91829</a>
        </p>
      </div>
    </section>
  );
};

export default TermsPage;
