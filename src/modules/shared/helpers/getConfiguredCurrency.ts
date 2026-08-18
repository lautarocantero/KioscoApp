import { Currency } from "@typings/sells/sellsEnum";
import { CURRENCY_OPTIONS, CURRENCY_STORAGE_KEY, DEFAULT_CURRENCY } from "../../../config/constants";

export const getConfiguredCurrency = (): Currency => {
    const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
    if (!stored) return DEFAULT_CURRENCY;

    const match = CURRENCY_OPTIONS.find((option) => option.value === stored);
    return match?.value ?? DEFAULT_CURRENCY;
};

export const getCurrencyLocale = (currency: string): string => {
    const match = CURRENCY_OPTIONS.find((option) => option.value === currency);
    if (!match) return CURRENCY_OPTIONS[0].locale;

    return match.locale;
};

export const getCurrencyIsoCode = (currency: string): string => {
    const match = CURRENCY_OPTIONS.find((option) => option.value === currency);
    if (!match) return CURRENCY_OPTIONS[0].isoCode;

    return match.isoCode;
};
