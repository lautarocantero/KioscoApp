import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import type { AppDispatch, RootState as PresentationState } from "../../store/presentation/presentationSlice";
import { fetchPresentationsByProductId } from "../../store/presentation/presentationThunks";
import type { RootState as SellerRootState } from "../../store/seller/sellerSlice";
import type { UseCartPresentationPickerReturn } from "@typings/sells/sellTypes";


/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useCartPresentationPicker                                          ║
║                                                                       ║
║ Trae las presentaciones del producto seleccionado en el flujo de     ║
║ venta, para elegir cuál agregar al carrito. Sin búsqueda/debounce —  ║
║ a diferencia de usePresentationsListData, acá solo se listan las     ║
║ presentaciones del producto activo.                                  ║
╚══════════════════════════════════════════════════════════════════════╝*/

const useCartPresentationPicker = (): UseCartPresentationPickerReturn => {
    const dispatch = useDispatch<AppDispatch>();

    const productSelected = useSelector(
        (state: SellerRootState) => state.seller.productSelected
    );

    const presentations = useSelector(
        (state: PresentationState) => state.presentation.presentations,
        shallowEqual
    );

    useEffect(() => {
        const productId = productSelected?._id;
        if (!productId) return;
        void dispatch(fetchPresentationsByProductId(productId));
    }, [dispatch, productSelected]);

    return { productSelected, presentations };
};

export default useCartPresentationPicker;