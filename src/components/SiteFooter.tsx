import { Link } from "react-router-dom";

const footerLinks = [
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy-policy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
  { to: "/disclaimer", label: "Disclaimer" }
];

const SiteFooter = () => {
  return (
    <footer className="bg-gradient-to-br from-amber-50 via-lime-50 to-emerald-50 text-emerald-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-100">
            Internships & Research
          </div>
          <p className="text-emerald-800">Curated internships, research roles, and remote opportunities for students.</p>
          <p className="text-xs text-emerald-700">© {new Date().getFullYear()} internshipshub.in. All rights reserved.</p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm font-semibold">
          {footerLinks.map((link) => (
            <Link key={link.to} to={link.to} className="rounded-lg px-3 py-2 text-emerald-900 transition hover:bg-white/80 ring-1 ring-transparent hover:ring-emerald-200">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default SiteFooter;
