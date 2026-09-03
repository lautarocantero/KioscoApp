import type { LinkDataResult } from "@typings/ui/layout.types";
import { useProductsLinkData } from "../products/useProductData";
import { useProvidersLinkData } from "../providers/useProvidersLinkData";
import { useSellsLinkData } from "../sells/useSellData";
import { useSellersLinkData } from "../sellers/useSellersLinkData";

// Fuente de verdad única url → hook de datos reales, compartida por
// useSidebarNavLinks (subtítulo del riel del sidebar). Antes también la
// usaba useShopStatLinks para la fila de stats de /shop, removida en el
// rediseño a "resumen del día" (ver docs/features/shopDashboard.md).
export const dataHooksByUrl: Record<string, () => LinkDataResult> = {
  "/sells": useSellsLinkData,
  "/products": useProductsLinkData,
  "/providers": useProvidersLinkData,
  "/sellers": useSellersLinkData,
};
