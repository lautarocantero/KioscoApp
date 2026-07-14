// hooks/products/useProductsListData.ts
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/product/productSlice";
import { getProducts, searchProducts } from "../../store/product/productThunks";
import type { UseProductsListDataResult } from "@typings/product/productTypes";


/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useProductsListData                                                ║
║                                                                       ║
║ Encapsula el fetch/búsqueda de la lista de productos contra el store: ║
║   1. Lee products/isLoading/errorMessage del store                   ║
║   2. Debouncea el término de búsqueda y despacha getProducts /        ║
║      searchProducts según corresponda                                ║
╚══════════════════════════════════════════════════════════════════════╝*/

export const useProductsListData = (): UseProductsListDataResult => {
    const dispatch = useDispatch<AppDispatch>();

    const products = useSelector((state: RootState) => state.product.products);
    const loading = useSelector((state: RootState) => state.product.isLoading);
    const error = useSelector((state: RootState) => state.product.errorMessage);

    const [searchTerm, setSearchTerm] = useState("");
    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            if (searchTerm.trim() === "") {
                void dispatch(getProducts());
            } else {
                void dispatch(searchProducts(searchTerm));
            }
        }, 350);
        return () => clearTimeout(debounceRef.current);
    }, [searchTerm, dispatch]);

    return { products, loading, error, searchTerm, setSearchTerm };
};