import type { SellTicketType } from "@typings/sells/sellTypes";

// Filtro de fechas puro y reutilizado tanto por aggregateSellsPeriodKpis
// (rango actual + rango de comparación) como por el hook de la banda para
// los "hechos" (medio dominante, hora pico, vendedor) del período elegido.
export const filterSellsByPeriodRange = (sells: SellTicketType[], from: Date, to: Date): SellTicketType[] =>
    sells.filter((sell) => {
        const purchaseTime = new Date(sell.purchase_date).getTime();
        return purchaseTime >= from.getTime() && purchaseTime <= to.getTime();
    });
