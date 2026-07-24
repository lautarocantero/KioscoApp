import { useCallback, useContext, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useDelegatedHandler } from "../shared/useDelegatedHandler";
import type { AppDispatch } from "../../store/presentation/presentationSlice";
import { SnackBarContext } from "../../modules/shared/components/SnackBar/SnackBarContext";
import type { Presentation } from "@typings/presentation/presentationTypes";
import handleAddProductDialogItemToCart from "../../modules/sells/components/ProductDialog/handleAddProductItemToCart";
import { buildColumnsForProductDialog } from "../../modules/sells/components/ProductDialog/productDialogColumns";
import type { AddedItem, UseProductDialogSelectorReturn } from "@typings/sells/sellTypes";


const useProductDialogSelector = (products?: Presentation[]): UseProductDialogSelectorReturn => {
  const isEmpty = useMemo(() => (products?.length ?? 0) === 0, [products]);

  const dispatch = useDispatch<AppDispatch>();
  const { showSnackBar } = useContext(SnackBarContext)!;

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedItems, setAddedItems] = useState<AddedItem[]>([]);

  const getQuantity = useCallback(
    (presentationId: string) => quantities[presentationId] ?? 1,
    [quantities],
  );

  const handleQuantityChange = useCallback((presentationId: string, value: number | null) => {
    setQuantities((prev) => ({ ...prev, [presentationId]: value ?? 1 }));
  }, []);

  const handleAddToCart = useDelegatedHandler(
    async ({ presentation, quantity }: { presentation: Presentation; quantity: number }) => {
      const wasAdded: boolean = await handleAddProductDialogItemToCart({ presentation, quantity, dispatch, showSnackBar });

      if (!wasAdded) return;

      setAddedItems((prev) => [
        ...prev,
        { presentationId: String(presentation?._id), price: presentation?.price ?? 0, quantity },
      ]);
    },
    [dispatch, showSnackBar],
  );

  const formatter = useMemo(
    () => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 2 }),
    [],
  );

  const sessionTotal = useMemo(
    () => addedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [addedItems],
  );

  const columns = useMemo(
    () => buildColumnsForProductDialog({ getQuantity, handleQuantityChange, handleAddToCart }),
    [getQuantity, handleQuantityChange, handleAddToCart],
  );

  return {
    isEmpty,
    getQuantity,
    handleQuantityChange,
    handleAddToCart,
    formatter,
    sessionTotal,
    addedItems,
    columns,
  };
};

export default useProductDialogSelector;