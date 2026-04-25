import { type ApiQueryParams, buildQueryParams, type FilterState } from "@/utils/query-builder.ts";
import type { ApiLink, ApiMeta, ApiResponse } from "@/types/api/api.ts";
import { useQueryPagination } from "@/hooks/general/use-query-pagination.ts";
import { useQuerySort } from "@/hooks/general/use-query-sort.ts";
import { useQueryFilters } from "@/hooks/general/use-query-filters.ts";
import type { SortingState } from "@tanstack/react-table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface QueryParams {
  initialSize?: number;
  initialFilters?: FilterState;
  initialSorting?: SortingState;
}

interface BaseQueryOptions<TData> {
  queryKey: string;
  queryFn: (params: ApiQueryParams) => Promise<ApiResponse<TData[]>>;
  params?: QueryParams;
}

interface BaseQueryResult<TData> {
  data: TData[];
  meta?: ApiMeta;
  links?: ApiLink;
  pagination: ReturnType<typeof useQueryPagination>;
  sorting: ReturnType<typeof useQuerySort>;
  filters: ReturnType<typeof useQueryFilters>;
}

export const useBaseQuery = <TData>({
  queryKey,
  queryFn,
  params,
}: BaseQueryOptions<TData>): BaseQueryResult<TData> => {
  const pagination = useQueryPagination(params?.initialSize);
  const filters = useQueryFilters(params?.initialFilters);
  const sorting = useQuerySort(params?.initialSorting);

  const queryParams = buildQueryParams({
    pagination: pagination.pagination,
    filters: filters.filters,
    sorting: sorting.sorting,
  });

  const query = useQuery({
    queryKey: [queryKey, queryParams],
    queryFn: () => queryFn(queryParams),
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    data: query.data?.data ?? [],
    meta: query.data?.meta,
    links: query.data?.links,
    pagination,
    sorting,
    filters,
  };
};
