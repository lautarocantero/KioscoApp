// hooks/products/useProductsListData.ts
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/product/productSlice";
import { getProducts, getProductsWithStock, searchProducts } from "../../store/product/productThunks";
import type { UseProductsListDataResult } from "@typings/product/productTypes";
import type { PresentationCategory } from "@typings/presentation/presentationEnum";

/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useProductsListData                                                ║
║                                                                       ║
║   1. Al montar / cambiar selectedCategory o stockAvailable: fetch    ║
║      INMEDIATO (sin debounce), para que loading pase a true antes    ║
║      de que se llegue a evaluar "vacío".                             ║
║   2. Al tipear en el buscador (searchTerm): debouncea y despacha     ║
║      searchProducts.                                                 ║
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
    const skipNextSearchEffectRef = useRef(false);

    useEffect(() => {
        clearTimeout(debounceRef.current);
        skipNextSearchEffectRef.current = true;

        const hasActiveSearch = searchTerm.trim() !== "" || !!selectedCategory;

        if (hasActiveSearch) {
            void dispatch(searchProducts(searchTerm, selectedCategory ?? undefined));
            return;
        }

        if (stockAvailable) {
            void dispatch(getProductsWithStock());
            return;
        }

        void dispatch(getProducts());
    }, [selectedCategory, stockAvailable, dispatch]);

    useEffect(() => {
        if (skipNextSearchEffectRef.current) {
            skipNextSearchEffectRef.current = false;
            return;
        }

        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            const hasActiveSearch = searchTerm.trim() !== "" || !!selectedCategory;

            if (hasActiveSearch) {
                void dispatch(searchProducts(searchTerm, selectedCategory ?? undefined));
                return;
            }

            if (stockAvailable) {
                void dispatch(getProductsWithStock());
                return;
            }

            void dispatch(getProducts());
        }, 350);

        return () => clearTimeout(debounceRef.current);
    }, [searchTerm]);

    return { products, loading, error, searchTerm, setSearchTerm };
};