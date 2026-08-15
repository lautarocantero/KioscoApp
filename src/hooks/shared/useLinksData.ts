import type { LinkDataResult, OptionLink } from "@typings/ui/layout.types";
import { SidebarNavLinks } from "../../config/Links";
import { useProductsLinkData } from "../products/useProductData";
import { useProvidersLinkData } from "../suppliers/useSupplier";
import { useSellsLinkData } from "../sells/useSellData";
import { useSellersLinkData } from "../sellers/useSellerListData";

const dataHooksByUrl: Record<string, () => LinkDataResult> = {
  "/sells": useSellsLinkData,
  "/products": useProductsLinkData,
  "/providers": useProvidersLinkData,
  "/sellers": useSellersLinkData,
};

export const useHomePageLinks = (): OptionLink[] =>
  SidebarNavLinks
    .filter((link) => link.description !== "Catalogo" && link.description !== "Inicio")
    .map((link) => ({
      ...link,
      useData: dataHooksByUrl[link.url],
    }));