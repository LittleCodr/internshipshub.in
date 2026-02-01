import { Helmet } from "@lib/helmet";

const DisclaimerPage = () => {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <Helmet>
        <title>Disclaimer | internshipshub.in</title>
        <meta name="robots" content="index,follow" />
      </Helmet>
      <h1 className="text-3xl font-bold text-slate-900">Disclaimer</h1>
      <p className="mt-4 text-sm text-slate-600">
        internshipshub.in publishes opportunities sourced from official employer channels. Compensation and timelines are subject
        to change; always confirm details through the employer&apos;s official application portal before committing.
      </p>
    </section>
  );
};

export default DisclaimerPage;
