import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { LinkDataResult } from "@typings/ui/layout.types";
import type { AppDispatch, RootState } from "../../store/provider/providerSlice";
import { fetchProviderStatsThunk } from "../../store/provider/providerThunks";

// Adapta las stats de proveedores al shape que esperan las cards de
// HomePageLinks / SidebarNavLinks (mismo patrón que useProductsLinkData).
export const useProvidersLinkData = (): LinkDataResult => {
    const dispatch = useDispatch<AppDispatch>();

    const stats = useSelector((state: RootState) => state.provider.stats);
    const isLoading = useSelector((state: RootState) => state.provider.isLoadingStats);
    const error = useSelector((state: RootState) => state.provider.statsError);

    useEffect(() => {
        if (stats) return;
        void dispatch(fetchProviderStatsThunk());
    }, [stats, dispatch]);

    return {
        value: stats?.totalProviders ?? null,
        isLoading,
        error,
    };
};

export default useProvidersLinkData;
