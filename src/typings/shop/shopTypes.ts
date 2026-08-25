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
  canChangeRange: boolean;
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

// Fila de la boleta de reposición (PDF): una presentación por debajo de su
// stock mínimo, con la cantidad a comprar para llegar justo al mínimo.
// provider1/provider2 quedan vacíos hasta que se incorporen proveedores
// por presentación.
export interface RestockReportRow {
  productName: string;
  presentationName: string;
  currentStock: number;
  minStock: number;
  minRestock: number;
  provider1: string;
  provider2: string;
}

export interface UseShopRestockReportReturn {
  rows: RestockReportRow[];
  isLoading: boolean;
  error: string | null;
  isDownloadDisabled: boolean;
  handleDownload: () => void;
}
