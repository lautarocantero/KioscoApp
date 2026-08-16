import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { UseShopInventorySummaryReturn } from "@typings/shop/shopTypes";
import type { AppDispatch, RootState } from "../../store/product/productSlice";
import { getProductsWithStock } from "../../store/product/productThunks";
import { useProductStats } from "../products/useProductData";

// Resumen de inventario para /shop: combina ProductStats (total + stock
// bajo, ya resuelto para la card de Productos) con `getProductsWithStock`
// (productos con al menos 1 presentación con stock > 0) para derivar
// "con stock"/"sin stock" — ningún endpoint los da separados directamente.
export const useShopInventorySummary = (): UseShopInventorySummaryReturn => {
    const { totalProducts, lowStockPresentations, isLoading: statsLoading, error: statsError } = useProductStats();

    const dispatch = useDispatch<AppDispatch>();
    const productsWithStock = useSelector((state: RootState) => state.product.products);
    const isLoadingWithStock = useSelector((state: RootState) => state.product.isLoading);
    const withStockError = useSelector((state: RootState) => state.product.errorMessage);

    useEffect(() => {
        void dispatch(getProductsWithStock());
    }, [dispatch]);

    const withStock = productsWithStock.length;
    const withoutStock = totalProducts === null ? null : Math.max(totalProducts - withStock, 0);

    return {
        total: totalProducts,
        withStock,
        lowStock: lowStockPresentations,
        withoutStock,
        isLoading: statsLoading || isLoadingWithStock,
        error: statsError ?? withStockError,
    };
};
