import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState as SellerRootState } from "../../store/seller/sellerSlice";
import { setSearchTermThunk, clearSearchTermThunk, setSelectedCategoryThunk } from "../../store/seller/sellerThunks";
import { SnackBarContext } from "../../modules/shared/components/SnackBar/SnackBarContext";
import { useSellbarCart } from "./useSellbarCart";
import { useSellbarBarcode } from "./useSellbarBarcode";
import { useSellbarCategories } from "./useSellbarCategories";
import type { UseSellerBarResult } from "@typings/seller/sellerTypes";

export const useSellbar = (): UseSellerBarResult => {
    const { showSnackBar } = useContext(SnackBarContext)!;
    const dispatch = useDispatch<AppDispatch>();
    const { cart, searchTerm } = useSelector((state: SellerRootState) => state.seller);

    const cartData = useSellbarCart();
    const barcodeData = useSellbarBarcode({ cart, showSnackBar });
    const categories = useSellbarCategories({ showSnackBar });

    /*──────────── 🔎 sincroniza la categoría elegida hacia seller ────────────╗
    ║ useSellbarCategories mantiene su propio estado (fuera de este cambio);  ║
    ║ acá solo la reflejamos en sellerSlice, que es lo que lee                ║
    ║ useSellerProductsListData para disparar el fetch.                       ║
    ╚═══════════════════════════════════════════════════════════════════════*/
    useEffect(() => {
        dispatch(setSelectedCategoryThunk(categories.selected));
    }, [categories.selected, dispatch]);

    /*──────────────── 🔎 Search ────────────────*/
    const handleSearchChange = (value: string) => dispatch(setSearchTermThunk(value));
    const handleClearSearch = () => dispatch(clearSearchTermThunk());

    return {
        search: {
            value: searchTerm,
            onChange: handleSearchChange,
            onClear: handleClearSearch,
        },
        barcode: barcodeData,
        cart: cartData,
        categories: {
            list: categories.list,
            isLoading: categories.isLoading,
            selected: categories.selected,
            selectedLabel: categories.selectedLabel,
            getLabel: categories.getLabel,
            anchorEl: categories.anchorEl,
            isMenuOpen: categories.isMenuOpen,
            onOpenMenu: categories.onOpenMenu,
            onCloseMenu: categories.onCloseMenu,
            onSelect: categories.onSelect,
        },
    };
};