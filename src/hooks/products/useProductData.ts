import type { Product, ProductStats, UseProductDataResult, UseProductStatsResult } from "@typings/product/productTypes";
import { useEffect, useState }   from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProduct, type AppDispatch, type RootState } from "../../store/product/productSlice";
import type { LinkDataResult } from "@typings/ui/layout.types";
import { API_URL } from "../../config/api";

export const useProductData = (productId: string | undefined): UseProductDataResult => {

    const dispatch    = useDispatch<AppDispatch>();
    const fromStore   = useSelector((state: RootState) => state.product?.currentProduct ?? null);

    // ─── ¿El store ya tiene exactamente este producto? ───────────────────
    const storeHasIt  = fromStore?._id === productId;

    const [productData, setProductData] = useState<Product | null>(
        storeHasIt ? fromStore : null
    );
    const [isLoading, setIsLoading] = useState<boolean>(!storeHasIt);
    const [error,     setError]     = useState<string | null>(null);

    useEffect(() => {
        // ─── Cambiamos de producto: reseteamos estado local ───────────────
        if (!storeHasIt) {
            setProductData(null);
            setIsLoading(true);
            setError(null);
        }

        // ─── Caso 1: el store ya tiene el producto correcto ───────────────
        if (storeHasIt) {
            setProductData(fromStore);
            setIsLoading(false);
            return;
        }

        // ─── Caso 2: falta el id (no debería pasar, pero lo protegemos) ──
        if (!productId) {
            setError("ID de producto no disponible");
            setIsLoading(false);
            return;
        }

        // ─── Caso 3: fetch fallback (refresh, URL directa, link externo) ──
        let cancelled = false;

        const fetchProduct = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/product/get-product-by-id/${productId}`,  // ya estaba bien
                    { credentials: "include" }
                );
            
                if (!response.ok) throw new Error(`Error ${response.status}`);
            
                // Ahora el backend devuelve Product directamente (no Product[])
                const product: Product = await response.json();
            
                if (!product?._id) throw new Error("Producto no encontrado");
            
                if (!cancelled) {
                    setProductData(product);
                    dispatch(setCurrentProduct(product));
                }
            
            } catch (err) {
                if (!cancelled) {
                    console.error("useProductData fetch error:", err);
                    setError("No se pudo cargar los datos del producto");
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        fetchProduct();

        // ─── Cleanup: si el componente se desmonta antes de terminar ─────
        return () => { cancelled = true; };

    }, [productId, storeHasIt]);     // storeHasIt se recalcula en cada render

    return { productData, isLoading, error };
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