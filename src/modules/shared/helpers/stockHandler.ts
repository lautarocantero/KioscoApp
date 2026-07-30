import { SALE_TYPE_LABELS } from "@typings/presentation/presentationCategoryLabels";
import type { Presentation } from "@typings/presentation/presentationTypes";

export const getStockStatus = ({stock, minStock} : {stock: number, minStock: number}) => {
  if (stock <= 0) return { label: 'Sin stock', color: 'error' as const };
  if (stock <= minStock) return { label: 'Stock bajo', color: 'warning' as const };
  return { label: 'En stock', color: 'success' as const };
};

/*══════════════════════════════════════════════════════════════════════╗
║ 🔎 getTotalPresentationsStock                                         ║
║                                                                       ║
║ Suma el stock de un array de presentaciones, contando como 1 unidad  ║
║ cada presentación "weight" (su stock está en gramos, no en unidades) ║
║ en vez de sumar su peso.                                              ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const getTotalPresentationsStock = (presentations?: Presentation[]): number =>
  (presentations ?? []).reduce((acc: number, p: Presentation) => {
    if (p?.sale_type === SALE_TYPE_LABELS.weight) {
      return acc + ((p?.stock ?? 0) > 0 ? 1 : 0);
    }
    return acc + (p?.stock ?? 0);
  }, 0);