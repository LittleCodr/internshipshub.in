import { ExternalLink } from "lucide-react";
import type { JobContentItem } from "@lib/content-types";

export function ApplyCard({ item }: { item: JobContentItem }) {
  const { frontmatter } = item;
  return (
    <aside className="rounded-xl border border-primary-100 bg-primary-50/70 p-6 shadow-sm">
      <h3 className="text-base font-semibold text-primary-700">Ready to apply?</h3>
      <p className="mt-2 text-sm text-primary-700/90">
        Applications close on {new Date(frontmatter.deadline).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric"
        })}.
      </p>
      <a
        href={frontmatter.applyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary-700"
      >
        Apply on {frontmatter.applyMethod === "external" ? "Company Site" : "Email"}
        <ExternalLink size={16} aria-hidden />
      </a>
      <p className="mt-4 text-xs text-primary-700/80">
        Source: {frontmatter.source} · Last updated {new Date(frontmatter.lastUpdated).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric"
        })}
      </p>
    </aside>
  );
}
