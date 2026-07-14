import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import type { AppDispatch, RootState as PresentationState } from "../../store/presentation/presentationSlice";
import { getPresentationsById } from "../../store/presentation/presentationThunks";
import type { RootState as SellerRootState } from "../../store/seller/sellerSlice";
import type { Presentation } from "@typings/presentation/presentationTypes";

interface usePresentationsInterface {
    productSelected: Presentation | null;
    presentations: Presentation[];
}

const useCartPresentationPicker = (): usePresentationsInterface =>  {
  const dispatch = useDispatch<AppDispatch>();

  const productSelected = useSelector(
    (state: SellerRootState) => state.seller.productSelected
  );

  const presentations = useSelector(
    (state: PresentationState) => state.presentation.Presentations,
    shallowEqual
  );

  useEffect(() => {
    const fetchVariants = async () => {
      const _idResult: string | null | undefined = productSelected?._id;
      if (!_idResult) return;
      await dispatch(getPresentationsById(_idResult));
    };

    fetchVariants();
  }, [dispatch, productSelected]);

  return {productSelected, presentations};
}

export default useCartPresentationPicker;