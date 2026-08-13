// hooks/sellers/useSellerProductsListData.ts
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/cart/cartSlice";
import { fetchCartProducts, setSearchTermThunk } from "../../store/cart/cartThunks";

/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useSellerProductsListData                                          ║
║                                                                       ║
║ Trae los productos con stock (o filtrados) para el listado de new    ║
║ sell page. selectedCategory, searchTerm y exactMatch viven en         ║
║ sellerSlice, así este hook y useSellbar comparten la misma fuente     ║
║ de verdad.                                                            ║
║                                                                       ║
║   1. Al montar / cambiar selectedCategory / cambiar exactMatch:       ║
║      fetch INMEDIATO (sin debounce) — son acciones puntuales de       ║
║      click, no tipeo, así que no necesitan esperar.                   ║
║   2. Al cambiar searchTerm (tipeo en el buscador): debouncea.         ║
║                                                                       ║
║ ⚠️  Este es el ÚNICO hook que debe disparar el fetch — useSellbar     ║
║     solo lee/escribe el filtro en Redux, no vuelve a pedir datos,     ║
║     para evitar fetches duplicados si ambos están montados a la vez. ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const useSellerProductsListData = () => {
    const dispatch = useDispatch<AppDispatch>();

    const products = useSelector((state: RootState) => state.cart.products);
    const loading = useSelector((state: RootState) => state.cart.productsLoading);
    const error = useSelector((state: RootState) => state.cart.errorMessage);
    const searchTerm = useSelector((state: RootState) => state.cart.searchTerm);
    const selectedCategory = useSelector((state: RootState) => state.cart.selectedCategory);
    const exactMatch = useSelector((state: RootState) => state.cart.exactMatch);

    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const skipNextSearchEffectRef = useRef(false);

    //─── 🔎 fetch inmediato al montar / cambiar categoría o exactMatch 🔎 ───
    useEffect(() => {
        clearTimeout(debounceRef.current);
        skipNextSearchEffectRef.current = true;
        void dispatch(fetchCartProducts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory, exactMatch, dispatch]);

    //─── 🔎 búsqueda debounced 🔎 ───
    useEffect(() => {
        if (skipNextSearchEffectRef.current) {
            skipNextSearchEffectRef.current = false;
            return;
        }

        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            void dispatch(fetchCartProducts());
        }, 350);

        return () => clearTimeout(debounceRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    return {
        products,
        loading,
        error,
        searchTerm,
        setSearchTerm: (value: string) => dispatch(setSearchTermThunk(value)),
    };
};