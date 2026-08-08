import { useSelector } from "react-redux";
import type { RootState as SellerRootState } from "../../store/seller/sellerSlice";
import type { UseSellerBarResult } from "@typings/seller/sellerTypes";
import { PRODUCTS_EXHIBITOR_ANCHOR_ID } from "../../config/constants";

/*══════════════════════════════════════════════════════════════════════╗
║ 🛒 useSellbarCart                                                     ║
║ Encapsula el conteo del carrito y la navegación hacia /cart.          ║
╚══════════════════════════════════════════════════════════════════════╝*/

export const useSellbarCart = (): UseSellerBarResult['cart'] => {
    const { cart } = useSelector((state: SellerRootState) => state.seller);

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