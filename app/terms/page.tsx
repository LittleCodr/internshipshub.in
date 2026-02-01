import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing access and use of InternshipsHub."
};

export default function TermsPage() {
  return (
    <article className="prose prose-slate max-w-3xl">
      <h1>Terms of Service</h1>
      <p>Effective from 1 February 2026.</p>
      <h2>Acceptance</h2>
      <p>
        By accessing InternshipsHub you agree to these terms. If you disagree, please discontinue use immediately.
      </p>
      <h2>Use of listings</h2>
      <p>
        Listings are provided for informational purposes. We strive for accuracy but cannot guarantee offers or hiring timelines. Do not scrape or republish listings without written permission.
      </p>
      <h2>Accounts and newsletters</h2>
      <p>
        When you subscribe to alerts you are responsible for safeguarding your email inbox. You may unsubscribe at any time. We reserve the right to suspend access for abuse.
      </p>
      <h2>Intellectual property</h2>
      <p>
        All original content, branding, and compilation data belong to InternshipsHub Media Network LLP.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        We are not liable for indirect, incidental, or consequential damages arising from your use of the site or reliance on listings.
      </p>
      <h2>Changes</h2>
      <p>
        We may update these terms and will post the effective date above. Continued use constitutes acceptance.
      </p>
      <h2>Contact</h2>
      <p>
        For clarifications email <a href="mailto:legal@internshipshub.in">legal@internshipshub.in</a>.
      </p>
    </article>
  );
}
