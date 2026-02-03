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
    <header className="sticky top-0 z-30 border-b border-white/10 bg-gradient-to-r from-lime-900 via-emerald-900 to-amber-800/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-semibold text-white">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-lime-400 to-emerald-500 text-sm font-bold text-emerald-950 shadow-lg">IH</span>
          <span className="tracking-tight">internshipshub.in</span>
        </NavLink>
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white shadow-sm transition hover:border-white/40 hover:bg-white/10 sm:hidden"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <nav className="hidden items-center gap-2 text-sm font-medium text-white sm:flex sm:gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 transition ${isActive ? "bg-amber-300 text-emerald-950 shadow" : "hover:bg-white/10"}`
              }
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-emerald-950/90 shadow-lg backdrop-blur sm:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-sm font-semibold text-white">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-3 transition ${isActive ? "bg-amber-300 text-emerald-950" : "hover:bg-white/10"}`
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
