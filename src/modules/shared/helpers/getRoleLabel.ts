import type { AuthRoleEnum } from "@typings/auth/authEnums";
import { ROLE_LABELS } from "@typings/seller/sellerLabels";

// Traduce el valor interno del rol (admin/seller) al label en español que
// ve el usuario. Si llega un valor que no está en el mapa, lo muestra tal
// cual en vez de romper (defensivo: el string viene del backend).
export const getRoleLabel = (role: string): string => {
    return ROLE_LABELS[role as AuthRoleEnum] ?? role;
};

export default getRoleLabel;
