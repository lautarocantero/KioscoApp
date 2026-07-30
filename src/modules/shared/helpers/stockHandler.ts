import type { Presentation } from "@typings/presentation/presentationTypes";
import { isWeightSaleType } from "./saleTypeHelper";

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
    if (isWeightSaleType(p?.sale_type)) {
      return acc + ((p?.stock ?? 0) > 0 ? 1 : 0);
    }
    return acc + (p?.stock ?? 0);
  }, 0);