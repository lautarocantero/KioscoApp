
/**
 * ┌───────────────────────────────────────────────┐
 * │           🪝 Hook: useProductVariants          │
 * └───────────────────────────────────────────────┘
 *
 * 📚 Propósito:
 * - Centralizar la lógica para obtener el producto seleccionado y sus variantes.
 * - Simplificar el consumo de datos en `ProductDialog` y otros componentes.
 *
 * ────────────────────────────────────────────────
 *
 * 🔧 Lógica:
 * 1. Usa Redux para leer `productSelected` y `productVariants`.
 * 2. Despacha `getProductVariantsById` cuando cambia el producto.
 * 3. Retorna ambos valores listos para usar en la UI.
 *
 * ────────────────────────────────────────────────
 *
 * 📝 Ejemplo:
 * 
 * const { productSelected, productVariants } = useProductVariants();
 * 
 * ────────────────────────────────────────────────*/


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