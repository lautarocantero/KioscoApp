import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { LinkDataResult } from "@typings/ui/layout.types";
import type { AppDispatch, RootState } from "../../store/seller/sellerSlice";
import { fetchSellersThunk } from "../../store/seller/sellerThunks";


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

    return {
        sellers,
        loading,
        error,
        clearError: () => setError(null),
    };
};

export default useSellersListData;

/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useSellersLinkData                                                 ║
║                                                                       ║
║   Adapta useSellersListData al shape que esperan las cards de        ║
║   HomePageLinks / SidebarNavLinks (mismo patrón que                  ║
║   useProductsLinkData en hooks/products/useProductData.ts).          ║
╚══════════════════════════════════════════════════════════════════════╝*/

export const useSellersLinkData = (): LinkDataResult => {
    const { sellers, loading, error } = useSellersListData();

    // TODO(online-status): todavía no hay tracking real de conexión de
    // vendedores. Mockeado a 0 hasta que exista ese estado.
    const onlineCount = 0;

    return {
        value: sellers.length,
        isLoading: loading,
        error,
        subtitle: `${onlineCount} en línea`,
    };
};