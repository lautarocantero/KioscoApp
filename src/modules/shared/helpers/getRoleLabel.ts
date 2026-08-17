import i18n from "@i18n/i18n";

// Traduce el valor interno del rol (admin/seller) al label que ve el
// usuario (clave "roles.<role>" en src/i18n/locales). Si llega un valor
// que no está en el diccionario, lo muestra tal cual en vez de romper
// (defensivo: el string viene del backend).
export const getRoleLabel = (role: string): string => {
    return i18n.t(`roles.${role}`, { defaultValue: role });
};

export default getRoleLabel;
