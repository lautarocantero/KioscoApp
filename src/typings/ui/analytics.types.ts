import type { ReactNode } from "react";

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

export interface DailySalesRaw {
    date: string;
    units: number;
}

export interface WeeklySalesRaw {
    weekLabel: string;
    units: number;
}

export interface TopSellingDayRaw {
    date: string;
    units: number;
}

export interface DayUnitsPoint {
    date: string;
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
    dailySales: DailySalesRaw[];
    weeklySales: WeeklySalesRaw[];
    topSellingDays: TopSellingDayRaw[];
    periodSummary: PeriodSummaryRaw;
    range: DateRange;
}

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

export interface DailySalesPoint {
    date: string;
    units: number;
}

export interface WeeklySalesPoint {
    weekLabel: string;
    units: number;
}

export interface TopSellingDay {
    date: string;
    units: number;
}

export interface PeriodSummaryItem extends IconWithColor {
    label: string;
    value: string;
    subValue?: string;
}

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
