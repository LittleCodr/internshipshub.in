import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact InternshipsHub",
  description: "Reach the InternshipsHub editorial and partnerships teams."
};

export default function ContactPage() {
  return (
    <article className="prose prose-slate max-w-3xl">
      <h1>Contact</h1>
      <p>
        We publish new internships, jobs, and research roles daily. If you are a hiring manager, university lab, or student collective with a verified opportunity, send us the details.
      </p>
      <h2>Editorial desk</h2>
      <p>
        Email <a href="mailto:editor@internshipshub.in">editor@internshipshub.in</a> with role information, application links, and stipend ranges. We respond within 24 hours on weekdays.
      </p>
      <h2>Partnerships</h2>
      <p>
        For strategic partnerships, experiential learning cohorts, or distribution requests, write to <a href="mailto:partners@internshipshub.in">partners@internshipshub.in</a>.
      </p>
      <h2>Feedback</h2>
      <p>
        Spot an outdated listing? Flag it at <a href="mailto:ops@internshipshub.in">ops@internshipshub.in</a>. We remove stale roles immediately.
      </p>
    </article>
  );
}
