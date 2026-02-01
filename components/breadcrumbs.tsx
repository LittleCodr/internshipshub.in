import Link from "next/link";
import type { Route } from "next";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 && <span className="text-slate-400">/</span>}
            {index === items.length - 1 ? (
              <span className="font-medium text-slate-700">{item.name}</span>
            ) : (
              <Link href={item.href as Route} className="hover:text-primary-600">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
