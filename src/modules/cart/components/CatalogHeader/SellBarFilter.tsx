import type { ReactNode } from "react";
import type { CartBarFilterProps } from "@typings/cart/cartComponentTypes";
import FormSelector from "../../../shared/components/FormSelector/FormSelector";


const SellbarFilter = ({ categories }: CartBarFilterProps): ReactNode => {
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