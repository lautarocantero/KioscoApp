import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerByIdThunk } from "../../store/seller/sellerThunks";
import { setSelectedSeller, type AppDispatch, type RootState } from "../../store/seller/sellerSlice";
import type { Seller } from "@typings/seller/sellerTypes";

interface UseSellerDataResult {
    sellerData: Seller | null;
    isLoading: boolean;
    error: string | null;
}

export const useSellerData = (sellerId: string | undefined): UseSellerDataResult => {
    const dispatch = useDispatch<AppDispatch>();

    const sellerData = useSelector((state: RootState) => state.seller?.selectedSeller ?? null);
    const isLoading = useSelector((state: RootState) => state.seller?.isLoading ?? false);
    const error = useSelector((state: RootState) => state.seller?.errorMessage ?? null);

    const storeHasIt = sellerData?._id === sellerId;

    useEffect(() => {
        if (!sellerId) return;
        if (storeHasIt) return;

        void (async () => {
            const sellers = await dispatch(fetchSellerByIdThunk(sellerId));
            if (sellers && sellers.length > 0) {
                dispatch(setSelectedSeller({ seller: sellers[0] }));
            }
        })();
    }, [sellerId, storeHasIt, dispatch]);

    return { sellerData, isLoading, error };
};

export default useSellerData;