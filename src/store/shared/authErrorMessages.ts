import i18n from "@i18n/i18n";

/*══════════════════════════════════════════════════════════════════════════╗
║ 🗺️ translateAuthError                                                     ║
║                                                                          ║
║ Mapea mensajes crudos del server (en inglés, tal cual los tira AuthModel) ║
║ al idioma actual, usando el diccionario "authErrors" de src/i18n/locales. ║
║ Las keys deben matchear EXACTO el string que devuelve el backend en      ║
║ response.data.message (se normaliza a lowercase/trim antes de buscar,    ║
║ así que la key acá también va en minúsculas).                            ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const translateAuthError = (serverMessage: string | undefined): string | undefined => {
  if (!serverMessage) return serverMessage;

  const normalized = serverMessage.trim().toLowerCase();
  const authErrorMessages = i18n.t("authErrors", { returnObjects: true }) as Record<string, string>;

  return authErrorMessages[normalized] ?? serverMessage;
};
