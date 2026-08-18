import { useCallback, useState } from "react";
import { Currency } from "@typings/sells/sellsEnum";
import type { UseCurrencyOptionReturn } from "@typings/settings/settingsTypes";
import { CURRENCY_STORAGE_KEY, DEFAULT_CURRENCY } from "../../config/constants";

export const useCurrencyOption = (): UseCurrencyOptionReturn => {
  const [currency, setCurrencyState] = useState<Currency>(
    () => (localStorage.getItem(CURRENCY_STORAGE_KEY) as Currency | null) ?? DEFAULT_CURRENCY
  );

  const setCurrency = useCallback((nextCurrency: Currency) => {
    localStorage.setItem(CURRENCY_STORAGE_KEY, nextCurrency);
    setCurrencyState(nextCurrency);
  }, []);

  return { currency, setCurrency };
};
