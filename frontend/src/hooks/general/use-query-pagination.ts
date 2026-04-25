import { useState } from "react";
import type { PaginationState } from "@tanstack/react-table";

export const useQueryPagination = (initialSize: number = 10) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialSize,
  });

  return { pagination, setPagination };
};
