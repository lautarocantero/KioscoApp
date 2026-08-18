import { getConfiguredCurrency, getCurrencyIsoCode, getCurrencyLocale } from "./getConfiguredCurrency";

export const formatPrice = (price: number): string => {
    const currency = getConfiguredCurrency();

    return new Intl.NumberFormat(getCurrencyLocale(currency), {
        style: "currency",
        currency: getCurrencyIsoCode(currency),
        maximumFractionDigits: 0,
    }).format(price);
};

