import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { LanguageEnum } from "@typings/settings/settingsEnums";
import { LANGUAGE_STORAGE_KEY } from "@i18n/i18n";
import type { UseLanguageOptionReturn } from "@typings/settings/settingsTypes";

export const useLanguageOption = (): UseLanguageOptionReturn => {
  const { i18n } = useTranslation();

  const language = (i18n.resolvedLanguage as LanguageEnum) ?? LanguageEnum.Spanish;

  const setLanguage = useCallback((nextLanguage: LanguageEnum) => {
    i18n.changeLanguage(nextLanguage);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  }, [i18n]);

  return { language, setLanguage };
};
