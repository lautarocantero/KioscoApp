import { useCallback, useContext, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDelegatedHandler } from "../shared/useDelegatedHandler";
import type { AppDispatch } from "../../store/presentation/presentationSlice";
import { SnackBarContext } from "../../modules/shared/components/SnackBar/SnackBarContext";
import type { Presentation } from "@typings/presentation/presentationTypes";
import type { RootState } from "../../store/seller/sellerSlice";
import { AlertColor } from "@typings/ui/ui";
import handleAddProductDialogItemToCart from "../../modules/sellers/api/components/ProductDialog/handleAddProductItemToCart";
import { buildColumnsForProductDialog } from "../../modules/sellers/api/components/ProductDialog/productDialogColumns";
import type { AddedItem, UseProductDialogSelectorReturn } from "@typings/seller/sellerTypes";
import { isWeightSaleType } from "../../modules/shared/helpers/saleTypeHelper";


/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useProductDialogSelector                                           ║
║                                                                       ║
║ Maneja la selección y agregado de presentaciones dentro del          ║
║ ProductDialog (elección de variante + cantidad):                     ║
║   1. Maneja cantidades por presentación (quantities) en estado local ║
║   2. Valida contra stock disponible (stock - lo ya puesto en cart)   ║
║      antes de agregar, recortando la cantidad si hace falta          ║
║   3. Despacha el agregado al carrito vía handleAddProductDialogItem  ║
║      ToCart y registra los ítems agregados en esta sesión de diálogo ║
║   4. Calcula el total formateado (ARS) de lo agregado en la sesión   ║
╚══════════════════════════════════════════════════════════════════════╝*/

const useProductDialogSelector = (products?: Presentation[]): UseProductDialogSelectorReturn => {
  const isEmpty = useMemo(() => (products?.length ?? 0) === 0, [products]);

  const dispatch = useDispatch<AppDispatch>();
  const { showSnackBar } = useContext(SnackBarContext)!;

  const cart = useSelector((state: RootState) => state.seller.cart);

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedItems, setAddedItems] = useState<AddedItem[]>([]);

  const getQuantity = useCallback(
    (presentationId: string) => {
      if (quantities[presentationId] !== undefined) {
        return quantities[presentationId];
      }
      const presentation = products?.find((p) => String(p._id) === presentationId);
      return isWeightSaleType(presentation?.sale_type) ? 100 : 1;
    },
    [quantities, products],
  );

  const handleQuantityChange = useCallback((presentationId: string, value: number | null) => {
    setQuantities((prev) => {
      const presentation = products?.find((p) => String(p._id) === presentationId);
      const fallback = isWeightSaleType(presentation?.sale_type) ? 100 : 1;
      return { ...prev, [presentationId]: value ?? fallback };
    });
  }, [products]);

  //─── 🔎 cuánto de esta presentación ya está en el carrito 🔎 ───
  const getQuantityInCart = useCallback(
    (presentationId: string) =>
      cart
        .filter((item) => item._id === presentationId)
        .reduce((acc, item) => acc + item.stock_required, 0),
    [cart],
  );

  //─── 🔎 valida stock disponible, recorta cantidad si excede, y despacha el agregado al carrito 🔎 ───
  const handleAddToCart = useDelegatedHandler(
    async ({ presentation, quantity }: { presentation: Presentation; quantity: number }) => {
      const alreadyInCart = getQuantityInCart(String(presentation._id));
      const availableStock = (presentation.stock ?? 0) - alreadyInCart;

      if (availableStock <= 0) {
        showSnackBar(`No queda stock disponible de '${presentation.name}'`, AlertColor.Error);
        return;
      }

      const quantityToAdd = Math.min(quantity, availableStock);

      if (quantityToAdd < quantity) {
        showSnackBar(
          `Solo se agregaron ${quantityToAdd} unidades disponibles de '${presentation.name}'`,
          AlertColor.Warning,
        );
      }

      const wasAdded: boolean = await handleAddProductDialogItemToCart({
        presentation,
        quantity: quantityToAdd,
        dispatch,
        showSnackBar,
      });

      if (!wasAdded) return;

      setAddedItems((prev) => [
        ...prev,
        { presentationId: String(presentation?._id), price: presentation?.price ?? 0, quantity: quantityToAdd },
      ]);
    },
    [dispatch, showSnackBar, cart],
  );

  const formatter = useMemo(
    () => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 2 }),
    [],
  );

  //─── 🔎 total acumulado (precio × cantidad) de lo agregado en esta sesión de diálogo 🔎 ───
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