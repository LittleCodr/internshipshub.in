import { Helmet } from "@lib/helmet";

const PrivacyPolicyPage = () => {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <Helmet>
        <title>Privacy Policy | internshipshub.in</title>
        <meta name="robots" content="index,follow" />
      </Helmet>
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      <div className="mt-4 space-y-4 text-sm text-slate-700">
        <p>
          We collect only the data needed to run this site: basic server logs, anonymised analytics, and optional contact form or
          newsletter submissions. We do not sell personal data.
        </p>
        <p>
          Cookies/Tracking: We may use essential cookies for site functionality and analytics cookies to improve content. If ads
          are served, third-party vendors may use cookies to deliver and measure ads; you can manage permissions via your browser
          settings.
        </p>
        <p>
          User submissions (e.g., opportunity tips or contact queries) are used only to process the request. Do not share
          sensitive information. We do not request payment details.
        </p>
        <p>
          Data retention: Contact submissions are retained only as long as necessary to respond. Analytics data is aggregated.
          You may request deletion of contact submissions by emailing us.
        </p>
        <p>
          Contact: <a className="font-semibold text-brand-accent" href="mailto:hello@internshipshub.in">hello@internshipshub.in</a> ·
          Phone: <a className="font-semibold text-brand-accent" href="tel:+919917191829">+91 99171 91829</a>
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
