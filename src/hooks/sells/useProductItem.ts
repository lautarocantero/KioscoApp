import { useContext, useMemo } from "react";
import { useDispatch } from "react-redux";
import type { Product } from "@typings/product/productTypes";
import type { AppDispatch } from "../../store/seller/sellerSlice";
import type { getProductSelectedPayload } from "@typings/seller/sellerTypes";
import { selectProductThunk } from "../../store/seller/sellerThunks";
import { ProductDialogContext } from "../../modules/sells/context/Product/ProductDialogContext";
import type { Presentation } from "@typings/presentation/presentationTypes";

export const useProductItem = (product: Product) => {
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
    () => presentations?.reduce((count, p) => count + p.stock, 0) ?? 0,
    [presentations]
  );

  return { totalStock };
};