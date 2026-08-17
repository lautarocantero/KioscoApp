import { useCallback, useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { UseShopRestockReportReturn } from "@typings/shop/shopTypes";
import type { AppDispatch, RootState } from "../../store/product/productSlice";
import { fetchAllPresentationsThunk } from "../../store/presentation/presentationThunks";
import { fetchAllProductsThunk } from "../../store/product/productThunks";
import { buildRestockReportRows } from "../../modules/shop/helpers/buildRestockReportRows";
import { createRestockReportPdf } from "../../modules/shop/helpers/createRestockReportPdf";
import { SnackBarContext } from "../../modules/shared/components/SnackBar/SnackBarContext";
import { useErrorParser } from "../shared/useErrorParser";
import { AlertColor } from "@typings/ui/ui";

// Arma la boleta de reposición de /shop (PDF descargable): todas las
// presentaciones por debajo de su stock mínimo real, con el nombre del
// producto padre y la cantidad mínima a comprar. Reutiliza las mismas
// fuentes de datos que useShopLowStockPresentations (allPresentations) y
// suma allProducts (nuevo, ver productThunks.fetchAllProductsThunk) solo
// para resolver el nombre del producto — ningún endpoint bulk de
// presentaciones lo trae.
export const useShopRestockReport = (): UseShopRestockReportReturn => {
    const dispatch = useDispatch<AppDispatch>();
    const snackBarContext = useContext(SnackBarContext);
    const { parseError } = useErrorParser("No se pudo generar la boleta de reposición.");

    const allPresentations = useSelector((state: RootState) => state.presentation.allPresentations);
    const isLoadingAllPresentations = useSelector((state: RootState) => state.presentation.isLoadingAllPresentations);
    const allPresentationsError = useSelector((state: RootState) => state.presentation.allPresentationsError);

    const allProducts = useSelector((state: RootState) => state.product.allProducts);
    const isLoadingAllProducts = useSelector((state: RootState) => state.product.isLoadingAllProducts);
    const allProductsError = useSelector((state: RootState) => state.product.allProductsError);

    useEffect(() => {
        if (allPresentations.length) return;
        void dispatch(fetchAllPresentationsThunk());
    }, [allPresentations.length, dispatch]);

    useEffect(() => {
        if (allProducts.length) return;
        void dispatch(fetchAllProductsThunk());
    }, [allProducts.length, dispatch]);

    const rows = useMemo(
        () => buildRestockReportRows(allPresentations, allProducts),
        [allPresentations, allProducts]
    );

    const isLoading = isLoadingAllPresentations || isLoadingAllProducts;
    const error = allPresentationsError ?? allProductsError;

    const handleDownload = useCallback(async (): Promise<void> => {
        try {
            createRestockReportPdf(rows);
        } catch (err) {
            const message = await parseError(err, "No se pudo generar la boleta de reposición.");
            snackBarContext?.showSnackBar(message, AlertColor.Error);
        }
    }, [rows, parseError, snackBarContext]);

    return {
        rows,
        isLoading,
        error,
        isDownloadDisabled: isLoading || Boolean(error),
        handleDownload: () => void handleDownload(),
    };
};
