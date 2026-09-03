import type { SellerStatus } from "@typings/seller/sellerEnums";
import type { SellsPartialsAlertSummary, SellsPeakHourFact, SellsPeriodKpis } from "@typings/sells/types";
import type { StockSeverity } from "./shopEnums";

export interface UseShopGreetingReturn {
  greeting: string;
  isLoading: boolean;
}

export interface DailySalesPoint {
  date: string;
  label: string;
  total: number;
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
  // Conteo real por severidad sobre TODAS las presentaciones bajo mínimo,
  // no solo las `VISIBLE_LOW_STOCK_LIMIT` que trae `lowStock` — así el
  // panel de atención de /shop no subestima "sin stock" cuando hay más de
  // 20 presentaciones críticas.
  criticalCount: number;
  lowCount: number;
  isLoading: boolean;
  error: string | null;
}

export interface HourlySalesPoint {
  hour: number;
  label: string;
  total: number;
}

export interface TopProductSummary {
  productId: string;
  name: string;
  quantity: number;
  amount: number;
}

export interface ActiveSellerSummary {
  sellerId: string;
  sellerName: string;
  status: SellerStatus;
  totalAmount: number;
  ordersCount: number;
}

// Resumen del día para /shop: KPIs de hoy vs ayer (mismo cálculo real que
// la banda de contexto de /sells, ver useSellsContextBand), fiados sin
// saldar, hora pico, ventas por hora, más vendidos y vendedores activos —
// todo derivado client-side de `useSellsListData`/`useSellersListData`,
// sin fetch propio.
export interface UseShopDailySummaryReturn {
  kpis: SellsPeriodKpis;
  partialsAlert: SellsPartialsAlertSummary;
  peakHour: SellsPeakHourFact;
  hourly: HourlySalesPoint[];
  topProducts: TopProductSummary[];
  activeSellers: ActiveSellerSummary[];
  hasSellsToday: boolean;
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
