import type { ListingFilters } from "@lib/filters";

interface FiltersProps {
  options: {
    cities: string[];
    states: string[];
    industries: string[];
    companyTypes: string[];
    employmentTypes: string[];
  };
  selected: ListingFilters;
  action: string;
  total: number;
}

const booleanOptions = [
  { label: "Any", value: "" },
  { label: "Yes", value: "true" },
  { label: "No", value: "false" }
];

export function FilterBar({ options, selected, action, total }: FiltersProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <form className="grid grid-cols-1 gap-4 sm:grid-cols-3" method="get" action={action}>
        <fieldset className="flex flex-col gap-1">
          <label htmlFor="keywords" className="text-xs font-semibold uppercase text-slate-500">
            Keywords
          </label>
          <input
            id="keywords"
            name="keywords"
            defaultValue={selected.keywords ?? ""}
            placeholder="company, role, skill"
            className="w-full rounded border border-slate-200 px-3 py-2 text-sm"
          />
        </fieldset>
        <fieldset className="flex flex-col gap-1">
          <label htmlFor="city" className="text-xs font-semibold uppercase text-slate-500">
            City
          </label>
          <select
            id="city"
            name="city"
            defaultValue={selected.city ?? ""}
            className="w-full rounded border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">Any city</option>
            {options.cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset className="flex flex-col gap-1">
          <label htmlFor="state" className="text-xs font-semibold uppercase text-slate-500">
            State
          </label>
          <select
            id="state"
            name="state"
            defaultValue={selected.state ?? ""}
            className="w-full rounded border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">Any state</option>
            {options.states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset className="flex flex-col gap-1">
          <label htmlFor="industry" className="text-xs font-semibold uppercase text-slate-500">
            Industry
          </label>
          <select
            id="industry"
            name="industry"
            defaultValue={selected.industry ?? ""}
            className="w-full rounded border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">Any industry</option>
            {options.industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset className="flex flex-col gap-1">
          <label htmlFor="companyType" className="text-xs font-semibold uppercase text-slate-500">
            Company Type
          </label>
          <select
            id="companyType"
            name="companyType"
            defaultValue={selected.companyType ?? ""}
            className="w-full rounded border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">Any type</option>
            {options.companyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset className="flex flex-col gap-1">
          <label htmlFor="employmentType" className="text-xs font-semibold uppercase text-slate-500">
            Employment Type
          </label>
          <select
            id="employmentType"
            name="employmentType"
            defaultValue={selected.employmentType ?? ""}
            className="w-full rounded border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">Any</option>
            {options.employmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset className="flex flex-col gap-1">
          <label htmlFor="remote" className="text-xs font-semibold uppercase text-slate-500">
            Remote
          </label>
          <select
            id="remote"
            name="remote"
            defaultValue={selected.remote === undefined ? "" : String(selected.remote)}
            className="w-full rounded border border-slate-200 px-3 py-2 text-sm"
          >
            {booleanOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset className="flex flex-col gap-1">
          <label htmlFor="hybrid" className="text-xs font-semibold uppercase text-slate-500">
            Hybrid
          </label>
          <select
            id="hybrid"
            name="hybrid"
            defaultValue={selected.hybrid === undefined ? "" : String(selected.hybrid)}
            className="w-full rounded border border-slate-200 px-3 py-2 text-sm"
          >
            {booleanOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset className="flex flex-col gap-1">
          <label htmlFor="paid" className="text-xs font-semibold uppercase text-slate-500">
            Paid
          </label>
          <select
            id="paid"
            name="paid"
            defaultValue={selected.paid === undefined ? "" : String(selected.paid)}
            className="w-full rounded border border-slate-200 px-3 py-2 text-sm"
          >
            {booleanOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </fieldset>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-xs text-slate-500">Showing {total} opportunities</p>
          <div className="flex gap-2">
            <a
              href={action}
              className="rounded border border-slate-200 px-4 py-2 text-sm text-slate-600"
            >
              Clear
            </a>
            <button
              type="submit"
              className="rounded bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
            >
              Filter
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
