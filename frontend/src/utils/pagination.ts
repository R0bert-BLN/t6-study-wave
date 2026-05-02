import type { ApiResponse, LaravelPaginator } from "@/types/general/api.ts";

export const mapPaginator = <T>(paginator?: LaravelPaginator<T>): ApiResponse<T[]> => {
  if (!paginator) {
    return { success: true, data: [] };
  }

  return {
    success: true,
    data: paginator.data ?? [],
    meta: {
      currentPage: paginator.currentPage,
      from: paginator.from,
      lastPage: paginator.lastPage,
      links: paginator.links ?? [],
      path: paginator.path,
      perPage: paginator.perPage,
      to: paginator.to,
      total: paginator.total,
    },
    links: {
      first: paginator.firstPageUrl,
      last: paginator.lastPageUrl,
      next: paginator.nextPageUrl,
      prev: paginator.prevPageUrl,
    },
  };
};
