import type { ReactNode } from "react";
import SearchBar from "../../../../../shared/components/SearchBar/SearchBar";
import type { SellbarSearchProps } from "@typings/sells/SellComponentTypes";


export const SellbarSearch = ({ search }: SellbarSearchProps): ReactNode => {
  const { value, onChange, onClear } = search;

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