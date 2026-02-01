interface PaginationProps {
  page: number;
  totalPages: number;
  basePath: string;
  searchParams: Record<string, string | string[] | undefined>;
}

const buildHref = (
  basePath: string,
  page: number,
  searchParams: Record<string, string | string[] | undefined>
) => {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (key === "page") return;
    if (Array.isArray(value)) {
      params.set(key, value[0] ?? "");
    } else if (value) {
      params.set(key, value);
    }
  });
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
};

export function Pagination({ page, totalPages, basePath, searchParams }: PaginationProps) {
  if (totalPages <= 1) return null;

  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;

  return (
    <nav className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm" aria-label="Pagination">
      <a
        href={prevPage ? buildHref(basePath, prevPage, searchParams) : "#"}
        aria-disabled={!prevPage}
        className={`font-medium ${prevPage ? "text-primary-600 hover:text-primary-700" : "pointer-events-none text-slate-300"}`}
      >
        Previous
      </a>
      <span className="text-xs text-slate-500">
        Page {page} of {totalPages}
      </span>
      <a
        href={nextPage ? buildHref(basePath, nextPage, searchParams) : "#"}
        aria-disabled={!nextPage}
        className={`font-medium ${nextPage ? "text-primary-600 hover:text-primary-700" : "pointer-events-none text-slate-300"}`}
      >
        Next
      </a>
    </nav>
  );
}
