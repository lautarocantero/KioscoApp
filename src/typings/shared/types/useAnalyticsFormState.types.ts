import type { Dayjs } from "dayjs";
import type { ReactNode } from "react";

export interface AnalyticsFiltersInterface {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    sellerId: string;
}

export interface UseAnalyticsParams {
    onApplyFilters?: (filters: AnalyticsFiltersInterface) => void;
}
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

export interface StockEvolutionPoint {
    date: string;
    stock: number;
}

export interface PresentationAnalyticsData {
    title: string;
    subtitle: string;
    dateRangeLabel: string;
    kpis: AnalyticsKpi[];
    dailySales: DailySalesPoint[];
    stockEvolution: StockEvolutionPoint[];
    topSellingDays: TopSellingDay[];
    periodSummary: PeriodSummaryItem[];
}