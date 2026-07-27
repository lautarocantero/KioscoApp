import type { ReactNode } from "react";
import SearchBar from "../../../../../shared/components/SearchBar/SearchBar";
import type { SellerBarSearchProps } from "@typings/seller/sellerComponentTypes";


export const SellbarSearch = ({ search }: SellerBarSearchProps): ReactNode => {
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