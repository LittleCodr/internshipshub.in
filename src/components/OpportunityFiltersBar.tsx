import type { OpportunityFilters, RemoteFilter } from "../hooks/useOpportunityFilters";

interface Props {
  filters: OpportunityFilters;
}

const OpportunityFiltersBar = ({ filters }: Props) => {
  return (
    <form className="mt-6 grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 md:grid-cols-3">
      <label className="flex flex-col gap-2">
        <span className="font-semibold text-slate-600">Work mode</span>
        <select
          value={filters.remote}
          onChange={(event) => filters.setRemote(event.target.value as RemoteFilter)}
          className="rounded border border-slate-300 bg-white px-3 py-2"
        >
          <option value="all">All opportunities</option>
          <option value="remote">Remote only</option>
          <option value="onsite">On-site only</option>
        </select>
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-semibold text-slate-600">City</span>
        <select
          value={filters.city}
          onChange={(event) => filters.setCity(event.target.value)}
          className="rounded border border-slate-300 bg-white px-3 py-2"
        >
          <option value="all">All cities</option>
          {filters.cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-semibold text-slate-600">Industry</span>
        <select
          value={filters.industry}
          onChange={(event) => filters.setIndustry(event.target.value)}
          className="rounded border border-slate-300 bg-white px-3 py-2"
        >
          <option value="all">All industries</option>
          {filters.industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
};

export default OpportunityFiltersBar;
