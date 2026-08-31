import type { TFunction } from "i18next";
import { formatCurrency } from "./formatCurrency";

// Precio formateado, con el sufijo "/100 g" para venta por peso.
export const formatCartPriceLabel = (price: number, isWeight: boolean, t: TFunction): string =>
  isWeight ? `${formatCurrency(price)} ${t("cart.table.per100gSuffix")}` : formatCurrency(price);

export default formatCartPriceLabel;
