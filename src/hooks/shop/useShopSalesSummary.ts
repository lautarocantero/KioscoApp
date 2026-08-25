import { useMemo, useState } from "react";
import type { UseShopSalesSummaryReturn } from "@typings/shop/shopTypes";
import { ShopSalesRange } from "@typings/shop/shopEnums";
import { SHOP_SALES_RANGE_DAYS } from "../../config/constants";
import { useSellsListData } from "../sells/useSellsListData";
import useSellersListData from "../sellers/useSellerListData";
import { aggregateSellsByDay } from "../../modules/shop/helpers/aggregateSellsByDay";
import { aggregateTopSellers } from "../../modules/shop/helpers/aggregateTopSellers";
import { useIsActiveKioscoAdmin } from "../kiosco/useIsActiveKioscoAdmin";

const TOP_SELLERS_LIMIT = 5;

// Combina el listado real de ventas (`useSellsListData`) y de vendedores
// (`useSellersListData`, ya trae online/offline) para armar el gráfico de
// ventas (rango seleccionable: 7/15/30 días, agregado client-side sobre
// el mismo listado ya traído — no dispara un fetch nuevo por rango) y el
// ranking de vendedores del mes — todo derivado de datos reales.
//
// Cambiar el rango es exclusivo de admin: un seller siempre ve el rango
// por defecto (7 días). `canChangeRange` habilita el control en la UI y
// `setRange` queda como no-op para no-admins como segunda barrera (por si
// algo intenta setear el rango sin pasar por el Select disabled).
export const useShopSalesSummary = (): UseShopSalesSummaryReturn => {
    const isAdmin = useIsActiveKioscoAdmin();
    const [range, setRange] = useState<ShopSalesRange>(ShopSalesRange.SevenDays);

    const { sells, loading: sellsLoading, error: sellsError } = useSellsListData();
    const { sellers, loading: sellersLoading, error: sellersError } = useSellersListData();

    const days = SHOP_SALES_RANGE_DAYS[range];
    const dailySales = useMemo(() => aggregateSellsByDay(sells, days), [sells, days]);
    const periodTotal = useMemo(() => dailySales.reduce((sum, point) => sum + point.total, 0), [dailySales]);
    const topSellers = useMemo(
        () => aggregateTopSellers(sells, sellers, TOP_SELLERS_LIMIT),
        [sells, sellers]
    );

    return {
        dailySales,
        periodTotal,
        range,
        setRange: isAdmin ? setRange : () => {},
        canChangeRange: isAdmin,
        topSellers,
        isLoading: sellsLoading || sellersLoading,
        error: sellsError ?? sellersError,
    };
};
