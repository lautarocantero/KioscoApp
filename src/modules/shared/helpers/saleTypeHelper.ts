// helpers/presentation/saleType.ts
import type { Presentation } from "@typings/presentation/presentationTypes";
import { SALE_TYPE_LABELS } from "@typings/presentation/presentationCategoryLabels";

export const GRAMS_PER_WEIGHT_UNIT = 100;

/*══════════════════════════════════════════════════════════════════════╗
║ 🔎 isWeightSaleType                                                   ║
║ Devuelve true si la presentación/sale_type corresponde a venta por   ║
║ peso (stock/cantidades expresadas en gramos).                        ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const isWeightSaleType = (saleType?: string): boolean =>
  saleType === SALE_TYPE_LABELS.weight;

/*══════════════════════════════════════════════════════════════════════╗
║ 🔎 formatStockQuantity                                                ║
║ Formatea un valor de stock/cantidad agregando el sufijo "g" cuando   ║
║ la presentación es por peso.                                         ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const formatStockQuantity = (value: number | string, saleType?: string): string =>
  isWeightSaleType(saleType) ? `${value}g` : `${value}`;

/*══════════════════════════════════════════════════════════════════════╗
║ 🔎 getTotalPresentationsStock                                         ║
║ Suma el stock de un array de presentaciones, contando como 1 unidad  ║
║ cada presentación por peso en vez de sumar sus gramos.                ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const getTotalPresentationsStock = (presentations?: Presentation[]): number =>
  (presentations ?? []).reduce((acc: number, p: Presentation) => {
    if (isWeightSaleType(p?.sale_type)) {
      return acc + ((p?.stock ?? 0) > 0 ? 1 : 0);
    }
    return acc + (p?.stock ?? 0);
  }, 0);

/*══════════════════════════════════════════════════════════════════════╗
║ 🔎 formatWeightAwarePrice                                             ║
║ Label y valor de precio, ajustado a "por 100g" cuando la              ║
║ presentación es por peso.                                             ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const getPriceLabel = (saleType?: string): string =>
  isWeightSaleType(saleType) ? "Precio por 100g" : "Precio";

export const formatPriceValue = (price: number, saleType?: string): string =>
  isWeightSaleType(saleType) ? `$ ${price} / 100g` : `$ ${price}`;