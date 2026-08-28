// helpers/presentation/saleType.ts
import type { Presentation } from "@typings/presentation/presentationTypes";
import { SALE_TYPE_VALUES } from "@typings/presentation/presentationEnum";
import { clampStock } from "../../../utils/formatter/clampStock";

export const GRAMS_PER_WEIGHT_UNIT = 100;

export const isWeightSaleType = (saleType?: string): boolean =>
  saleType === SALE_TYPE_VALUES[1];

// Cantidad por defecto al agregar una presentación de un solo click (buscador,
// card inline, lista densa): 1 unidad, o 100g (un paso) si es venta por peso.
export const getDefaultAddQuantity = (saleType?: string): number =>
  isWeightSaleType(saleType) ? GRAMS_PER_WEIGHT_UNIT : 1;

/*══════════════════════════════════════════════════════════════════════╗
║ 🔎 formatStockQuantity                                                ║
║ Formatea un valor YA EXPRESADO EN UNIDADES REALES (gramos reales para ║
║ weight, unidades reales para unit) — sirve para stock Y stock_required║
║ El stock nunca se muestra negativo, aunque el dato de origen lo esté. ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const formatStockQuantity = (value: number | string, saleType?: string): string => {
  const clamped = clampStock(Number(value));
  return isWeightSaleType(saleType) ? `${clamped}g` : `${clamped}`;
};

export const getTotalPresentationsStock = (presentations?: Presentation[]): number =>
  (presentations ?? []).reduce((acc: number, p: Presentation) => {
    if (isWeightSaleType(p?.sale_type)) {
      return acc + (clampStock(p?.stock ?? 0) > 0 ? 1 : 0);
    }
    return acc + clampStock(p?.stock ?? 0);
  }, 0);

export const formatWeightAwareQuantity = (quantity: number, saleType?: string): string => {
  return formatStockQuantity(quantity, saleType);
};

export const getPriceLabel = (saleType?: string): string =>
  isWeightSaleType(saleType) ? "Precio por 100g" : "Precio";

export const formatPriceValue = (price: number, saleType?: string): string =>
  isWeightSaleType(saleType) ? `$ ${price} / 100g` : `$ ${price}`;

/*══════════════════════════════════════════════════════════════════════╗
║ 🔎 calculateItemAmount                                                ║
║ Recibe cantidad en UNIDADES REALES (gramos reales o unidades reales). ║
║ Para weight, el precio es "por cada 100g", por eso se divide acá.     ║
║ Única función de cálculo de monto en todo el sistema — se usa igual   ║
║ en ProductDialog (quantityToAdd) y en el carrito (stock_required),    ║
║ porque ambos ya están en la misma unidad real.                        ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const calculateItemAmount = (price: number, quantity: number, saleType?: string): number =>
  isWeightSaleType(saleType) ? price * (quantity / GRAMS_PER_WEIGHT_UNIT) : price * quantity;