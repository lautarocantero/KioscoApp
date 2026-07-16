import type { SelectChangeEvent } from "@mui/material";
import type { Presentation } from "@typings/presentation/presentationTypes";
import type {
    AnalyticsData,
    AnalyticsFiltersInterface,
    AnalyticsKpi,
    DailySalesPoint,
    PeriodSummaryItem,
    StockEvolutionPoint,
    TopSellingDay,
} from "@typings/shared/types/useAnalytics.types";

export interface AnalyticsHeaderProps {
    title: string;
    subtitle: string;
}

export interface KpiCardProps {
    kpi: AnalyticsKpi;
}

export interface PeriodSummaryCardProps {
    items: PeriodSummaryItem[];
}

export interface TopSellingDaysCardProps {
    days: TopSellingDay[];
}

export interface AnalyticsChartsProps {
    dailySales: AnalyticsData["dailySales"];
    stockEvolution: StockEvolutionPoint[];
}

export interface AnalyticsSummaryCardsProps {
    topSellingDays: AnalyticsData["topSellingDays"];
    periodSummary: AnalyticsData["periodSummary"];
}

/** El body compone charts + summary cards, así que hereda sus props en vez de repetirlas. */
export type AnalyticsBodyProps = AnalyticsChartsProps & AnalyticsSummaryCardsProps;

export interface AnalyticsKpisProps {
    kpis: AnalyticsData["kpis"];
}

export interface FilterGroupProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}

export interface AnalyticsFiltersProps {
    presentations: Presentation[] | undefined;
    onPresentationChange: ((presentationId: string) => void) | undefined;
    selectedPresentationId: string | undefined;
    isPresentationSelectorDisabled: boolean | undefined;
    onApplyFilters: ((filters: AnalyticsFiltersInterface) => void) | undefined;
    hidePresentationFilter: boolean;
}

/** El filtro de presentación es un subconjunto de AnalyticsFiltersProps, no de PresentationAnalyticsProps directamente. */
export type PresentationFilterProps = Pick<AnalyticsFiltersProps,"presentations" | "onPresentationChange" | "selectedPresentationId" | "isPresentationSelectorDisabled"> & {
    label: string;
    hidePresentationFilter: boolean;
};

export interface SellerFilterProps {
    label: string;
    sellerId: string;
    onChange: (e: SelectChangeEvent) => void;
}

export interface AnalyticsFiltersButtonsProps {
    onApply: () => void;
    onClear: () => void;
    areFiltersActive: boolean;
}

export interface DailySalesBarChartProps {
    data: DailySalesPoint[];
    granularityOptions?: string[];
    defaultGranularity?: string;
    onGranularityChange?: (value: string) => void;
    startDate?: string;
    endDate?: string;
}

export interface StockEvolutionChartProps {
    data: StockEvolutionPoint[];
    isLoading?: boolean;
}