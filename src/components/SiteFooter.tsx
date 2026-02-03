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
    <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white ring-1 ring-white/10">
            Internshipshub.in
          </div>
          <p className="text-slate-200">Curated internships, research roles, and remote opportunities for students.</p>
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} internshipshub.in. All rights reserved.</p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm font-semibold">
          {footerLinks.map((link) => (
            <Link key={link.to} to={link.to} className="rounded-lg px-3 py-2 text-slate-100 transition hover:bg-white/10">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default SiteFooter;
