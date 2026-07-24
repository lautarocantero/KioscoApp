import type { ReactNode } from "react";
import CategorySelector from "../../../../../shared/components/CategorySelector/CategorySelector";
import type { SellbarFilterProps } from "@typings/sells/SellComponentTypes";


export const SellbarFilter = ({ categories }: SellbarFilterProps): ReactNode => {
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