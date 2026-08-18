import type { Currency } from "@typings/sells/sellsEnum";
import { getConfiguredCurrency, getCurrencyIsoCode, getCurrencyLocale } from "../../shared/helpers/getConfiguredCurrency";

// `currencyOverride` permite formatear con la moneda guardada de una venta
// histórica en vez de la moneda configurada actualmente en Ajustes.
export const formatCurrency = (value: number, currencyOverride?: Currency | string): string => {
  const currency = currencyOverride ?? getConfiguredCurrency();

  return new Intl.NumberFormat(getCurrencyLocale(currency), {
    style: "currency",
    currency: getCurrencyIsoCode(currency),
    minimumFractionDigits: 2,
  }).format(value);
};
