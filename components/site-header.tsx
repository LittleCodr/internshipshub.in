import Link from "next/link";
import type { Route } from "next";

const NAV_ITEMS = [
  { href: "/internships", label: "Internships" },
  { href: "/jobs", label: "Jobs" },
  { href: "/research-internships", label: "Research" },
  { href: "/remote-internships", label: "Remote" }
];

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-xl font-semibold tracking-tight text-slate-900">
          InternshipsHub
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href as Route} className="hover:text-primary-600">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
