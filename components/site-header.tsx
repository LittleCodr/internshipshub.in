import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/internships", label: "Internships" },
  { href: "/jobs", label: "Jobs" },
  { href: "/research-internships", label: "Research" },
  { href: "/remote-internships", label: "Remote" }
];

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
          <span className="rounded-full bg-primary px-2 py-1 text-sm uppercase tracking-wide text-primary-foreground">
            InternshipsHub.in
          </span>
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1 transition hover:bg-primary/10 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
