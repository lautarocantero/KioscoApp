import type { SellTicketType } from "@typings/sells/sellTypes";
import type { SellsPeriodKpi, SellsPeriodKpis, SellsPeriodRange } from "@typings/sells/types";
import { filterSellsByPeriodRange } from "./filterSellsByPeriodRange";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const sumTotalAmount = (sells: SellTicketType[]): number => sells.reduce((sum, sell) => sum + sell.total_amount, 0);

const sumProductUnits = (sells: SellTicketType[]): number =>
    sells.reduce((sum, sell) => sum + sell.products.reduce((productSum, product) => productSum + product.stock_required, 0), 0);

const buildKpi = (value: number, previousValue: number): SellsPeriodKpi => {
    if (previousValue === 0) {
        const variationPct = value === 0 ? 0 : null;
        return { value, previousValue, variationPct, trend: value > 0 ? "up" : "flat" };
    }

    const variationPct = ((value - previousValue) / previousValue) * 100;
    if (variationPct === 0) return { value, previousValue, variationPct, trend: "flat" };
    return { value, previousValue, variationPct, trend: variationPct > 0 ? "up" : "down" };
};

// KPIs del período elegido (ventas, tickets, ticket promedio) más su
// variación contra el período de comparación inmediatamente anterior.
// "A cobrar" no vive acá — ver aggregateSellsPartialsAlert: es un estado
// vigente del negocio, no un dato acotado al período.
export const aggregateSellsPeriodKpis = (sells: SellTicketType[], range: SellsPeriodRange): SellsPeriodKpis => {
    const currentSells = filterSellsByPeriodRange(sells, range.from, range.to);
    const previousSells = filterSellsByPeriodRange(sells, range.compareFrom, range.compareTo);

    const sales = sumTotalAmount(currentSells);
    const previousSales = sumTotalAmount(previousSells);
    const ticketsCount = currentSells.length;
    const previousTicketsCount = previousSells.length;
    const averageTicket = ticketsCount > 0 ? sales / ticketsCount : 0;
    const previousAverageTicket = previousTicketsCount > 0 ? previousSales / previousTicketsCount : 0;

    const periodDays = Math.max(1, Math.round((range.to.getTime() - range.from.getTime()) / MS_PER_DAY) + 1);
    const productUnits = sumProductUnits(currentSells);

    return {
        sales: buildKpi(sales, previousSales),
        ticketsCount: buildKpi(ticketsCount, previousTicketsCount),
        averageTicket: buildKpi(averageTicket, previousAverageTicket),
        ticketsPerDay: ticketsCount / periodDays,
        productsPerTicket: ticketsCount > 0 ? productUnits / ticketsCount : 0,
    };
};
