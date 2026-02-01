import { Helmet } from "@lib/helmet";

const AboutPage = () => {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <Helmet>
        <title>About internshipshub.in</title>
        <meta
          name="description"
          content="Learn how internshipshub.in curates internships, fresher jobs, and research roles with a static-first SEO stack."
        />
      </Helmet>
      <h1 className="text-3xl font-bold text-slate-900">About internshipshub.in</h1>
      <p className="mt-4 text-sm text-slate-600">
        internshipshub.in is a programmatic SEO platform dedicated to helping Indian students discover meaningful internships,
        jobs, and research fellowships. We combine MDX-based content with React 18, Vite, and an aggressive static generation
        strategy so every page loads instantly and meets Google Jobs schema requirements.
      </p>
    </section>
  );
};

export default AboutPage;
