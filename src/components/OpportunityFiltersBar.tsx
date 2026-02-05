import type { OpportunityFilters, RemoteFilter } from "../hooks/useOpportunityFilters";

interface Props {
  filters: OpportunityFilters;
  totalCount?: number;
  filteredCount?: number;
  onReset?: () => void;
}

const OpportunityFiltersBar = ({ filters, totalCount, filteredCount, onReset }: Props) => {
  return (
    <section className="mt-6 space-y-3 rounded-3xl border border-emerald-50/80 bg-white/80 p-4 shadow-lg shadow-emerald-100/50 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-700">
        <div className="flex items-center gap-3 text-emerald-800">
          <span className="pill bg-emerald-50/80 ring-emerald-100/80">Filters</span>
          {typeof totalCount === "number" && typeof filteredCount === "number" && (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-800">
              Showing {filteredCount} of {totalCount}
            </span>
          )}
        </div>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200"
          >
            Reset filters
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex flex-col gap-2 text-sm text-slate-700">
          <span className="font-semibold text-slate-700">Work mode</span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "all", label: "All" },
              { value: "remote", label: "Remote" },
              { value: "onsite", label: "On-site" }
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => filters.setRemote(option.value as RemoteFilter)}
                className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                  filters.remote === option.value
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800 shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:border-emerald-100 hover:text-emerald-800"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex flex-col gap-2 text-sm text-slate-700">
          <span className="font-semibold text-slate-700">City</span>
          <div className="relative">
            <select
              value={filters.city}
              onChange={(event) => filters.setCity(event.target.value)}
              className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-3 py-2 pr-8 text-sm font-medium text-slate-800 shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            >
              <option value="all">All cities</option>
              {filters.cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400" aria-hidden>
              v
            </span>
          </div>
        </label>

        <label className="flex flex-col gap-2 text-sm text-slate-700">
          <span className="font-semibold text-slate-700">Industry</span>
          <div className="relative">
            <select
              value={filters.industry}
              onChange={(event) => filters.setIndustry(event.target.value)}
              className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-3 py-2 pr-8 text-sm font-medium text-slate-800 shadow-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            >
              <option value="all">All industries</option>
              {filters.industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400" aria-hidden>
              v
            </span>
          </div>
        </label>
      </div>
    </section>
  );
};

export default OpportunityFiltersBar;
