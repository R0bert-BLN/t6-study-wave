import { useCallback, useState } from "react";
import type { FilterState, FilterValue } from "@/utils/query-builder.ts";

export const useQueryFilters = (initialFilters: FilterState = {}) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const setFilter = useCallback((key: keyof FilterState, value: FilterValue) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  return { filters, setFilters, setFilter, resetFilters };
};
