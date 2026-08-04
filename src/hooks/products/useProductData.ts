import type { UseProductDataResult, UseProductStatsResult } from "@typings/product/productTypes";
import { useEffect }   from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../store/product/productSlice";
import { getProductById, getProductStats } from "../../store/product/productThunks";
import type { LinkDataResult } from "@typings/ui/layout.types";


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
    const isLoading    = useSelector((state: RootState) => state.product?.isLoadingCurrent ?? false);
    const error        = useSelector((state: RootState) => state.product?.currentProductError ?? null);

    const storeHasIt = productData?._id === productId;

    useEffect(() => {
        if (!productId) return;
        if (storeHasIt) return; 

        void dispatch(getProductById(productId));
    }, [productId, storeHasIt, dispatch]);

    return { productData, isLoading, error };
};


/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useProductStats                                                    ║
║                                                                       ║
║   1. Lee stats/isLoadingStats/statsError del store                    ║
║   2. Si todavía no hay stats cacheadas, despacha getProductStats      ║
║      para traer totalProducts y lowStockPresentations                ║
║   3. Devuelve los valores desestructurados con fallback a null        ║
╚══════════════════════════════════════════════════════════════════════╝*/

export const useProductStats = (): UseProductStatsResult => {
    const dispatch = useDispatch<AppDispatch>();

    const stats     = useSelector((state: RootState) => state.product?.stats ?? null);
    const isLoading = useSelector((state: RootState) => state.product?.isLoadingStats ?? false);
    const error     = useSelector((state: RootState) => state.product?.statsError ?? null);

    useEffect(() => {
        if (stats) return;

        void dispatch(getProductStats());
    }, [stats, dispatch]);

    return {
        totalProducts: stats?.totalProducts ?? null,
        lowStockPresentations: stats?.lowStockPresentations ?? null,
        isLoading,
        error,
    };
};


/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useProductsLinkData                                                ║
║                                                                       ║
║   1. Consume useProductStats para traer totalProducts y               ║
║      lowStockPresentations                                            ║
║   2. Arma el subtitle según haya error, datos aún no cargados, o      ║
║      cantidad de presentaciones con stock bajo                        ║
║   3. Adapta la data al shape que esperan las cards de                 ║
║      HomePageLinks / SidebarNavLinks                                  ║
╚══════════════════════════════════════════════════════════════════════╝*/

export const useProductsLinkData = (): LinkDataResult => {
    const { totalProducts, lowStockPresentations, isLoading, error } = useProductStats();

    const subtitle = error
        ? undefined
        : lowStockPresentations === null
            ? undefined
            : lowStockPresentations === 0
                ? "Stock al día"
                : `${lowStockPresentations} con stock bajo`;

    return {
        value: totalProducts,
        isLoading,
        error,
        subtitle,
    };
};