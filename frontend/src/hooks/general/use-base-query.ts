import { type ApiQueryParams, buildQueryParams, type FilterState } from "@/utils/query-builder.ts";
import type { ApiLink, ApiMeta, ApiResponse } from "@/types/general/api.ts";
import { useQueryPagination } from "@/hooks/general/use-query-pagination.ts";
import { useQuerySort } from "@/hooks/general/use-query-sort.ts";
import { useQueryFilters } from "@/hooks/general/use-query-filters.ts";
import type { SortingState } from "@tanstack/react-table";
import { keepPreviousData, type QueryKey, useQuery } from "@tanstack/react-query";

export interface QueryParams {
  size?: number;
  filters?: FilterState;
  sorting?: SortingState;
  include?: string;
}

export interface BaseQueryOptions<TData> {
  queryKey: QueryKey;
  queryFn: (params: ApiQueryParams) => Promise<ApiResponse<TData[]>>;
  params?: QueryParams;
}

export interface BaseQueryResult<TData> {
  data: TData[];
  meta?: ApiMeta;
  links?: ApiLink;
  pagination: ReturnType<typeof useQueryPagination>;
  sorting: ReturnType<typeof useQuerySort>;
  filters: ReturnType<typeof useQueryFilters>;
  isLoading: boolean;
}

export const useBaseQuery = <TData>({
  queryKey,
  queryFn,
  params,
}: BaseQueryOptions<TData>): BaseQueryResult<TData> => {
  const pagination = useQueryPagination(params?.size);
  const filters = useQueryFilters(params?.filters);
  const sorting = useQuerySort(params?.sorting);

  const queryParams = buildQueryParams({
    pagination: pagination.pagination,
    filters: filters.filters,
    sorting: sorting.sorting,
    include: params?.include,
  });

  const baseKey = Array.isArray(queryKey) ? queryKey : [queryKey];

  const query = useQuery({
    queryKey: [...baseKey, queryParams],
    queryFn: () => queryFn(queryParams),
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    data: query.data?.data ?? [],
    meta: query.data?.meta,
    links: query.data?.links,
    pagination,
    isLoading: query.isLoading,
    sorting,
    filters,
  };
};
