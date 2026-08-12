import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import type { AppDispatch } from "../../store/presentation/presentationSlice";
import type { UseCartPresentationPickerReturn } from "@typings/seller/sellerTypes";
import type { RootState } from "../../store/seller/sellerSlice";
import { fetchCartPresentationsByProductId } from "../../store/seller/sellerThunks";


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

    const productSelected = useSelector((state: RootState) => state.seller.productSelected);

    const presentations = useSelector(
        (state: RootState) => state.seller.presentations,
        shallowEqual
    );

    const presentationsLoading = useSelector(
        (state: RootState) => state.seller.presentationsLoading
    );

    useEffect(() => {
        const productId = productSelected?._id;
        if (!productId) return;
        void dispatch(fetchCartPresentationsByProductId(productId));
    }, [dispatch, productSelected]);

    return { productSelected, presentations, presentationsLoading };
};

export default useCartPresentationPicker;