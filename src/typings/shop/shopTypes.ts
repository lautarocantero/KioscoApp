import type { Provider } from "@typings/provider/providerTypes";
import type { SellerStatus } from "@typings/seller/sellerEnums";
import type { ShopSalesRange, StockSeverity } from "./shopEnums";

export interface UseShopGreetingReturn {
  greeting: string;
  isLoading: boolean;
}

export interface DailySalesPoint {
  date: string;
  label: string;
  total: number;
}

export interface TopSellerSummary {
  sellerId: string;
  sellerName: string;
  totalAmount: number;
  ordersCount: number;
  status: SellerStatus;
}

export interface UseShopSalesSummaryReturn {
  dailySales: DailySalesPoint[];
  periodTotal: number;
  range: ShopSalesRange;
  setRange: (range: ShopSalesRange) => void;
  topSellers: TopSellerSummary[];
  isLoading: boolean;
  error: string | null;
}

export interface UseShopFeaturedProvidersReturn {
  featured: Provider[];
  total: number;
  isLoading: boolean;
  error: string | null;
}

export interface UseShopInventorySummaryReturn {
  total: number | null;
  withStock: number | null;
  lowStock: number | null;
  withoutStock: number | null;
  isLoading: boolean;
  error: string | null;
}

export interface LowStockPresentationSummary {
  presentationId: string;
  name: string;
  stock: number;
  minStock: number;
  severity: StockSeverity;
  ratio: number;
}

export interface UseShopLowStockPresentationsReturn {
  lowStock: LowStockPresentationSummary[];
  total: number;
  isLoading: boolean;
  error: string | null;
}
