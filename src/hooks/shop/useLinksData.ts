// hooks/shop/useLinksData.ts
import type { LinkDataResult, OptionLink } from "@typings/ui/layout.types";
import {
  useShopAdministratorsLinkData,
  useShopSellersLinkData,
  useShopStatisticsLinkData,
} from "./useShopLinksData";
import { ShopNavLinks } from "../../config/Links";

const dataHooksByUrl: Record<string, () => LinkDataResult> = {
  "/shop-administrators": useShopAdministratorsLinkData,
  "/shop-sellers": useShopSellersLinkData,
  "/shop-stadistics": useShopStatisticsLinkData,
};

export const useShopLinks = (): OptionLink[] =>
  ShopNavLinks.map((link) => ({
    ...link,
    useData: dataHooksByUrl[link.url],
  }));