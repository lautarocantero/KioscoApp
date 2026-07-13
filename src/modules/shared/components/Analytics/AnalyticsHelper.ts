// mappers/presentationAnalytics.helpers.ts
import type { DailyBucket, RangeResult, StockEvolutionPoint } from "@typings/shared/types/useAnalytics.types";

export const formatDayLabel = (isoDate: string): string => {
    const d = new Date(isoDate);
    return d.toLocaleDateString("es-AR", { day: "2-digit", month: "short" }).replace(".", "");
};

export const formatRangeLabel = (from: Date, to: Date): string => {
    const fmt = (d: Date) => d.toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
    return `${fmt(from)} - ${fmt(to)}`;
};

export const deltaPct = (current: number, previous: number): number => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 1000) / 10;
};

/**
 * Reconstruye la evolución de stock hacia atrás a partir del stock actual
 * y las unidades vendidas por día.
 * ⚠️ Aproximación: asume que `currentStock` corresponde al final del rango
 * (`to`) y que no hubo reposiciones/ajustes manuales de stock en el período.
 * Si hubo, esta curva se desvía de la realidad — para el dato exacto haría
 * falta un ledger de movimientos de stock en el backend.
 */
export const buildStockEvolution = (dailyBuckets: DailyBucket[], currentStock: number): StockEvolutionPoint[] => {
    let runningStock = currentStock;

    return [...dailyBuckets]
        .reverse()
        .map((b) => {
            const point: StockEvolutionPoint = { date: formatDayLabel(b.date), stock: runningStock };
            runningStock += b.units; // stock que había ANTES de las ventas de ese día
            return point;
        })
        .reverse();
};

export const getTopSellingDays = (dailyBuckets: DailyBucket[], limit = 5) =>
    [...dailyBuckets]
        .sort((a, b) => b.units - a.units)
        .slice(0, limit)
        .map((b) => ({ date: formatDayLabel(b.date), units: b.units }));

export interface PeriodStats {
    maxDay: DailyBucket | null;
    minDay: DailyBucket | null;
    avgUnits: number;
}

export const getPeriodStats = (dailyBuckets: DailyBucket[]): PeriodStats => {
    const unitsPerDay = dailyBuckets.filter((b) => b.units > 0);
    const maxDay = unitsPerDay.length ? unitsPerDay.reduce((a, b) => (b.units > a.units ? b : a)) : null;
    const minDay = unitsPerDay.length ? unitsPerDay.reduce((a, b) => (b.units < a.units ? b : a)) : null;
    const avgUnits = unitsPerDay.length
        ? Math.round(unitsPerDay.reduce((sum, b) => sum + b.units, 0) / unitsPerDay.length)
        : 0;

    return { maxDay, minDay, avgUnits };
};

export const getAvgTicket = (result: RangeResult): number =>
    result.totalUnits > 0 ? result.totalRevenue / result.totalUnits : 0;

export const getChartTitle = (startDate?: string, endDate?: string): string => {
    if (!startDate || !endDate) return "Unidades vendidas";
    return `Unidades vendidas entre ${startDate} y ${endDate}`;
};