import { SITE_URL, siteConfig } from "@/lib/site";

const footerLinks = [
  { href: "/internships/software-engineering", label: "Software Engineering" },
  { href: "/internships/data-science", label: "Data Science" },
  { href: "/internships/bangalore", label: "Bengaluru" },
  { href: "/internships/remote-2026", label: "Remote 2026" }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-lg font-semibold text-slate-900">{siteConfig.name}</p>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              India&apos;s structured internship and early-career job discovery engine. SEO-first,
              human-trusted.
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Reach us at <a href={`mailto:${siteConfig.email}`} className="font-medium text-primary">{siteConfig.email}</a>
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Popular Lists
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition hover:text-primary">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-200 pt-4 text-xs text-slate-500">
          © {new Date().getFullYear()} {siteConfig.name}. Built for search dominance. {SITE_URL}
        </div>
      </div>
    </footer>
  );
}
