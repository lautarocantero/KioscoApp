// mappers/presentationAnalytics.helpers.ts
import type { DailySalesPoint, StockEvolutionPoint } from "@typings/shared/types/useAnalytics.types";

export const formatDayLabel = (isoDate: string | undefined | null): string => {
    if (!isoDate) return "—";
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("es-AR", { day: "2-digit", month: "short" }).replace(".", "");
};

export const formatRangeLabel = (start: string | Date | undefined | null, end: string | Date | undefined | null): string => {
    if (!start || !end) return "—";
    const startDate = start instanceof Date ? start : new Date(start);
    const endDate = end instanceof Date ? end : new Date(end);
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return "—";

    const fmt = (d: Date) => d.toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
    return `${fmt(startDate)} - ${fmt(endDate)}`;
};

/**
 * Reconstruye la evolución de stock hacia atrás a partir del stock actual
 * y las unidades vendidas por día.
 * ⚠️ Aproximación: asume que `currentStock` corresponde al final del rango
 * y que no hubo reposiciones/ajustes manuales de stock en el período.
 * Si hubo, esta curva se desvía de la realidad — para el dato exacto haría
 * falta un ledger de movimientos de stock en el backend.
 */
export const buildStockEvolution = (dailySales: DailySalesPoint[], currentStock: number): StockEvolutionPoint[] => {
    let runningStock = currentStock;

    return [...dailySales]
        .reverse()
        .map((b) => {
            const point: StockEvolutionPoint = { date: formatDayLabel(b.date), stock: runningStock };
            runningStock += b.units; // stock que había ANTES de las ventas de ese día
            return point;
        })
        .reverse();
};

export const getChartTitle = (startDate?: string, endDate?: string): string => {
    if (!startDate || !endDate) return "Unidades vendidas";
    return `Unidades vendidas entre ${startDate} y ${endDate}`;
};

export const currencyFmt = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
});
