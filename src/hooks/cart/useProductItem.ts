import { useContext, useMemo } from "react";
import { useDispatch } from "react-redux";
import type { ProductWithPresentations } from "@typings/product/productTypes";
import type { AppDispatch } from "../../store/cart/cartSlice";
import type { getProductSelectedPayload } from "@typings/cart/cartTypes";
import { selectProductThunk } from "../../store/cart/cartThunks";
import type { Presentation } from "@typings/presentation/presentationTypes";
import { getTotalPresentationsStock } from "../../modules/shared/helpers/stockHandler";
import { ProductDialogContext } from "../../modules/cart/context/Product/ProductDialogContext";


export const useProductItem = (product: ProductWithPresentations) => {

  const { setShowModal } = useContext(ProductDialogContext)!;
  const dispatch = useDispatch<AppDispatch>();

  const selectProduct = async ({ product }: Partial<getProductSelectedPayload>): Promise<void> => {
    if (!product) throw new Error("No se ha seleccionado un producto");
    await dispatch(selectProductThunk({ productData: product }));
    setShowModal(true);
  };

  const handleSelect = () => selectProduct({ product });

  return { handleSelect };
};

export const useProductStock = (presentations?: Presentation[]) => {
  const totalStock = useMemo(
    () => getTotalPresentationsStock(presentations),
    [presentations]
  );

  return { totalStock };
};