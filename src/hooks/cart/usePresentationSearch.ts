import { useContext, useDeferredValue, useMemo, useState, type KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { AppDispatch, RootState } from "../../store/cart/cartSlice";
import type { PresentationRow, UsePresentationSearchReturn } from "@typings/cart/cartTypes";
import { getDefaultAddQuantity } from "../../modules/shared/helpers/saleTypeHelper";
import { buildPresentationRows } from "../../modules/cart/helpers/buildPresentationRows";
import { searchPresentationRows } from "../../modules/cart/helpers/searchPresentationRows";
import handleAddProductDialogItemToCart from "../../modules/cart/components/ProductDialog/handleAddProductItemToCart";
import { SnackBarContext } from "../../modules/shared/components/SnackBar/SnackBarContext";

/*══════════════════════════════════════════════════════════════════════╗
║ 🔎 usePresentationSearch                                              ║
║                                                                       ║
║ Buscador de presentaciones del header de /new-sell. El índice se     ║
║ deriva de state.cart.products (ya cargado por useSellerProductsList  ║
║ Data, sin fetch nuevo) y se aplana con buildPresentationRows. Enter/  ║
║ click agrega directo al carrito reusando el mismo pipeline que el    ║
║ ProductDialog (handleAddProductDialogItemToCart).                    ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const usePresentationSearch = (): UsePresentationSearchReturn => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const { showSnackBar } = useContext(SnackBarContext)!;

    const products = useSelector((state: RootState) => state.cart.products);

    const [query, setQuery] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const deferredQuery = useDeferredValue(query);

    const rows: PresentationRow[] = useMemo(
        () => buildPresentationRows(Array.isArray(products) ? products : [], t),
        [products, t]
    );

    const results: PresentationRow[] = useMemo(
        () => searchPresentationRows(rows, deferredQuery),
        [rows, deferredQuery]
    );

    const isOpen = query.trim().length > 0;
    const safeHighlightedIndex = results.length === 0 ? 0 : Math.min(highlightedIndex, results.length - 1);

    const handleQueryChange = (value: string): void => {
        setQuery(value);
        setHighlightedIndex(0);
    };

    const handleClear = (): void => {
        setQuery("");
        setHighlightedIndex(0);
    };

    const handleSelect = async (row: PresentationRow): Promise<void> => {
        const quantity = getDefaultAddQuantity(row.presentationData.sale_type);

        await handleAddProductDialogItemToCart({
            presentation: row.presentationData,
            quantity,
            dispatch,
            showSnackBar,
            t,
        });

        handleClear();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "Escape") {
            handleClear();
            return;
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();
            if (results.length === 0) return;
            setHighlightedIndex((prev) => Math.min(prev + 1, results.length - 1));
            return;
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            if (results.length === 0) return;
            setHighlightedIndex((prev) => Math.max(prev - 1, 0));
            return;
        }

        if (event.key === "Enter") {
            const highlighted = results[safeHighlightedIndex];
            if (!highlighted) return;
            event.preventDefault();
            void handleSelect(highlighted);
        }
    };

    return {
        query,
        onQueryChange: handleQueryChange,
        results,
        highlightedIndex: safeHighlightedIndex,
        isOpen,
        onKeyDown: handleKeyDown,
        onHighlight: setHighlightedIndex,
        onSelect: (row: PresentationRow) => void handleSelect(row),
        onClear: handleClear,
    };
};

export default usePresentationSearch;
