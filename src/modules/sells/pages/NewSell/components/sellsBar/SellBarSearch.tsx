import type { ReactNode } from "react";
import SearchBar from "../../../../../shared/components/SearchBar/SearchBar";
import type { SellbarSearchInterface } from "@typings/ui/appbar.types";
import { useSellbar } from "hooks/sells/useSellBar";

export const SellbarSearch = ({ showFilters }: SellbarSearchInterface): ReactNode => {
  const { search } = useSellbar();
  const { value, onChange, onClear  } = search;

  if (!showFilters) {
    return null;
  }

  return (
    <SearchBar
      value={value}
      onChange={onChange}
      onClear={onClear}
      placeholder="Buscar..."
      fullWidth
    />
  );
};