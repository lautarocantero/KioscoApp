import type { OptionLink } from "@typings/ui/layout.types";
import type {
  LowStockPresentationSummary,
  UseShopFeaturedProvidersReturn,
  UseShopInventorySummaryReturn,
  UseShopLowStockPresentationsReturn,
  UseShopRestockReportReturn,
  UseShopSalesSummaryReturn,
} from "./shopTypes";

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

export type ShopSalesChartProps = Pick<UseShopSalesSummaryReturn, "dailySales" | "periodTotal" | "range" | "setRange" | "isLoading" | "error">;

export type ShopTopSellersProps = Pick<UseShopSalesSummaryReturn, "topSellers" | "isLoading" | "error">;

export type ShopTopProvidersProps = UseShopFeaturedProvidersReturn;

export interface ShopInventoryPanelProps extends UseShopInventorySummaryReturn {
  lowStockItems: LowStockPresentationSummary[];
  lowStockItemsTotal: number;
  isLoadingLowStockItems: boolean;
  lowStockItemsError: string | null;
  restockReport: Pick<UseShopRestockReportReturn, "isDownloadDisabled" | "handleDownload">;
}

export type ShopLowStockListProps = UseShopLowStockPresentationsReturn;
