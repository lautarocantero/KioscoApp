// hooks/shopAdmin/useLinksData.ts
import type { LinkDataResult, OptionLink } from "@typings/ui/layout.types";
import {
  useShopAdministratorsListLinkData,
  useShopAdministratorsCreateLinkData,
  useShopAdministratorsEditLinkData,
} from "./useShopAdminData";
import { ShopAdminNavLinks } from "../../config/Links";

const dataHooksByUrl: Record<string, () => LinkDataResult> = {
  "/shop-administrators-list": useShopAdministratorsListLinkData,
  "/shop-administrators-create": useShopAdministratorsCreateLinkData,
  "/shop-administrators-edit": useShopAdministratorsEditLinkData,
};

export const useShopAdminLinks = (): OptionLink[] =>
  ShopAdminNavLinks.map((link) => ({
    ...link,
    useData: dataHooksByUrl[link.url],
  }));