import { useCallback } from "react";
import type { SelectChangeEvent } from "@mui/material";
import { SortOption } from "@typings/seller/sellerEnums";
import type { SortOption as SortOptionType } from "@typings/seller/sellerEnums";

export const SORT_OPTIONS: { value: SortOptionType; label: string }[] = [
  { value: SortOption.NameAsc, label: "Nombre A-Z" },
  { value: SortOption.NameDesc, label: "Nombre Z-A" },
];

export const useSortOptions = (onSortChange: (value: SortOption) => void) => {
  const handleSortChange = useCallback(
    (e: SelectChangeEvent) => onSortChange(e.target.value as SortOption),
    [onSortChange]
  );

  return { options: SORT_OPTIONS, handleSortChange };
};