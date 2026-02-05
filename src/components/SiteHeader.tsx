import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllContent } from "../lib/content";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/internships", label: "Internships" },
  { to: "/jobs", label: "Jobs" },
  { to: "/research", label: "Research" },
  { to: "/remote-internships", label: "Remote" }
];

const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const contentIndex = useMemo(
    () =>
      getAllContent().map((entry) => ({
        slug: entry.slug,
        type: entry.category,
        title: entry.frontmatter.title,
        company: entry.frontmatter.company,
        description: entry.frontmatter.description
      })),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return contentIndex
      .filter((item) =>
        [item.title, item.company, item.description].some((field) => field?.toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [contentIndex, query]);

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
    }
  }, [searchOpen]);

  const linkFor = (item: (typeof contentIndex)[number]) => {
    if (item.type === "internship") return `/internships/${item.slug}`;
    if (item.type === "job") return `/jobs/${item.slug}`;
    return `/research/${item.slug}`;
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-40 focus:rounded-lg focus:bg-emerald-100 focus:px-4 focus:py-2 focus:text-emerald-900">
        Skip to content
      </a>
      <div className="relative border-b border-white/50 bg-gradient-to-r from-emerald-50/90 via-white to-amber-50/90">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-300" aria-hidden />
        <div className="absolute left-8 top-6 h-16 w-16 rounded-full bg-emerald-200/30 blur-3xl" aria-hidden />
        <div className="absolute right-10 top-10 h-20 w-20 rounded-full bg-amber-200/30 blur-3xl" aria-hidden />
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <NavLink to="/" className="flex items-center gap-3 text-base font-semibold text-emerald-900 sm:text-lg">
            <img src="/logo.png" alt="Internshipshub logo" className="h-10 w-10 rounded-2xl border border-emerald-100 bg-white p-1 shadow-lg shadow-emerald-100/60" />
            <div className="leading-tight">
              <span className="block text-[0.7rem] uppercase tracking-[0.2em] text-emerald-700">Internships & Research</span>
              <span className="block text-[1.12rem] font-bold tracking-tight">Internshipshub.in</span>
            </div>
          </NavLink>

          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <button
                className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-900 shadow-sm shadow-emerald-100 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
                onClick={() => setSearchOpen((v) => !v)}
                aria-expanded={searchOpen}
                aria-controls="header-search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-3-3m0 0a3.75 3.75 0 1 0-5.303-5.303 3.75 3.75 0 0 0 5.303 5.303Z" />
                </svg>
                <span>Search</span>
              </button>
              {searchOpen && (
                <div
                  id="header-search"
                  className="glass-card absolute right-0 mt-3 w-96 border-emerald-100/60 p-4 shadow-2xl shadow-emerald-100/70"
                >
                  <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-white px-3 py-2 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="h-4 w-4 text-emerald-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-3-3m0 0a3.75 3.75 0 1 0-5.303-5.303 3.75 3.75 0 0 0 5.303 5.303Z" />
                    </svg>
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search internships, jobs, research"
                      className="w-full bg-transparent text-sm text-emerald-900 placeholder:text-emerald-500 focus:outline-none"
                    />
                    <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-700">/</span>
                  </div>
                  <div className="mt-3 grid gap-2 text-sm text-emerald-900">
                    {query.trim() === "" && <p className="text-emerald-500">Start typing to see results.</p>}
                    {query.trim() !== "" && filtered.length === 0 && <p className="text-emerald-500">No matches yet.</p>}
                    {filtered.map((item) => (
                      <NavLink
                        key={`${item.type}-${item.slug}`}
                        to={linkFor(item)}
                        className="rounded-xl border border-transparent px-3 py-2 transition hover:border-emerald-100 hover:bg-emerald-50"
                        onClick={() => {
                          setSearchOpen(false);
                          setQuery("");
                        }}
                      >
                        <p className="text-sm font-semibold text-emerald-900">{item.title}</p>
                        <p className="text-xs text-emerald-700">{item.company}</p>
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <nav className="hidden items-center gap-2 text-sm font-medium text-emerald-900 sm:flex sm:gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-full px-3.5 py-2 transition ${isActive ? "bg-emerald-600 text-white shadow-md shadow-emerald-200" : "hover:bg-emerald-50"}`
                  }
                  end={item.to === "/"}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <NavLink
              to="/contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5"
            >
              <span>Post an opportunity</span>
            </NavLink>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-100 bg-white/70 text-emerald-900 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white sm:hidden"
              aria-label="Toggle navigation"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-b border-emerald-50 bg-white/95 shadow-lg shadow-emerald-100/60 backdrop-blur sm:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-sm font-semibold text-emerald-900">
            <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-white px-3 py-2 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="h-4 w-4 text-emerald-800">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-3-3m0 0a3.75 3.75 0 1 0-5.303-5.303 3.75 3.75 0 0 0 5.303 5.303Z" />
              </svg>
              <input
                ref={searchOpen ? inputRef : null}
                value={query}
                onFocus={() => setSearchOpen(true)}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search listings"
                className="flex-1 bg-transparent text-sm text-emerald-900 placeholder:text-emerald-500 focus:outline-none"
              />
            </div>
            {searchOpen && query.trim() !== "" && (
              <div className="grid gap-2 rounded-xl border border-emerald-100 bg-white p-2 shadow-sm">
                {filtered.length === 0 && <p className="px-2 py-1 text-sm text-emerald-600">No matches yet.</p>}
                {filtered.map((item) => (
                  <NavLink
                    key={`${item.type}-${item.slug}`}
                    to={linkFor(item)}
                    className="rounded-lg px-3 py-2 text-sm text-emerald-900 transition hover:bg-emerald-50"
                    onClick={() => {
                      setOpen(false);
                      setSearchOpen(false);
                      setQuery("");
                    }}
                  >
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-xs text-emerald-700">{item.company}</p>
                  </NavLink>
                ))}
              </div>
            )}
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
            <NavLink
              to="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-md"
              onClick={() => setOpen(false)}
            >
              Post an opportunity
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
