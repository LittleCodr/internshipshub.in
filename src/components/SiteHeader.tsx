import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/internships", label: "Internships" },
  { to: "/jobs", label: "Jobs" },
  { to: "/research", label: "Research" },
  { to: "/remote-internships", label: "Remote" }
];

const SiteHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-emerald-50 bg-gradient-to-r from-amber-100 via-lime-100 to-emerald-100/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <NavLink to="/" className="flex items-center gap-3 text-base font-semibold text-white sm:text-lg">
          <img src="/logo.png" alt="Internshipshub logo" className="h-9 w-9 rounded-xl border border-emerald-200 bg-white p-1 shadow" />
          <div className="leading-tight text-emerald-900">
            <span className="block text-xs uppercase tracking-[0.18em] text-emerald-700">Internships & Research</span>
            <span className="block text-[1.05rem] font-bold tracking-tight">Internshipshub.in</span>
          </div>
        </NavLink>
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-200 text-emerald-900 shadow-sm transition hover:border-emerald-300 hover:bg-white/60 sm:hidden"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <nav className="hidden items-center gap-2 text-sm font-medium text-emerald-900 sm:flex sm:gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 transition ${isActive ? "bg-white text-emerald-900 shadow" : "hover:bg-white/60"}`
              }
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {open && (
        <div className="border-t border-emerald-100 bg-white/90 shadow-lg backdrop-blur sm:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-sm font-semibold text-emerald-900">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-3 transition ${isActive ? "bg-emerald-100 text-emerald-900" : "hover:bg-emerald-50"}`
                }
                end={item.to === "/"}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
