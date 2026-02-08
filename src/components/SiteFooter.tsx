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
    <footer className="relative mt-10 bg-gradient-to-br from-slate-950 to-slate-900 text-slate-50">
      <div className="absolute inset-0 bg-grid opacity-10" aria-hidden />
      <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" aria-hidden />
      <div className="absolute right-10 bottom-0 h-36 w-36 rounded-full bg-cyan-400/15 blur-3xl" aria-hidden />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl space-y-4">
          <div className="pill bg-white/10 text-emerald-100 ring-emerald-200/30">Internships & Research</div>
          <h2 className="text-2xl font-semibold text-white">Built for students who need clarity.</h2>
          <p className="text-sm text-slate-200">
            Curated internships, research roles, and remote opportunities with honest details on eligibility, deadlines, and outcomes. Updated weekly.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-200">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">Verified listings</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">JSON-LD rich data</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">Remote-friendly filters</span>
          </div>
        </div>

        <div className="grid w-full max-w-xl grid-cols-1 gap-8 text-sm md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-200">Explore</h3>
            <nav className="flex flex-col gap-2 text-slate-200">
              {footerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-lg px-0 py-1 transition hover:text-white hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-200">Contact</h3>
            <div className="space-y-2 text-slate-200">
              <p>Have an opportunity to list or need a correction?</p>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5">
                Reach out
              </Link>
              <a href="mailto:tacaz956@gmail.com" className="block text-sm text-emerald-100 underline hover:text-white">
                tacaz956@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} internshipshub.in. All rights reserved.</p>
          <p className="text-slate-400">Made for students, optimized for crawlability.</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
