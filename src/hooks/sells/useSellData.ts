import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSellByIdThunk, getTodaySellsCountThunk } from "../../store/sell/sellsThunks";
import type { UseSellDataResult, UseSellStatsResult } from "@typings/sells/sellTypes";
import type { LinkDataResult } from "@typings/ui/layout.types";
import type { AppDispatch, RootState } from "../../store/sell/sellSlice";

/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useSellData                                                        ║
║                                                                       ║
║ Consume el store en lugar de fetch manual:                           ║
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


export const useSellStats = (): UseSellStatsResult => {
    const dispatch = useDispatch<AppDispatch>();

    const todaySells = useSelector((state: RootState) => state.sell?.todaySellsCount ?? null);
    const isLoading  = useSelector((state: RootState) => state.sell?.isLoadingTodaySells ?? false);
    const error      = useSelector((state: RootState) => state.sell?.todaySellsError ?? null);

    useEffect(() => {
        void dispatch(getTodaySellsCountThunk());
    }, [dispatch]);

    return { todaySells, isLoading, error };
};

// Adaptador para las cards de HomePageLinks / SidebarNavLinks
export const useSellsLinkData = (): LinkDataResult => {
    const { todaySells, isLoading, error } = useSellStats();

    return {
        value: todaySells,
        isLoading,
        error,
        subtitle: todaySells === 0 ? "Sin ventas hoy" : undefined,
    };
};