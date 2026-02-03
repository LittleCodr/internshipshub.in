import { Helmet } from "@lib/helmet";

const ContactPage = () => {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <Helmet>
        <title>Contact internshipshub.in</title>
        <meta
          name="description"
          content="Contact Internshipshub for opportunity submissions, corrections, or partnerships."
        />
      </Helmet>
      <h1 className="text-3xl font-bold text-slate-900">Contact</h1>
      <div className="mt-4 space-y-3 text-sm text-slate-700">
        <p>For submissions, corrections, takedowns, or partnerships, reach us:</p>
        <ul className="space-y-1">
          <li>Email: <a className="font-semibold text-brand-accent" href="mailto:hello@internshipshub.in">hello@internshipshub.in</a></li>
          <li>Phone/WhatsApp: <a className="font-semibold text-brand-accent" href="tel:+919917191829">+91 99171 91829</a></li>
        </ul>
        <p>
          No physical mail is accepted; we operate digitally. We typically respond within two business days. Do not share
          sensitive personal information—only the details needed to process your request.
        </p>
      </div>
    </section>
  );
};

export default ContactPage;
