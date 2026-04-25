export interface ApiResponse<TData> {
  data: TData;
  meta: ApiMeta;
  links: ApiLink;
}

export interface ApiMeta {
  currentPage: number;
  from: number;
  lastPage: number;
  links: ApiMetaLink[];
  path: string;
  perPage: number;
  to: number;
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

interface ApiMetaLink {
  url: string | null;
  label: string;
  active: boolean;
  page: number | null;
}
