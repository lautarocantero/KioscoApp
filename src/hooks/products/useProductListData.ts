import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/product/productSlice";
import { getProducts, getProductsWithStock, searchProducts } from "../../store/product/productThunks";
import type { UseProductsListDataResult } from "@typings/product/productTypes";
import type { PresentationCategory } from "@typings/presentation/presentationEnum";


/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useProductsListData                                                ║
║                                                                       ║
║ Encapsula el fetch/búsqueda de la lista de productos contra el store: ║
║   1. Lee products/isLoading/errorMessage del store                   ║
║   2. Debouncea el término de búsqueda y despacha getProducts /        ║
║      searchProducts (con categoría opcional) según corresponda       ║
║   3. Si stockAvailable=true y no hay búsqueda activa, despacha        ║
║      getProductsWithStock en lugar de getProducts                    ║
╚══════════════════════════════════════════════════════════════════════╝*/

export const useProductsListData = (
    selectedCategory: PresentationCategory | null = null,
    stockAvailable = false,
): UseProductsListDataResult => {
    const dispatch = useDispatch<AppDispatch>();

    const products = useSelector((state: RootState) => state.product.products);
    const loading = useSelector((state: RootState) => state.product.isLoading);
    const error = useSelector((state: RootState) => state.product.errorMessage);

    const [searchTerm, setSearchTerm] = useState("");
    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            const hasActiveSearch = searchTerm.trim() !== "" || !!selectedCategory;

            //─── 🔎 búsqueda activa (texto y/o categoría) tiene prioridad sobre el resto 🔎 ───
            if (hasActiveSearch) {
                void dispatch(searchProducts(searchTerm, selectedCategory ?? undefined));
                return;
            }

            //─── 🔎 sin búsqueda: si se pidió stockAvailable, traer solo productos con stock 🔎 ───
            if (stockAvailable) {
                void dispatch(getProductsWithStock());
                return;
            }

            void dispatch(getProducts());
        }, 350);
        return () => clearTimeout(debounceRef.current);
    }, [searchTerm, selectedCategory, stockAvailable, dispatch]);

    return { products, loading, error, searchTerm, setSearchTerm };
};