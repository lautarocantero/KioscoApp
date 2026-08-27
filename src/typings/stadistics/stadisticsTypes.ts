// Espejo de MonthlySalesReportType en el back (@typings/sell): totales de
// ventas del mes en curso. Para el plan Standard es el único reporte
// disponible (el historial de ventas también queda acotado al mes en
// curso, ver PlanService.getSellsDateFloor en el backend); para Deluxe es
// un resumen rápido además del historial completo sin restricción.
export type MonthlySalesReport = {
    month: string;
    totalSales: number;
    totalRevenue: number;
    averageTicket: number;
};

export interface UseShopMonthlyReportReturn {
    report: MonthlySalesReport | null;
    isLoading: boolean;
    error: string | null;
}

//──────────────────────────────────────────── 📊 REPORTE MENSUAL DETALLADO ───────────────────────────────────────────//
// Espejo de MonthlyReportDetailType en el back (@typings/sell,
// MonthlyReportService.getDetail): todo calculado server-side a partir de
// Sell + Presentation para el mes pedido, con comparación opcional.

export type DailySalePoint = {
    isoDate: string;
    label: string;
    amount: number;
    isBest: boolean;
};

export type PaymentMethodBreakdown = {
    method: string;
    amount: number;
    percentage: number;
};

export type SellerReportRow = {
    sellerId: string;
    sellerName: string;
    amount: number;
    ticketsCount: number;
    participationPct: number;
    changePct: number | null;
    isNew: boolean;
    maxTicketAmount: number;
};

export type HourlyBucket = {
    label: string;
    amount: number;
    isPeak: boolean;
    isLow: boolean;
};

export type DeadStockItem = {
    name: string;
    days: number;
};

export type StockAlerts = {
    outOfStockCount: number;
    outOfStockSoldInComparisonCount: number;
    estimatedLostRevenue: number;
    deadStockCount: number;
    deadStockValue: number;
    oldestDeadStock: DeadStockItem | null;
};

export type CurrentAccountSummary = {
    debtorsCount: number;
    totalDebt: number;
    collectedThisMonth: number;
    newDebtThisMonth: number;
    paymentsCount: number;
};

export type MonthlyReportMeta = {
    availableMonths: string[];
    canCompare: boolean;
    daysInMonth: number;
    generatedAt: string;
};

export type MonthlyReportSummary = {
    totalSales: number;
    totalRevenue: number;
    averageTicket: number;
    ticketsPerDay: number;
    previous: Pick<MonthlyReportSummary, "totalSales" | "totalRevenue" | "averageTicket"> | null;
};

export type BestWeek = {
    label: string;
    amount: number;
};

export type DailySalesSummary = {
    avgPerDay: number;
    closedDays: number;
    bestDay: DailySalePoint | null;
    worstDay: DailySalePoint | null;
    bestWeek: BestWeek | null;
};

export type SellersNote = {
    sellerName: string;
    maxTicketAmount: number;
};

export type HourlySummary = {
    peakLabel: string | null;
    lowLabel: string | null;
};

export type MonthlyReportDetail = {
    month: string;
    comparisonMonth: string | null;
    meta: MonthlyReportMeta;
    summary: MonthlyReportSummary;
    dailySales: DailySalePoint[];
    dailySalesSummary: DailySalesSummary;
    paymentMethods: PaymentMethodBreakdown[];
    sellers: SellerReportRow[];
    sellersNote: SellersNote | null;
    hourlyBuckets: HourlyBucket[];
    hourlySummary: HourlySummary;
    stockAlerts: StockAlerts;
    currentAccount: CurrentAccountSummary;
};

export interface UseShopMonthlyReportDetailReturn {
    report: MonthlyReportDetail | null;
    isLoading: boolean;
    error: string | null;
}

export interface UseShopMonthlyReportPdfReturn {
    isDownloadDisabled: boolean;
    handleDownload: () => void;
}
