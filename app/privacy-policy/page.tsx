import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for InternshipsHub visitors and subscribers."
};

export default function PrivacyPolicyPage() {
  return (
    <article className="prose prose-slate max-w-3xl">
      <h1>Privacy Policy</h1>
      <p>Last updated on 1 February 2026.</p>
      <p>
        InternshipsHub respects your privacy. We collect minimal analytics using first-party, cookie-free tracking to understand which listings perform. We do not sell, rent, or lease your personal information.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>Anonymous visit analytics to measure page performance.</li>
        <li>Email addresses when you opt-in for weekly internship alerts.</li>
        <li>Contact messages you send via email for editorial or partnerships.</li>
      </ul>
      <h2>How we use data</h2>
      <ul>
        <li>To send internship digests and product updates you explicitly requested.</li>
        <li>To improve listing quality and identify companies with strong applicant conversion.</li>
        <li>To respond to support or partnership queries.</li>
      </ul>
      <h2>Data retention</h2>
      <p>
        We store email preferences until you unsubscribe. Editorial correspondence is retained for compliance for up to twelve months.
      </p>
      <h2>Your rights</h2>
      <p>
        You can request deletion of your contact data by emailing <a href="mailto:privacy@internshipshub.in">privacy@internshipshub.in</a>.
      </p>
      <h2>Contact</h2>
      <p>
        For privacy questions, write to <a href="mailto:privacy@internshipshub.in">privacy@internshipshub.in</a>.
      </p>
    </article>
  );
}
