import { useContext } from "react";
import { useSelector } from "react-redux";
import type { RootState as CartRootState } from "../../store/cart/cartSlice";
import { SnackBarContext } from "../../modules/shared/components/SnackBar/SnackBarContext";
import { useSellbarCart } from "./useSellbarCart";
import { useSellbarBarcode } from "./useSellbarBarcode";
import type { UseCartBarResult } from "@typings/cart/cartTypes";

export const useSellbar = (): UseCartBarResult => {
    const { showSnackBar } = useContext(SnackBarContext)!;
    const { cart } = useSelector((state: CartRootState) => state.cart);

    const cartData = useSellbarCart();
    const barcodeData = useSellbarBarcode({ cart, showSnackBar });

    return {
        barcode: barcodeData,
        cart: cartData,
    };
};
