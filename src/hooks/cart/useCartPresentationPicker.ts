import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import type { AppDispatch } from "../../store/cart/cartSlice";
import type { UseCartPresentationPickerReturn } from "@typings/cart/cartTypes";
import type { RootState } from "../../store/cart/cartSlice";
import { fetchCartPresentationsByProductId } from "../../store/cart/cartThunks";


/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useCartPresentationPicker                                          ║
║                                                                       ║
║ Trae las presentaciones del producto seleccionado en el flujo de     ║
║ venta, para elegir cuál agregar al carrito. Sin búsqueda/debounce —  ║
║ acá solo se listan las                                               ║
║ presentaciones del producto activo.                                  ║
╚══════════════════════════════════════════════════════════════════════╝*/

const useCartPresentationPicker = (): UseCartPresentationPickerReturn => {
    const dispatch = useDispatch<AppDispatch>();

    const productSelected = useSelector((state: RootState) => state.cart.productSelected);

    const presentations = useSelector(
        (state: RootState) => state.cart.presentations,
        shallowEqual
    );

    const presentationsLoading = useSelector(
        (state: RootState) => state.cart.presentationsLoading
    );

    useEffect(() => {
        const productId = productSelected?._id;
        if (!productId) return;
        void dispatch(fetchCartPresentationsByProductId(productId));
    }, [dispatch, productSelected]);

    return { productSelected, presentations, presentationsLoading };
};

export default useCartPresentationPicker;