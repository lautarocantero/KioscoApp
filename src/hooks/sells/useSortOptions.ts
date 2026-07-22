import { useCallback } from "react";
import type { SelectChangeEvent } from "@mui/material";

export type SortOption = "name-asc" | "name-desc" | "stock-asc" | "stock-desc";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "name-asc", label: "Nombre A-Z" },
  { value: "name-desc", label: "Nombre Z-A" },
];

export const useSortOptions = (onSortChange: (value: SortOption) => void) => {
  const handleSortChange = useCallback(
    (e: SelectChangeEvent) => onSortChange(e.target.value as SortOption),
    [onSortChange]
  );

  return { options: SORT_OPTIONS, handleSortChange };
};