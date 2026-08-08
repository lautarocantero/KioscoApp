// hooks/sellers/useSellerProductsListData.ts
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/seller/sellerSlice";
import { fetchSellerProducts, setSearchTermThunk } from "../../store/seller/sellerThunks";

/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useSellerProductsListData                                          ║
║                                                                       ║
║ Trae los productos con stock (o filtrados) para el listado de new    ║
║ sell page. selectedCategory y searchTerm viven en sellerSlice, así    ║
║ este hook y useSellbar comparten la misma fuente de verdad.           ║
║                                                                       ║
║   1. Al montar / cambiar selectedCategory: fetch INMEDIATO (sin       ║
║      debounce), para que loading pase a true antes de evaluar vacío. ║
║   2. Al cambiar searchTerm (tipeo en el buscador): debouncea.         ║
║                                                                       ║
║ ⚠️  Este es el ÚNICO hook que debe disparar el fetch — useSellbar     ║
║     solo lee/escribe el filtro en Redux, no vuelve a pedir datos,     ║
║     para evitar fetches duplicados si ambos están montados a la vez. ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const useSellerProductsListData = () => {
    const dispatch = useDispatch<AppDispatch>();

    const products = useSelector((state: RootState) => state.seller.products);
    const loading = useSelector((state: RootState) => state.seller.productsLoading);
    const error = useSelector((state: RootState) => state.seller.errorMessage);
    const searchTerm = useSelector((state: RootState) => state.seller.searchTerm);
    const selectedCategory = useSelector((state: RootState) => state.seller.selectedCategory);

    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const skipNextSearchEffectRef = useRef(false);

    //─── 🔎 fetch inmediato al montar / cambiar categoría 🔎 ───
    useEffect(() => {
        clearTimeout(debounceRef.current);
        skipNextSearchEffectRef.current = true;
        void dispatch(fetchSellerProducts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory, dispatch]);

    //─── 🔎 búsqueda debounced 🔎 ───
    useEffect(() => {
        if (skipNextSearchEffectRef.current) {
            skipNextSearchEffectRef.current = false;
            return;
        }

        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            void dispatch(fetchSellerProducts());
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