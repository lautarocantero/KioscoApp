import { ShopSalesRange } from "@typings/shop/shopEnums";

export const SHOP_SALES_RANGE_LABELS: Record<ShopSalesRange, string> = {
  [ShopSalesRange.SevenDays]: "Últimos 7 días",
  [ShopSalesRange.Fortnight]: "Última quincena",
  [ShopSalesRange.Month]: "Último mes",
};

export const SHOP_SALES_RANGE_DAYS: Record<ShopSalesRange, number> = {
  [ShopSalesRange.SevenDays]: 7,
  [ShopSalesRange.Fortnight]: 15,
  [ShopSalesRange.Month]: 30,
};
