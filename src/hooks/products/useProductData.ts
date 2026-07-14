import type { ProductStats, UseProductDataResult, UseProductStatsResult } from "@typings/product/productTypes";
import { useEffect, useState }   from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../store/product/productSlice";
import { getProductById } from "../../store/product/productThunks";
import type { LinkDataResult } from "@typings/ui/layout.types";
import { API_URL } from "../../config/api";

/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useProductData                                                     ║
║                                                                       ║
║ Ahora consume el store en lugar de fetch manual:                     ║
║   1. Lee currentProduct/isLoadingCurrent/currentProductError del store ║
║   2. Si el store no tiene este producto (refresh, URL directa, etc.), ║
║      despacha el thunk getProductById, que ya se encarga de           ║
║      fetchear y guardar en store                                      ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const useProductData = (productId: string | undefined): UseProductDataResult => {

    const dispatch  = useDispatch<AppDispatch>();

    const productData = useSelector((state: RootState) => state.product?.currentProduct ?? null);
    const loading    = useSelector((state: RootState) => state.product?.isLoadingCurrent ?? false);
    const error        = useSelector((state: RootState) => state.product?.currentProductError ?? null);

    const storeHasIt = productData?._id === productId;

    useEffect(() => {
        if (!productId) return;
        if (storeHasIt) return; // ya está en store, no hace falta refetch

        void dispatch(getProductById(productId));
    }, [productId, storeHasIt, dispatch]);

    return { productData, loading, error };
};


export const useProductStats = (): UseProductStatsResult => {
    const [totalProducts, setTotalProducts]       = useState<number | null>(null);
    const [lowStockProducts, setLowStockProducts] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError]     = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchStats = async (): Promise<void> => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `${API_URL}/product/get-product-stats`,
                    { credentials: "include" }
                );

                if (!response.ok) throw new Error(`Error ${response.status}`);

                const stats: ProductStats = await response.json();

                if (!isMounted) return;
                setTotalProducts(stats.totalProducts);
                setLowStockProducts(stats.lowStockProducts);
            } catch {
                if (!isMounted) return;
                setError("No se pudo obtener los datos de productos");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        void fetchStats();

        return () => {
            isMounted = false;
        };
    }, []);

    return { totalProducts, lowStockProducts, loading, error };
};

// 👇 Adaptador para las cards de HomePageLinks / SidebarNavLinks
export const useProductsLinkData = (): LinkDataResult => {
    const { totalProducts, lowStockProducts, loading, error } = useProductStats();

    const subtitle = error
        ? undefined
        : lowStockProducts === null
            ? undefined
            : lowStockProducts === 0
                ? "Sin stock bajo"
                : `${lowStockProducts} con stock bajo`;

    return {
        value: totalProducts,
        loading,
        error,
        subtitle,
    };
};