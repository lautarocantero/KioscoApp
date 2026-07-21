import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState as SellerRootState } from "../../store/seller/sellerSlice";
import type { UseSellbarResult } from "@typings/sells/sellTypes";

/*══════════════════════════════════════════════════════════════════════╗
║ 🛒 useSellbarCart                                                     ║
║ Encapsula el conteo del carrito y la navegación hacia /cart.          ║
╚══════════════════════════════════════════════════════════════════════╝*/

export const useSellbarCart = (): UseSellbarResult['cart'] => {
    const navigate = useNavigate();
    const { cart } = useSelector((state: SellerRootState) => state.seller);

    const goToCart = () => navigate('/cart');

    return {
        count: cart?.length,
        goToCart,
    };
};