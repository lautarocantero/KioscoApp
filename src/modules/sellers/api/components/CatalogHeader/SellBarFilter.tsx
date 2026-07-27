import type { ReactNode } from "react";
import CategorySelector from "../../../../shared/components/CategorySelector/CategorySelector";
import type { SellerBarFilterProps } from "@typings/seller/sellerComponentTypes";


export const SellbarFilter = ({ categories }: SellerBarFilterProps): ReactNode => {
  const { list, selected, getLabel, onSelect } = categories;

  return (
    <CategorySelector
      mode="single"
      id="sellbar-category"
      label="Categoría"
      categories={list}
      getLabel={getLabel}
      value={selected}
      onChange={onSelect}
      allowClear
      clearLabel="Todas"
    />
  );
};