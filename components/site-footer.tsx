import Image from "next/image";
import Link from "next/link";

import { SITE_URL, siteConfig } from "@/lib/site";

const footerSections = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" }
    ]
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/disclaimer", label: "Disclaimer" }
    ]
  },
  {
    title: "Popular Lists",
    links: [
      { href: "/internships/software-engineering", label: "Software Engineering" },
      { href: "/internships/data-science", label: "Data Science" },
      { href: "/internships/bangalore", label: "Bengaluru" },
      { href: "/internships/remote-2026", label: "Remote 2026" }
    ]
  }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-[2fr,1fr,1fr,1fr]">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={siteConfig.logoPath}
                alt={`${siteConfig.name} logo`}
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg"
              />
              <span className="text-lg font-semibold text-slate-900">{siteConfig.name}</span>
            </Link>
            <p className="max-w-xl text-sm text-slate-600">
              India&apos;s structured internship and early-career job discovery engine. SEO-first,
              human-trusted.
            </p>
            <p className="text-sm text-slate-500">
              Reach us at <a href={`mailto:${siteConfig.email}`} className="font-medium text-primary">{siteConfig.email}</a>
            </p>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                {section.title}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-slate-200 pt-4 text-xs text-slate-500">
          © {new Date().getFullYear()} {siteConfig.name}. Built for search dominance. {SITE_URL}
        </div>
      </div>
    </footer>
  );
}
