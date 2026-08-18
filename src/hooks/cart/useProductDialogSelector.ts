import { useCallback, useContext, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useDelegatedHandler } from "../shared/useDelegatedHandler";
import type { AppDispatch } from "../../store/cart/cartSlice";
import { SnackBarContext } from "../../modules/shared/components/SnackBar/SnackBarContext";
import type { Presentation } from "@typings/presentation/presentationTypes";
import { AlertColor } from "@typings/ui/ui";
import type { AddedItem, UseProductDialogSelectorReturn } from "@typings/cart/cartTypes";
import { calculateItemAmount, isWeightSaleType } from "../../modules/shared/helpers/saleTypeHelper";
import type { Product } from "@typings/product/productTypes";
import handleAddProductDialogItemToCart from "../../modules/cart/components/ProductDialog/handleAddProductItemToCart";
import { buildColumnsForProductDialog } from "../../modules/cart/components/ProductDialog/productDialogColumns";
import type { RootState } from "../../store/cart/cartSlice";
import { getConfiguredCurrency, getCurrencyIsoCode, getCurrencyLocale } from "../../modules/shared/helpers/getConfiguredCurrency";


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

const useProductDialogSelector = (products?: Presentation[], product?: Product,): UseProductDialogSelectorReturn => {
  const isEmpty = useMemo(() => (products?.length ?? 0) === 0, [products]);

  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { showSnackBar } = useContext(SnackBarContext)!;

  const cart = useSelector((state: RootState) => state.cart.cart);

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
    (presentationId: string): number =>
      cart
        .filter((item: { _id: string | number; sale_type?: string; stock_required: number }) => item._id === presentationId)
        .reduce((acc: number, item: { _id: string | number; sale_type?: string; stock_required: number }) => {
          const itemQuantity = isWeightSaleType(item.sale_type)
            ? item.stock_required * 100
            : item.stock_required;
          return acc + itemQuantity;
        }, 0),
    [cart],
  );

  //─── 🔎 valida stock disponible, recorta cantidad si excede, y despacha el agregado al carrito 🔎 ───
  const handleAddToCart = useDelegatedHandler(
    async ({ presentation, quantity }: { presentation: Presentation; quantity: number }) => {
      const alreadyInCart = getQuantityInCart(String(presentation._id));
      const availableStock = (presentation.stock ?? 0) - alreadyInCart;

      if (availableStock <= 0) {
        showSnackBar(t("cart.snackbar.outOfStock", { name: presentation.name }), AlertColor.Error);
        return;
      }

      const quantityToAdd = Math.min(quantity, availableStock);

      if (quantityToAdd < quantity) {
        showSnackBar(
          t("cart.snackbar.partiallyAdded", { quantity: quantityToAdd, name: presentation.name }),
          AlertColor.Warning,
        );
      }

      const wasAdded: boolean = await handleAddProductDialogItemToCart({
        presentation,
        quantity: quantityToAdd,
        dispatch,
        showSnackBar,
        t,
      });

      if (!wasAdded) return;

      const unitPrice = presentation?.price ?? 0;
      const amount = calculateItemAmount(presentation?.price ?? 0, quantityToAdd, presentation.sale_type);

      setAddedItems((prev) => [
        ...prev,
        {
          presentationId: String(presentation?._id),
          price: unitPrice,
          quantity: quantityToAdd,
          amount,
        },
      ]);

    },
    [dispatch, showSnackBar, cart, t],
  );

  const formatter = useMemo(() => {
    const currency = getConfiguredCurrency();
    return new Intl.NumberFormat(getCurrencyLocale(currency), {
      style: "currency",
      currency: getCurrencyIsoCode(currency),
      minimumFractionDigits: 2,
    });
  }, []);

  //─── 🔎 total acumulado (precio × cantidad) de lo agregado en esta sesión de diálogo 🔎 ───
  const sessionTotal = useMemo(
    () => addedItems.reduce((acc, item) => acc + item.amount, 0),
    [addedItems],
  );

    const columns = useMemo(
    () =>
      buildColumnsForProductDialog({
        getQuantity,
        handleQuantityChange,
        handleAddToCart,
        fallbackImage: product?.image_url,
        t,
      }),
    [getQuantity, handleQuantityChange, handleAddToCart, product?.image_url, t],
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