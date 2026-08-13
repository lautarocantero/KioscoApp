import { useSelector } from "react-redux";
import type { RootState as CartRootState } from "../../store/cart/cartSlice";
import type { UseCartBarResult } from "@typings/cart/cartTypes";
import { PRODUCTS_EXHIBITOR_ANCHOR_ID } from "../../config/constants";

/*══════════════════════════════════════════════════════════════════════╗
║ 🛒 useSellbarCart                                                     ║
║ Encapsula el conteo del carrito y la navegación hacia /cart.          ║
╚══════════════════════════════════════════════════════════════════════╝*/

export const useSellbarCart = (): UseCartBarResult['cart'] => {
    const { cart } = useSelector((state: CartRootState) => state.cart);

    const goToCart = () => {
        document
            .getElementById(PRODUCTS_EXHIBITOR_ANCHOR_ID)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return {
        count: cart?.length,
        goToCart,
    };
};