import Link from "next/link";
import type { Route } from "next";

import type { Breadcrumb } from "@/lib/schema";

export function Breadcrumbs({ crumbs }: { crumbs: Breadcrumb[] }) {
  return (
    <nav className="text-xs font-semibold uppercase tracking-wide text-slate-500">
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center gap-2">
            <Link
              href={crumb.path as unknown as Route}
              className="transition hover:text-primary"
            >
              {crumb.name}
            </Link>
            {index < crumbs.length - 1 ? <span className="text-slate-400">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
