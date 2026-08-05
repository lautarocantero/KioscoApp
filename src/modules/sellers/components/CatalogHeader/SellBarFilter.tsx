import type { ReactNode } from "react";
import FormSelector from "../../../shared/components/FormSelector/FormSelector";
import type { SellerBarFilterProps } from "@typings/seller/sellerComponentTypes";


const SellbarFilter = ({ categories }: SellerBarFilterProps): ReactNode => {
  const { list, selected, getLabel, onSelect } = categories;

  return (
    <FormSelector
      mode="single"
      id="sellbar-category"
      catalogFilter
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

export default SellbarFilter;