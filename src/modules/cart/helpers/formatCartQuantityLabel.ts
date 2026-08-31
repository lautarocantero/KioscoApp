import type { TFunction } from "i18next";

// "300 g" para venta por peso, "3 u" para venta por unidad.
export const formatCartQuantityLabel = (quantity: number, isWeight: boolean, t: TFunction): string =>
  `${quantity} ${isWeight ? t("cart.table.weightUnit") : t("cart.table.unitSuffix")}`;

export default formatCartQuantityLabel;
