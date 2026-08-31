import type { TFunction } from "i18next";

// "vacío" o "N ítems" para el badge del header del carrito.
export const formatCartCountBadgeLabel = (itemsCount: number, t: TFunction): string =>
  itemsCount > 0 ? t("cart.header.itemsBadge", { count: itemsCount }) : t("cart.header.emptyBadge");

export default formatCartCountBadgeLabel;
