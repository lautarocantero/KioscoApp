import type { LinkDataResult, OptionLink } from "@typings/ui/layout.types";
import { SidebarNavLinks } from "../../config/Links";
import { useProductsLinkData } from "../products/useProductData";
import { useProvidersLinkData } from "../providers/useProvidersLinkData";
import { useSellsLinkData } from "../sells/useSellData";
import { useSellersLinkData } from "../sellers/useSellersLinkData";

const dataHooksByUrl: Record<string, () => LinkDataResult> = {
  "/sells": useSellsLinkData,
  "/products": useProductsLinkData,
  "/providers": useProvidersLinkData,
  "/sellers": useSellersLinkData,
};

// Tarjetas de sección para /shop: excluye el Catálogo (acceso directo al
// POS, siempre visible en el sidebar) y la propia Tienda (ya estamos ahí).
export const useShopPageLinks = (): OptionLink[] =>
  SidebarNavLinks
    .filter((link) => link.description !== "Catalogo" && link.description !== "Tienda")
    .map((link) => ({
      ...link,
      useData: dataHooksByUrl[link.url],
    }));
