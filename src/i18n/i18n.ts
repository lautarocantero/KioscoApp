import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./locales/es";
import en from "./locales/en";
import { LanguageEnum } from "@typings/settings/settingsEnums";

// Clave propia (no se importa desde config/constants.ts a propósito: evita un
// ciclo, porque algunos consumidores no-React de constants.ts leen este mismo
// módulo para traducir labels fuera de un componente).
export const LANGUAGE_STORAGE_KEY = "appLanguage";

const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

i18next.use(initReactI18next).init({
  resources: {
    [LanguageEnum.Spanish]: { translation: es },
    [LanguageEnum.English]: { translation: en },
  },
  lng: storedLanguage ?? LanguageEnum.Spanish,
  fallbackLng: LanguageEnum.Spanish,
  interpolation: { escapeValue: false },
});

export default i18next;
