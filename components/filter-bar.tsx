"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Option = {
  label: string;
  value: string;
};

type FilterSpec = {
  label: string;
  name: string;
  options: Option[];
  placeholder?: string;
};

export function FilterBar({ filters }: { filters: FilterSpec[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selections = useMemo(() => new Map(params.entries()), [params]);

  const handleChange = (name: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (!value) {
      next.delete(name);
    } else {
      next.set(name, value);
    }
    const query = next.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="flex flex-wrap gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {filters.map((filter) => (
        <label key={filter.name} className="flex flex-col text-xs font-semibold uppercase text-slate-500">
          {filter.label}
          <select
            value={selections.get(filter.name) ?? ""}
            onChange={(event) => handleChange(filter.name, event.target.value)}
            className="mt-1 w-48 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-primary focus:outline-none"
          >
            <option value="">{filter.placeholder ?? "All"}</option>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
}
