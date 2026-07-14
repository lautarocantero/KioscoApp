import type { Dayjs } from "dayjs";
import type { ReactNode } from "react";
import type { PresentationAnalyticsProps } from "@typings/product/productComponentTypes";
import type { Theme } from "@mui/material";

export interface UsePresentationAnalyticsOptions {
    title?: string;
    subtitle?: string;
    currentStock?: number;
}

export interface AnalyticsFiltersInterface {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    sellerId: string;
}

export interface UseAnalyticsParams {
    onApplyFilters?: (filters: AnalyticsFiltersInterface) => void;
}

interface AnalyticsTotals {
    units: number;
    revenue: number;
    activeDays: number;
    avgTicket: number;
}

interface AnalyticsDeltas {
    unitsPct?: number;
    revenuePct?: number;
    activeDaysPct?: number;
    avgTicketPct?: number;
}

/** Punto genérico de unidades por fecha. Usado tanto para ventas diarias como para "top selling days". */
interface DayUnitsPoint {
    date: string;
    units: number;
}

interface WeekUnitsPoint {
    weekLabel: string;
    units: number;
}

interface PeriodSummaryRaw {
    maxDaily?: DayUnitsPoint;
    minDaily?: DayUnitsPoint;
    avgDailyUnits: number;
    activeDaysCount: number;
}

interface DateRange {
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
interface IconWithColor {
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
export type TopSellingDay = DayUnitsPoint;

export interface StockEvolutionPoint {
    date: string;
    stock: number;
}

/** Dato ya mapeado, consumido por PresentationAnalytics. También es la base de AnalyticsData (usado para construir props). */
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

//─── 🧮 Tipos internos de cálculo (mapper/helpers) ───────────

export interface MapPresentationAnalyticsParams {
    raw: PresentationAnalyticsRaw;
    title: string;
    subtitle: string;
    currentStock: number;
    theme: Theme;
}

export interface DailyBucket {
    date: string;
    units: number;
    revenue: number;
}

export interface RangeResult {
    dailyBuckets: DailyBucket[];
    totalUnits: number;
    totalRevenue: number;
    activeDays: number;
}

//─── 🔗 Alias derivado, usado para construir props en analytics.types.ts ───
export type AnalyticsData = PresentationAnalyticsProps["data"];