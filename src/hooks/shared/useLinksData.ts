import type { LinkDataResult, OptionLink } from "@typings/ui/layout.types";
import { SidebarNavLinks } from "../../config/Links";
import { useProductsLinkData } from "../products/useProductData";
import { useProvidersLinkData } from "../suppliers/useSupplier";
import { useSellsLinkData } from "../sells/useSellData";

const dataHooksByUrl: Record<string, () => LinkDataResult> = {
  "/sells": useSellsLinkData,
  "/products": useProductsLinkData,
  "/providers": useProvidersLinkData,
};

export const useHomePageLinks = (): OptionLink[] =>
  SidebarNavLinks
    .filter((link) => link.description !== "Stocko")
    .map((link) => ({
      ...link,
      useData: dataHooksByUrl[link.url],
    }));