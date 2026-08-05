import type { ReactNode } from "react";
import SearchBar from "../../../shared/components/SearchBar/SearchBar";
import type { SellerBarSearchProps } from "@typings/seller/sellerComponentTypes";


const SellbarSearch = ({ search }: SellerBarSearchProps): ReactNode => {
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

export default SellbarSearch;