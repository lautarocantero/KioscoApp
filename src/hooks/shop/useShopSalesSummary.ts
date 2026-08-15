import { useMemo } from "react";
import type { UseShopSalesSummaryReturn } from "@typings/shop/shopTypes";
import { useSellsListData } from "../sells/useSellsListData";
import useSellersListData from "../sellers/useSellerListData";
import { aggregateSellsByDay } from "../../modules/shop/helpers/aggregateSellsByDay";
import { aggregateTopSellers } from "../../modules/shop/helpers/aggregateTopSellers";

const CHART_DAYS = 7;
const TOP_SELLERS_LIMIT = 5;

// Combina el listado real de ventas (`useSellsListData`) y de vendedores
// (`useSellersListData`, ya trae online/offline) para armar el gráfico de
// los últimos 7 días y el ranking de vendedores del mes — todo derivado de
// datos reales, sin ningún endpoint agregado de por medio.
export const useShopSalesSummary = (): UseShopSalesSummaryReturn => {
    const { sells, loading: sellsLoading, error: sellsError } = useSellsListData();
    const { sellers, loading: sellersLoading, error: sellersError } = useSellersListData();

    const dailySales = useMemo(() => aggregateSellsByDay(sells, CHART_DAYS), [sells]);
    const weekTotal = useMemo(() => dailySales.reduce((sum, point) => sum + point.total, 0), [dailySales]);
    const topSellers = useMemo(
        () => aggregateTopSellers(sells, sellers, TOP_SELLERS_LIMIT),
        [sells, sellers]
    );

    return {
        dailySales,
        weekTotal,
        topSellers,
        isLoading: sellsLoading || sellersLoading,
        error: sellsError ?? sellersError,
    };
};
