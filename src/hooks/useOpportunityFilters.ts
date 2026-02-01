import { useMemo, useState } from "react";
import type { ContentEntry } from "../types/content";

export type RemoteFilter = "all" | "remote" | "onsite";

export interface OpportunityFilters {
  remote: RemoteFilter;
  setRemote: (value: RemoteFilter) => void;
  city: string;
  setCity: (value: string) => void;
  industry: string;
  setIndustry: (value: string) => void;
  filtered: ContentEntry[];
  cities: string[];
  industries: string[];
}

export function useOpportunityFilters(entries: ContentEntry[]): OpportunityFilters {
  const [remote, setRemote] = useState<RemoteFilter>("all");
  const [city, setCity] = useState("all");
  const [industry, setIndustry] = useState("all");

  const cities = useMemo(() => {
    return Array.from(new Set(entries.map((entry) => entry.frontmatter.city))).sort();
  }, [entries]);

  const industries = useMemo(() => {
    return Array.from(new Set(entries.map((entry) => entry.frontmatter.industry))).sort();
  }, [entries]);

  const filtered = useMemo(() => {
    return entries.filter((entry) => {
      const matchesRemote =
        remote === "all" || (remote === "remote" && entry.frontmatter.remote) || (remote === "onsite" && !entry.frontmatter.remote);
      const matchesCity = city === "all" || entry.frontmatter.city === city;
      const matchesIndustry = industry === "all" || entry.frontmatter.industry === industry;
      return matchesRemote && matchesCity && matchesIndustry;
    });
  }, [entries, remote, city, industry]);

  return {
    remote,
    setRemote,
    city,
    setCity,
    industry,
    setIndustry,
    filtered,
    cities,
    industries
  };
}
