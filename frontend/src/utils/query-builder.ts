import type { PaginationState, SortingState } from "@tanstack/react-table";

export type FilterState = Record<string, FilterValue>;
export type FilterValue = number | string | boolean | null;

interface QueryParams {
  pagination: PaginationState;
  filters?: FilterState;
  sorting?: SortingState;
  include?: string;
}

export interface ApiQueryParams {
  page: number;
  per_page: number;
  filter?: FilterState;
  sort?: string;
  include?: string;
}

export const buildQueryParams = ({
  pagination,
  sorting,
  filters,
  include,
}: QueryParams): ApiQueryParams => {
  const sort = sorting?.map((sort) => (sort.desc ? `-${sort.id}` : `${sort.id}`)).join(",");

  return {
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
    filter: filters,
    include: include,
    sort: sort || undefined,
  };
};
