import type { SelectChangeEvent } from "@mui/material";
import type { Presentation } from "@typings/presentation/presentationTypes";
import type { PresentationAnalyticsProps } from "@typings/product/productComponentTypes";
import type { AnalyticsFiltersInterface } from "@typings/shared/types/useAnalyticsFormState.types";
import type { ReactNode } from "react";

//─── 📦 Datos crudos (raw) ───────────────────────────────────
export interface AnalyticsTotals {
    units: number;
    revenue: number;
    activeDays: number;
    avgTicket: number;
}

export interface AnalyticsDeltas {
    unitsPct?: number;
    revenuePct?: number;
    activeDaysPct?: number;
    avgTicketPct?: number;
}

/** Punto genérico de unidades por fecha. Usado tanto para ventas diarias como para "top selling days". */
export interface DayUnitsPoint {
    date: string;
    units: number;
}

export interface WeekUnitsPoint {
    weekLabel: string;
    units: number;
}

export interface PeriodSummaryRaw {
    maxDaily?: DayUnitsPoint;
    minDaily?: DayUnitsPoint;
    avgDailyUnits: number;
    activeDaysCount: number;
}

export interface DateRange {
    start: string;
    end: string;
}

export interface PresentationAnalyticsRaw {
    totals: AnalyticsTotals;
    deltas: AnalyticsDeltas;
    dailySales: DayUnitsPoint[];
    weeklySales: WeekUnitsPoint[];
    topSellingDays: DayUnitsPoint[];
    periodSummary: PeriodSummaryRaw;
    range: DateRange;
}

//─── 🎨 Datos ya formateados para presentación ───────────────
export interface IconWithColor {
    icon: ReactNode;
    iconColor: string;
}

export interface AnalyticsKpi extends IconWithColor {
    id: string;
    label: string;
    value: string;
    deltaPct: number;
    comparisonLabel: string;
}

export interface PeriodSummaryItem extends IconWithColor {
    label: string;
    value: string;
    subValue?: string;
}

/** Alias explícitos: mismo shape que los raw points, pero ya procesados para UI. */
export type DailySalesPoint = DayUnitsPoint;
export type WeeklySalesPoint = WeekUnitsPoint;
export type TopSellingDay = DayUnitsPoint;

export interface PresentationAnalyticsData {
    title: string;
    subtitle: string;
    dateRangeLabel: string;
    kpis: AnalyticsKpi[];
    dailySales: DailySalesPoint[];
    weeklySales: WeeklySalesPoint[];
    topSellingDays: TopSellingDay[];
    periodSummary: PeriodSummaryItem[];
}

//─── 🧩 Props de componentes ──────────────────────────────────
type AnalyticsData = PresentationAnalyticsProps["data"];

export interface AnalyticsHeaderProps {
    title: string;
    subtitle: string;
}

export interface AnalyticsChartsProps {
    dailySales: AnalyticsData["dailySales"];
    weeklySales: AnalyticsData["weeklySales"];
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

export interface AnalyticsFiltersProps {
    presentations: Presentation[] | undefined;
    onPresentationChange: ((presentationId: string) => void) | undefined;
    selectedPresentationId: string | undefined;
    isPresentationSelectorDisabled: boolean | undefined;
    onApplyFilters: ((filters: AnalyticsFiltersInterface) => void) | undefined;
}

/** El filtro de presentación es un subconjunto de AnalyticsFiltersProps, no de PresentationAnalyticsProps directamente. */
export type PresentationFilterProps = Pick<AnalyticsFiltersProps, "presentations" | "onPresentationChange" | "selectedPresentationId" | "isPresentationSelectorDisabled"> & {
    label: string;
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