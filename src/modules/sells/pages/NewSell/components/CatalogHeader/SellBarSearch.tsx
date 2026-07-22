import type { ReactNode } from "react";
import SearchBar from "../../../../../shared/components/SearchBar/SearchBar";
import { useSellbar } from "../../../../../../hooks/sells/useSellBar";

export const SellbarSearch = (): ReactNode => {
  const { search } = useSellbar();
  const { value, onChange, onClear  } = search;


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