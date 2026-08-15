import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviderByIdThunk } from "../../store/provider/providerThunks";
import { setCurrentProvider, type AppDispatch, type RootState } from "../../store/provider/providerSlice";
import type { UseProviderDataResult } from "@typings/provider/providerTypes";

export const useProviderData = (providerId: string | undefined): UseProviderDataResult => {
    const dispatch = useDispatch<AppDispatch>();

    const providerData = useSelector((state: RootState) => state.provider?.currentProvider ?? null);
    const isLoading = useSelector((state: RootState) => state.provider?.isLoadingCurrent ?? false);
    const error = useSelector((state: RootState) => state.provider?.currentProviderError ?? null);

    const storeHasIt = providerData?._id === providerId;

    useEffect(() => {
        if (!providerId) return;
        if (storeHasIt) return;

        void (async () => {
            const providers = await dispatch(fetchProviderByIdThunk(providerId));
            if (providers && providers.length > 0) {
                dispatch(setCurrentProvider(providers[0]));
            }
        })();
    }, [providerId, storeHasIt, dispatch]);

    return { providerData, isLoading, error };
};

export default useProviderData;
