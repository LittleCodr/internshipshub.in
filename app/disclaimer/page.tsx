import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Editorial disclaimer for InternshipsHub."
};

export default function DisclaimerPage() {
  return (
    <article className="prose prose-slate max-w-3xl">
      <h1>Disclaimer</h1>
      <p>
        Listings on InternshipsHub are compiled from public company career pages, verified referrals, and direct submissions. While we validate deadlines, stipend ranges, and application methods, final hiring decisions rest with the employer.
      </p>
      <p>
        We do not collect placement fees, guarantee interviews, or act as a recruitment agency. Always apply via the official links surfaced in each listing.
      </p>
      <p>
        If you find inaccuracies please notify <a href="mailto:editor@internshipshub.in">editor@internshipshub.in</a>. We update or remove listings within one business day.
      </p>
    </article>
  );
}
