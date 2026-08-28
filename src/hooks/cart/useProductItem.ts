import { useContext, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import type { ProductWithPresentations } from "@typings/product/productTypes";
import type { AppDispatch } from "../../store/cart/cartSlice";
import type { getProductSelectedPayload, UseProductItemReturn, UseProductStockReturn } from "@typings/cart/cartTypes";
import { selectProductThunk } from "../../store/cart/cartThunks";
import type { Presentation } from "@typings/presentation/presentationTypes";
import { getTotalPresentationsStock } from "../../modules/shared/helpers/stockHandler";
import { getDefaultAddQuantity } from "../../modules/shared/helpers/saleTypeHelper";
import { ProductDialogContext } from "../../modules/cart/context/Product/ProductDialogContext";
import { SnackBarContext } from "../../modules/shared/components/SnackBar/SnackBarContext";
import handleAddProductDialogItemToCart from "../../modules/cart/components/ProductDialog/handleAddProductItemToCart";


export const useProductItem = (product: ProductWithPresentations): UseProductItemReturn => {

  const { setShowModal } = useContext(ProductDialogContext)!;
  const { showSnackBar } = useContext(SnackBarContext)!;
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const selectProduct = async ({ product }: Partial<getProductSelectedPayload>): Promise<void> => {
    if (!product) throw new Error("No se ha seleccionado un producto");
    await dispatch(selectProductThunk({ productData: product }));
    setShowModal(true);
  };

  const handleSelect = () => selectProduct({ product });

  const handleAddPresentation = (presentation: Presentation): void => {
    void handleAddProductDialogItemToCart({
      presentation,
      quantity: getDefaultAddQuantity(presentation.sale_type),
      dispatch,
      showSnackBar,
      t,
    });
  };

  return { handleSelect, handleAddPresentation };
};

export const useProductStock = (presentations?: Presentation[]): UseProductStockReturn => {
  const totalStock = useMemo(
    () => getTotalPresentationsStock(presentations),
    [presentations]
  );

  return { totalStock };
};