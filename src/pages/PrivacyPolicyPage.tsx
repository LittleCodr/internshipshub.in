import { Helmet } from "@lib/helmet";

const PrivacyPolicyPage = () => {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <Helmet>
        <title>Privacy Policy | internshipshub.in</title>
        <meta name="robots" content="index,follow" />
      </Helmet>
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      <p className="mt-4 text-sm text-slate-600">
        We process only the data required to deliver internship updates, including anonymised analytics and newsletter sign-ups.
        No personal data is sold or shared with third-party advertisers.
      </p>
    </section>
  );
};

export default PrivacyPolicyPage;
