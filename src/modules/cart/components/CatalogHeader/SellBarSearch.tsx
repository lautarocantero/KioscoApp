import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { CartBarSearchProps } from "@typings/cart/cartComponentTypes";
import SearchBar from "../../../shared/components/SearchBar/SearchBar";


const SellbarSearch = ({ search }: CartBarSearchProps): ReactNode => {
  const { t } = useTranslation();
  const { value, onChange, onClear, exactMatch, onToggleExactMatch } = search;

  return (
    <SearchBar
      value={value}
      onChange={onChange}
      onClear={onClear}
      placeholder={t("cart.catalog.search.placeholder")}
      fullWidth
      exactMatch={exactMatch}
      onToggleExactMatch={onToggleExactMatch}
    />
  );
};

export default SellbarSearch;