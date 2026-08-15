import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerByIdThunk } from "../../store/seller/sellerThunks";
import { setSelectedSeller, type AppDispatch, type RootState } from "../../store/seller/sellerSlice";
import type { SellerWithRole, UseSellerDataReturn } from "@typings/seller/sellerTypes";

export const useSellerData = (sellerId: string | undefined): UseSellerDataReturn => {
    const dispatch = useDispatch<AppDispatch>();

    // El slice tipa selectedSeller como Seller (sin role/email) porque también
    // guarda ahí resultados de flujos que no hacen el join contra Auth. Acá sí
    // lo hace siempre (get-seller-by-id), así que el cast es seguro.
    const sellerData = useSelector((state: RootState) => state.seller?.selectedSeller ?? null) as SellerWithRole | null;
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