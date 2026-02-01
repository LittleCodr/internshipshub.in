import { Helmet } from "@lib/helmet";

const ContactPage = () => {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <Helmet>
        <title>Contact internshipshub.in</title>
        <meta name="description" content="Reach internshipshub.in for partnerships, submissions, or support." />
      </Helmet>
      <h1 className="text-3xl font-bold text-slate-900">Contact</h1>
      <p className="mt-4 text-sm text-slate-600">
        For partnerships, media enquiries, or to submit an opportunity, email us at contact@internshipshub.in. We respond within
        two business days.
      </p>
    </section>
  );
};

export default ContactPage;
