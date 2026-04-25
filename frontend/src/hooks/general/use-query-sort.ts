import type { SortingState } from "@tanstack/react-table";
import { useState } from "react";

export const useQuerySort = (initialSort: SortingState = []) => {
  const [sorting, setSorting] = useState<SortingState>(initialSort);
  return { sorting, setSorting };
};
