import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { UseShopLowStockPresentationsReturn } from "@typings/shop/shopTypes";
import type { AppDispatch, RootState } from "../../store/presentation/presentationSlice";
import { fetchAllPresentationsThunk } from "../../store/presentation/presentationThunks";
import { getLowStockPresentations } from "../../modules/shop/helpers/getLowStockPresentations";

// Cuántos ítems mostrar en la lista de /shop. El catálogo puede tener
// cientos de presentaciones por debajo del mínimo real (dato correcto,
// no es un bug) — mostrar los más críticos es más útil que un scroll
// interminable; `total` real queda expuesto para que la UI aclare cuántos
// quedan afuera.
const VISIBLE_LOW_STOCK_LIMIT = 20;

// Detalle real de "productos con stock bajo" para /shop: trae TODAS las
// presentaciones de la tienda (fetchAllPresentationsThunk, antes sin usar)
// y filtra/clasifica client-side con getLowStockPresentations — el único
// endpoint que trae stock + stock mínimo juntos para todas las variantes.
export const useShopLowStockPresentations = (): UseShopLowStockPresentationsReturn => {
    const dispatch = useDispatch<AppDispatch>();

    const allPresentations = useSelector((state: RootState) => state.presentation.allPresentations);
    const isLoading = useSelector((state: RootState) => state.presentation.isLoadingAllPresentations);
    const error = useSelector((state: RootState) => state.presentation.allPresentationsError);

    useEffect(() => {
        if (allPresentations.length) return;
        void dispatch(fetchAllPresentationsThunk());
    }, [allPresentations.length, dispatch]);

    const allLowStock = useMemo(() => getLowStockPresentations(allPresentations), [allPresentations]);
    const lowStock = useMemo(() => allLowStock.slice(0, VISIBLE_LOW_STOCK_LIMIT), [allLowStock]);

    return { lowStock, total: allLowStock.length, isLoading, error };
};
