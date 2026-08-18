import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getSellByIdThunk, getTodaySellsCountThunk } from "../../store/sell/sellsThunks";
import type { UseSellDataResult, UseSellStatsResult } from "@typings/sells/sellTypes";
import type { LinkDataResult } from "@typings/ui/layout.types";
import type { AppDispatch, RootState } from "../../store/sell/sellSlice";
import { formatRelativeTime } from "../../utils/formatter/formatDate";
import { formatCurrency } from "../../modules/cart/helpers/formatCurrency";


/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useSellData                                                        ║
║                                                                       ║
║                                                                       ║
║   1. Lee currentSell/isLoadingCurrent/currentSellError del store      ║
║   2. Si el store no tiene esta venta (refresh, URL directa, etc.),    ║
║      despacha el thunk getSellById, que ya se encarga de              ║
║      fetchear y guardar en store                                      ║
╚══════════════════════════════════════════════════════════════════════╝*/

export const useSellData = (sellId: string | undefined): UseSellDataResult => {

    const dispatch = useDispatch<AppDispatch>();

    const sellData = useSelector((state: RootState) => state.sell?.currentSell ?? null);
    const isLoading = useSelector((state: RootState) => state.sell?.isLoadingCurrent ?? false);
    const error     = useSelector((state: RootState) => state.sell?.currentSellError ?? null);

    const storeHasIt = sellData?._id === sellId;

    useEffect(() => {
        if (!sellId) return;
        if (storeHasIt) return;

        void dispatch(getSellByIdThunk({ _id: sellId }));
    }, [sellId, storeHasIt, dispatch]);

    return { sellData, isLoading, error };
};


/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useSellStats                                                       ║
║                                                                       ║
║                                                                       ║
║   1. Lee todaySellsCount/lastSaleAt/isLoadingTodaySells/               ║
║      todaySellsError del store                                        ║
║   2. Al montar, despacha getTodaySellsCountThunk para traer            ║
║      el conteo de ventas del día y la última venta registrada         ║
╚══════════════════════════════════════════════════════════════════════╝*/

export const useSellStats = (): UseSellStatsResult => {
    const dispatch = useDispatch<AppDispatch>();

    const todaySells       = useSelector((state: RootState) => state.sell?.todaySellsCount ?? null);
    const todaySellsAmount = useSelector((state: RootState) => state.sell?.todaySellsTotalAmount ?? null);
    const lastSaleAt       = useSelector((state: RootState) => state.sell?.lastSaleAt ?? null);
    const isLoading        = useSelector((state: RootState) => state.sell?.isLoadingTodaySells ?? false);
    const error            = useSelector((state: RootState) => state.sell?.todaySellsError ?? null);

    useEffect(() => {
        void dispatch(getTodaySellsCountThunk());
    }, [dispatch]);

    return { todaySells, todaySellsAmount, lastSaleAt, isLoading, error };
};


/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useSellsLinkData                                                   ║
║                                                                       ║
║                                                                       ║
║   1. Consume useSellStats para obtener el conteo de ventas de hoy      ║
║      y la fecha de la última venta                                    ║
║   2. Formatea lastSaleAt a tiempo relativo (ej: "hace 5 min")         ║
║   3. Arma el subtitle según haya o no ventas registradas hoy           ║
║   4. Adapta la data al shape que esperan las cards de                 ║
║      HomePageLinks / SidebarNavLinks                                  ║
╚══════════════════════════════════════════════════════════════════════╝*/

// Adaptador para las cards de HomePageLinks / SidebarNavLinks
export const useSellsLinkData = (): LinkDataResult => {
    const { t } = useTranslation();
    const { todaySells, todaySellsAmount, lastSaleAt, isLoading, error } = useSellStats();

    const relativeTime = formatRelativeTime(lastSaleAt);

    return {
        value: todaySells,
        secondaryValue: todaySells === 0 || !todaySellsAmount ? null : formatCurrency(todaySellsAmount),
        isLoading,
        error,
        subtitle: todaySells === 0 || !relativeTime
            ? t("sells.stats.noSalesToday")
            : t("sells.stats.todayWithTime", { time: relativeTime }),
    };
};