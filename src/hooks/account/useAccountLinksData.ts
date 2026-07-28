// hooks/account/useAccountLinksData.ts
import type { LinkDataResult } from "@typings/ui/layout.types";

// TODO: reemplazar por fetch real cuando el backend esté listo
export const useAccountEditLinkData = (): LinkDataResult => ({
  subtitle: "Datos personales y contraseña",
});

export const useAccountSubscriptionLinkData = (): LinkDataResult => ({
  value: "Free",
  subtitle: "Actualizá tu plan cuando quieras",
});