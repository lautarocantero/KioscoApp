import type { SelectChangeEvent } from "@mui/material";
import type {
    CurrentAccountSummary,
    DailySalePoint,
    DailySalesSummary,
    HourlyBucket,
    HourlySummary,
    MonthlyReportSummary,
    PaymentMethodBreakdown,
    SellerReportRow,
    SellersNote,
    StockAlerts,
} from "./stadisticsTypes";
import type { ReportCompareWith } from "./stadisticsEnums";

export type MonthOption = {
    value: string;
    label: string;
};

export type CompareDisabledReason = "plan" | "admin" | null;

export type CompareAvailability = {
    canCompare: boolean;
    disabledReason: CompareDisabledReason;
};

export interface ShopMonthlyReportVariationChipProps {
    isPositive: boolean;
    label: string;
}

export interface ShopMonthlyReportHeaderProps {
    kioscoName: string;
    monthLabel: string;
    comparisonLabel: string | null;
    daysInMonth: number | null;
    monthOptions: MonthOption[];
    selectedMonth: string;
    onMonthChange: (event: SelectChangeEvent) => void;
    canChangeMonth: boolean;
    compareWith: ReportCompareWith;
    onCompareChange: (event: SelectChangeEvent) => void;
    canCompare: boolean;
    compareDisabledReason: CompareDisabledReason;
    onDownloadPdf: () => void;
    isDownloadDisabled: boolean;
    isLoading: boolean;
}

export interface ShopMonthlyReportKpiRowProps {
    summary: MonthlyReportSummary | null;
    compareWith: ReportCompareWith;
    comparisonMonthLabel: string | null;
    isLoading: boolean;
    error: string | null;
}

export interface ShopMonthlyReportDailyChartProps {
    dailySales: DailySalePoint[];
    dailySalesSummary: DailySalesSummary | null;
    isLoading: boolean;
    error: string | null;
}

export interface ShopMonthlyReportSellersProps {
    sellers: SellerReportRow[];
    sellersNote: SellersNote | null;
    canViewAmounts: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface ShopMonthlyReportPaymentMethodsProps {
    paymentMethods: PaymentMethodBreakdown[];
    isLoading: boolean;
    error: string | null;
}

export interface ShopMonthlyReportHourlyProps {
    hourlyBuckets: HourlyBucket[];
    hourlySummary: HourlySummary | null;
    isLoading: boolean;
    error: string | null;
}

export interface ShopMonthlyReportStockAlertsProps {
    stockAlerts: StockAlerts | null;
    isLoading: boolean;
    error: string | null;
}

export interface ShopMonthlyReportCurrentAccountProps {
    currentAccount: CurrentAccountSummary | null;
    isLoading: boolean;
    error: string | null;
}

export interface ShopMonthlyReportFooterProps {
    kioscoName: string;
    generatedAt: string | null;
}
