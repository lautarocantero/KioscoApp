import { useMemo } from "react";
import type { UseShopDailySummaryReturn } from "@typings/shop/shopTypes";
import { SellsPeriodEnum } from "@typings/sells/enums";
import { useSellsListData } from "../sells/useSellsListData";
import useSellersListData from "../sellers/useSellerListData";
import { buildSellsPeriodRange } from "../../modules/sells/helpers/buildSellsPeriodRange";
import { filterSellsByPeriodRange } from "../../modules/sells/helpers/filterSellsByPeriodRange";
import { aggregateSellsPeriodKpis } from "../../modules/sells/helpers/aggregateSellsPeriodKpis";
import { aggregateSellsPeakHour } from "../../modules/sells/helpers/aggregateSellsPeakHour";
import { aggregateSellsPartialsAlert } from "../../modules/sells/helpers/aggregateSellsPartialsAlert";
import { aggregateSellsByHour } from "../../modules/shop/helpers/aggregateSellsByHour";
import { aggregateTopProductsToday } from "../../modules/shop/helpers/aggregateTopProductsToday";
import { aggregateActiveSellersToday } from "../../modules/shop/helpers/aggregateActiveSellersToday";

// Resumen del día de /shop: reusa las mismas ventas ya traídas por
// useSellsListData (misma fuente que useSellsContextBand en /sells) y las
// mismas piezas puras de esa banda (buildSellsPeriodRange/
// aggregateSellsPeriodKpis/aggregateSellsPeakHour/aggregateSellsPartialsAlert)
// fijadas en SellsPeriodEnum.Today — acá el período no es elegible por el
// usuario, así que no hace falta el resto del estado de esa banda
// (selector, disponibilidad por plan). Suma agregaciones propias de /shop
// (por hora, más vendidos, vendedores activos) sobre las mismas ventas de
// hoy ya filtradas.
export const useShopDailySummary = (): UseShopDailySummaryReturn => {
    const { sells, loading: sellsLoading, error: sellsError } = useSellsListData();
    const { sellers, loading: sellersLoading, error: sellersError } = useSellersListData();

    const now = useMemo(() => new Date(), []);
    const periodRange = useMemo(() => buildSellsPeriodRange(SellsPeriodEnum.Today, now), [now]);

    const todaySells = useMemo(
        () => filterSellsByPeriodRange(sells, periodRange.from, periodRange.to),
        [sells, periodRange]
    );

    const kpis = useMemo(() => aggregateSellsPeriodKpis(sells, periodRange), [sells, periodRange]);
    const peakHour = useMemo(() => aggregateSellsPeakHour(todaySells), [todaySells]);
    const partialsAlert = useMemo(() => aggregateSellsPartialsAlert(sells, now), [sells, now]);
    const hourly = useMemo(() => aggregateSellsByHour(todaySells, now), [todaySells, now]);
    const topProducts = useMemo(() => aggregateTopProductsToday(todaySells), [todaySells]);
    const activeSellers = useMemo(
        () => aggregateActiveSellersToday(todaySells, sellers),
        [todaySells, sellers]
    );

    return {
        kpis,
        partialsAlert,
        peakHour,
        hourly,
        topProducts,
        activeSellers,
        hasSellsToday: todaySells.length > 0,
        isLoading: sellsLoading || sellersLoading,
        error: sellsError ?? sellersError,
    };
};
