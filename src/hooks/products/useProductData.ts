import type { Product, UseProductDataResult } from "@typings/product/productTypes";
import { useEffect, useState }   from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProduct, type AppDispatch, type RootState } from "../../store/product/productSlice";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";


/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useProductData                                                     ║
║                                                                       ║
║ Prioridad de fuente de datos:                                         ║
║   1. store.products.currentProduct  → flujo normal (sin fetch)       ║
║   2. fetch fallback                 → refresh de página / URL directa ║
║                                                                       ║
║ El fetch además sincroniza el store para que navegaciones             ║
║ posteriores dentro de la misma sesión tampoco vuelvan a fetchear.    ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const useProductData = (productId: string | undefined): UseProductDataResult => {

    const dispatch    = useDispatch<AppDispatch>();
    const fromStore   = useSelector((state: RootState) => state.product?.currentProduct ?? null);
    console.log("useProductData - fromStore:", fromStore, "productId:", productId);

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
                    `${API_BASE_URL}/product/get-product-by-id/${productId}`,  // ya estaba bien
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