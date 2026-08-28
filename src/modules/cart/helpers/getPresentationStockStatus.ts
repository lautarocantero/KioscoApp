import type { TFunction } from "i18next";
import { StockStatus } from "@typings/cart/cartEnums";
import { clampStock } from "../../../utils/formatter/clampStock";

/*══════════════════════════════════════════════════════════════════════╗
║ 🚦 getPresentationStockStatus                                         ║
║ Semáforo de stock reutilizado en el dropdown de búsqueda, las filas   ║
║ inline de la card y la lista densa. "Bajo" reusa min_stock (el mismo  ║
║ umbral configurable que ya usa /shop para el reporte de reposición)   ║
║ en vez de un número fijo, para no duplicar la regla de negocio.       ║
║                                                                       ║
║ No confundir con stockHandler.getStockStatus (chip del ProductDialog:║
║ 3 estados sin noción de venta por peso, colores semánticos de MUI).  ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const getPresentationStockStatus = (
  stock: number,
  minStock: number,
  isWeight: boolean,
  t: TFunction
): { status: StockStatus; label: string } => {
  const clamped = clampStock(stock);

  if (isWeight) {
    return { status: StockStatus.Weight, label: t("cart.stockStatus.weight", { stock: clamped }) };
  }

  if (clamped <= minStock) {
    return { status: StockStatus.Low, label: t("cart.stockStatus.low", { stock: clamped }) };
  }

  return { status: StockStatus.Ok, label: t("cart.stockStatus.ok", { stock: clamped }) };
};

// Regla compartida por el dropdown de búsqueda, las filas inline de la card
// y la lista densa: sin stock y no es venta por peso → no se puede agregar.
export const isAddDisabled = (stock: number, isWeight: boolean): boolean => !isWeight && clampStock(stock) <= 0;

export default getPresentationStockStatus;
