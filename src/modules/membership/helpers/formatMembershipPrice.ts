import { formatCurrency } from "../../cart/helpers/formatCurrency";

// El precio de una membresía siempre viene en la moneda que cobra Mercado
// Pago (currency_id del back, ISO 4217 en mayúsculas: "ARS"), no en la
// moneda configurada del kiosco — por eso currencyOverride, no
// getConfiguredCurrency(). CURRENCY_OPTIONS usa códigos en minúscula.
export const formatMembershipPrice = (price: number, currencyId: string): string =>
    formatCurrency(price, currencyId.toLowerCase());
