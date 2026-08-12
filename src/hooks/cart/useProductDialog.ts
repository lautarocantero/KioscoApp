import { useContext, useMemo } from "react";
import type { UseProductDialogReturn } from "@typings/sells/sellTypes";
import useCartPresentationPicker from "./useCartPresentationPicker";
import { getTotalPresentationsStock } from "../../modules/shared/helpers/stockHandler";
import { ProductDialogContext } from "../../modules/cart/context/Product/ProductDialogContext";

/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useProductDialog                                                   ║
║                                                                       ║
║ Orquesta el estado general del ProductDialog:                        ║
║   1. Consume el show/hide del modal desde ProductDialogContext        ║
║   2. Delega en useCartPresentationPicker la elección de producto/     ║
║      presentación seleccionada                                        ║
║   3. Calcula el stock total sumando todas las presentaciones y lo     ║
║      formatea para mostrar en UI                                      ║
╚══════════════════════════════════════════════════════════════════════╝*/

const useProductDialog = (): UseProductDialogReturn => {
  const { showModal, setShowModal } = useContext(ProductDialogContext)!;

  const { productSelected, presentations } = useCartPresentationPicker();

  //─── 🔎 stock total de las presentaciones 🔎 ───
  const totalStock = useMemo(
    () => getTotalPresentationsStock(presentations),
    [presentations],
  );

  const formattedTotalStock = useMemo(
    () => new Intl.NumberFormat("es-AR").format(totalStock),
    [totalStock],
  );

  return {
    showModal,
    setShowModal,
    productSelected,
    presentations,
    totalStock,
    formattedTotalStock,
  };
};

export default useProductDialog;