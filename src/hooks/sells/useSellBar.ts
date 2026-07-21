import { useContext } from "react";
import { useSelector } from "react-redux";
import type { RootState as SellerRootState } from "../../store/seller/sellerSlice";
import { SnackBarContext } from "../../modules/shared/components/SnackBar/SnackBarContext";
import { useProductsListData } from "../products/useProductListData";
import { useSellbarCart } from "./useSellbarCart";
import { useSellbarBarcode } from "./useSellbarBarcode";
import { useSellbarCategories } from "./useSellbarCategories";
import type { UseSellbarResult } from "../../typings/sells/sellTypes";

export const useSellbar = (): UseSellbarResult => {
    const { showSnackBar } = useContext(SnackBarContext)!;
    const { cart } = useSelector((state: SellerRootState) => state.seller);

    const cartData = useSellbarCart();
    const barcodeData = useSellbarBarcode({ cart, showSnackBar });
    const categories = useSellbarCategories({ showSnackBar });

    /*──────────────── 🔎 Search ────────────────*/
    const { searchTerm, setSearchTerm } = useProductsListData(categories.selectedCategory);
    const handleClearSearch = () => setSearchTerm("");

    return {
        search: {
            value: searchTerm,
            onChange: setSearchTerm,
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