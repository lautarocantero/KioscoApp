
/**
 * Hook que obtiene las variantes de producto asociadas al producto seleccionado.
 * Encapsula la lógica de useEffect y Redux para mantener el componente limpio.
 */

import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import type { AppDispatch, RootState as ProductVariantState } from "../../store/productVariant/productVariantSlice";
import { getProductVariantsById } from "../../store/productVariant/productVariantThunks";
import type { RootState as SellerRootState } from "../../store/seller/sellerSlice";
import type { ProductVariant } from "@typings/productVariant/productVariant";

interface useProductVariantsInterface {
    productSelected: ProductVariant | null;
    productVariants: ProductVariant[];
}

const useProductVariants = (): useProductVariantsInterface =>  {
  const dispatch = useDispatch<AppDispatch>();

  const productSelected = useSelector(
    (state: SellerRootState) => state.seller.productSelected
  );

  const productVariants = useSelector(
    (state: ProductVariantState) => state.productVariant.productVariants,
    shallowEqual
  );

  useEffect(() => {
    const fetchVariants = async () => {
      const _idResult: string | null | undefined = productSelected?._id;
      if (!_idResult) return;
      await dispatch(getProductVariantsById(_idResult));
    };

    fetchVariants();
  }, [dispatch, productSelected]);

  return {productSelected, productVariants};
}

export default useProductVariants;