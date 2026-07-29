// hooks/sellers/useSellerProductsListData.ts
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/seller/sellerSlice";
import { fetchSellerProductsWithStock } from "../../store/seller/sellerThunks";
import { searchProducts } from "../../store/product/productThunks"; // ver nota abajo

/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useSellerProductsListData                                          ║
║                                                                       ║
║ Trae los productos con stock para el listado de new sell page.       ║
║ Mismo patrón que usePresentationsListData: fetch inmediato, sin       ║
║ compartir store con la pantalla de administración de productos.       ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const useSellerProductsListData = () => {
    const dispatch = useDispatch<AppDispatch>();

    const products = useSelector((state: RootState) => state.seller.products);
    const loading = useSelector((state: RootState) => state.seller.productsLoading);
    const error = useSelector((state: RootState) => state.seller.errorMessage);

    const [searchTerm, setSearchTerm] = useState("");
    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const skipNextSearchEffectRef = useRef(false);

    //─── 🔎 fetch inmediato al montar 🔎 ───
    useEffect(() => {
        clearTimeout(debounceRef.current);
        skipNextSearchEffectRef.current = true;
        void dispatch(fetchSellerProductsWithStock());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    //─── 🔎 búsqueda debounced 🔎 ───
    useEffect(() => {
        if (skipNextSearchEffectRef.current) {
            skipNextSearchEffectRef.current = false;
            return;
        }

        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            if (searchTerm.trim() === "") {
                void dispatch(fetchSellerProductsWithStock());
                return;
            }
            void dispatch(searchProducts(searchTerm)); // 👈 ver nota
        }, 350);

        return () => clearTimeout(debounceRef.current);
    }, [searchTerm]);

    return { products, loading, error, searchTerm, setSearchTerm };
};