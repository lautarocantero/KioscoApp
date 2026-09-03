import type { SellsPartialsAlertSummary } from "@typings/sells/types";
import type {
  ActiveSellerSummary,
  TopProductSummary,
  UseShopDailySummaryReturn,
} from "./shopTypes";

export interface ShopHeaderProps {
  greeting: string;
  kioscoName: string;
  onChangeKiosco: () => void;
}

export interface ShopInitialAvatarProps {
  name: string;
  color: string;
}

export type ShopDailyHeroCardProps = Pick<UseShopDailySummaryReturn, "kpis" | "partialsAlert" | "hourly" | "peakHour" | "hasSellsToday" | "isLoading" | "error">;

export interface ShopMascotPanelProps {
  kioscoName: string;
  greeting: string;
  isAdmin: boolean;
  kpis: UseShopDailySummaryReturn["kpis"];
  hasSellsToday: boolean;
  criticalStockCount: number;
  partialsAlert: SellsPartialsAlertSummary;
  onNewSale: () => void;
  onEnterStock: () => void;
  onViewStatistics: () => void;
}

export interface ShopTopProductsTodayProps {
  topProducts: TopProductSummary[];
  isLoading: boolean;
  error: string | null;
}

export interface ShopAttentionPanelProps {
  criticalStockCount: number;
  lowStockCount: number;
  partialsAlert: SellsPartialsAlertSummary;
  isLoading: boolean;
  error: string | null;
  isRestockDownloadDisabled: boolean;
  onRestockDownload: () => void;
}

export interface ShopActiveSellersProps {
  activeSellers: ActiveSellerSummary[];
  isLoading: boolean;
  error: string | null;
}
