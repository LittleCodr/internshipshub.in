import Link from "next/link";

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  params
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
  params: URLSearchParams;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const createPageLink = (page: number) => {
    const nextParams = new URLSearchParams(params);
    if (page === 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", page.toString());
    }
    const query = nextParams.toString();
    return `${basePath}${query ? `?${query}` : ""}`;
  };

  return (
    <div className="flex items-center justify-center gap-3 text-sm">
      <Link
        href={createPageLink(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className="rounded-full border border-slate-200 px-3 py-1 text-slate-600 transition hover:border-primary hover:text-primary aria-disabled:pointer-events-none aria-disabled:opacity-50"
      >
        Previous
      </Link>
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={createPageLink(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className="rounded-full border border-slate-200 px-3 py-1 text-slate-600 transition hover:border-primary hover:text-primary aria-disabled:pointer-events-none aria-disabled:opacity-50"
      >
        Next
      </Link>
    </div>
  );
}
