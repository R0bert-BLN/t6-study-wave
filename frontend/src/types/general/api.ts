export interface ApiResponse<TData> {
  success: boolean;
  data?: TData;
  message?: string;
  meta?: ApiMeta;
  links?: ApiLink;
}

export interface ApiMeta {
  currentPage: number;
  from: number | null;
  lastPage: number;
  links: ApiMetaLink[];
  path: string;
  perPage: number;
  to: number | null;
  total: number;
}

export interface ApiLink {
  first: string;
  last: string;
  next: string | null;
  prev: string | null;
}

export interface ApiError {
  success: boolean;
  error: {
    code: number;
    message: string;
    details?: object;
  };
}

export interface ApiMetaLink {
  url: string | null;
  label: string;
  active: boolean;
  page: number | null;
}

export interface LaravelPaginator<TData> {
  currentPage: number;
  data: TData[];
  firstPageUrl: string;
  from: number | null;
  lastPage: number;
  lastPageUrl: string;
  links: ApiMetaLink[];
  nextPageUrl: string | null;
  path: string;
  perPage: number;
  prevPageUrl: string | null;
  to: number | null;
  total: number;
}
