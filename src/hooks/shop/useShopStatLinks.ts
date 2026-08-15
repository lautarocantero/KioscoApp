import type { LinkDataResult, OptionLink } from "@typings/ui/layout.types";
import { SidebarNavLinks } from "../../config/Links";
import { useProductsLinkData } from "../products/useProductData";
import { useProvidersLinkData } from "../providers/useProvidersLinkData";
import { useSellsLinkData } from "../sells/useSellData";
import { useSellersLinkData } from "../sellers/useSellersLinkData";

const STAT_URLS = ["/sells", "/products", "/sellers", "/providers"];

const dataHooksByUrl: Record<string, () => LinkDataResult> = {
  "/sells": useSellsLinkData,
  "/products": useProductsLinkData,
  "/providers": useProvidersLinkData,
  "/sellers": useSellersLinkData,
};

// Tarjetas de stats de la fila superior de /shop: Ventas, Productos,
// Vendedores y Proveedores. Excluye el Catálogo (acceso directo al POS),
// la propia Tienda (ya estamos ahí) y Boletas (va como CTA junto al
// gráfico de ventas, no tiene un número real que mostrar).
export const useShopStatLinks = (): OptionLink[] =>
  SidebarNavLinks
    .filter((link) => STAT_URLS.includes(link.url))
    .map((link) => ({
      ...link,
      useData: dataHooksByUrl[link.url],
    }));
