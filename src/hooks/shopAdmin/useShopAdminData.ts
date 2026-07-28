// hooks/shopAdmin/useShopAdminData.ts
import type { LinkDataResult } from "@typings/ui/layout.types";

// TODO: reemplazar por fetch real cuando el backend esté listo
export const useShopAdministratorsListLinkData = (): LinkDataResult => ({
  value: "4",
  subtitle: "4 administradores activos",
});

export const useShopAdministratorsCreateLinkData = (): LinkDataResult => ({
  subtitle: "Alta rápida de nuevo admin",
});

export const useShopAdministratorsEditLinkData = (): LinkDataResult => ({
  subtitle: "Editá permisos y datos",
});