// hooks/shop/useShopLinksData.ts
import type { LinkDataResult } from "@typings/ui/layout.types";

// TODO: reemplazar por fetch real cuando el backend esté listo
export const useShopAdministratorsLinkData = (): LinkDataResult => ({
  value: "2",
  subtitle: "2 administradores activos",
});

export const useShopSellersLinkData = (): LinkDataResult => ({
  value: "6",
  subtitle: "6 vendedores registrados",
});

export const useShopStatisticsLinkData = (): LinkDataResult => ({
  subtitle: "Resumen de ventas y stock",
});