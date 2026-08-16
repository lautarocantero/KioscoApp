import type { OptionLink } from "@typings/ui/layout.types";
import type { UseShopFeaturedProvidersReturn, UseShopInventorySummaryReturn, UseShopSalesSummaryReturn } from "./shopTypes";

export interface ShopHeaderProps {
  greeting: string;
}

export interface ShopInitialAvatarProps {
  name: string;
  color: string;
}

export interface ShopStatsRowProps {
  links: OptionLink[];
}

export type ShopSalesChartProps = Pick<UseShopSalesSummaryReturn, "dailySales" | "weekTotal" | "isLoading" | "error">;

export type ShopTopSellersProps = Pick<UseShopSalesSummaryReturn, "topSellers" | "isLoading" | "error">;

export type ShopTopProvidersProps = UseShopFeaturedProvidersReturn;

export type ShopInventoryPanelProps = UseShopInventorySummaryReturn;
