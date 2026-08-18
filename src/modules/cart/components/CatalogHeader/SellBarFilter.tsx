import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { CartBarFilterProps } from "@typings/cart/cartComponentTypes";
import FormSelector from "../../../shared/components/FormSelector/FormSelector";


const SellbarFilter = ({ categories }: CartBarFilterProps): ReactNode => {
  const { t } = useTranslation();
  const { list, selected, getLabel, onSelect } = categories;

  return (
    <FormSelector
      mode="single"
      id="sellbar-category"
      catalogFilter
      label={t("cart.catalog.filter.label")}
      categories={list}
      getLabel={getLabel}
      value={selected}
      onChange={onSelect}
      allowClear
      clearLabel={t("cart.catalog.filter.clearLabel")}
    />
  );
};

export default SellbarFilter;