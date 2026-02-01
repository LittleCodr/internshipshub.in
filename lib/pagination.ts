import { type PaginatedResult } from "@lib/content-types";

export const DEFAULT_PAGE_SIZE = 12;

export const paginate = <T>(
  items: T[],
  page: number,
  pageSize: number = DEFAULT_PAGE_SIZE
): PaginatedResult<T> => {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  return {
    items: items.slice(start, end),
    total,
    page: currentPage,
    pageSize,
    totalPages
  };
};
