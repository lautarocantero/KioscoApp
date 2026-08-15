import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/seller/sellerSlice";
import { fetchSellersThunk } from "../../store/seller/sellerThunks";
import { sortSellersOnlineFirst } from "../../modules/sellers/helpers/sortSellersOnlineFirst";


const useSellersListData = () => {
    const dispatch = useDispatch<AppDispatch>();

    const sellers = useSelector((state: RootState) => state.seller.sellers);
    const loading = useSelector((state: RootState) => state.seller.isLoading);
    const storeError = useSelector((state: RootState) => state.seller.errorMessage);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setError(storeError);
    }, [storeError]);

    useEffect(() => {
        void dispatch(fetchSellersThunk());
    }, [dispatch]);

    const sortedSellers = useMemo(() => sortSellersOnlineFirst(sellers), [sellers]);

    return {
        sellers: sortedSellers,
        loading,
        error,
        clearError: () => setError(null),
    };
};

export default useSellersListData;