import type { CartTotalsLineInput, CartTotalsResult } from "@typings/cart/cartTypes";
import { clampPercentage } from "./clampPercentage";

/*══════════════════════════════════════════════════════════════════════╗
║ 🔎 calculateCartTotals                                                ║
║ Único punto de cálculo de precios del carrito. Orden de operaciones:  ║
║   1. Cada línea aplica su descuento por ítem sobre lineBase.          ║
║   2. subtotal = Σ líneas (ya con descuento de ítem aplicado).         ║
║   3. El descuento global se aplica sobre ese subtotal.                ║
║   4. El IVA se calcula sobre el neto (subtotal - descuento global).   ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const calculateCartTotals = (
  items: CartTotalsLineInput[],
  globalDiscountPercentage: number,
  ivaPercentage: number
): CartTotalsResult => {
  const lines = items.map(({ lineBase, itemDiscountPercentage }) => {
    const pct = clampPercentage(itemDiscountPercentage);
    return lineBase * (1 - pct / 100);
  });

  const subtotal = lines.reduce((sum, line) => sum + line, 0);
  const globalPct = clampPercentage(globalDiscountPercentage);
  const discountAmount = (subtotal * globalPct) / 100;
  const net = subtotal - discountAmount;
  const ivaAmount = (net * ivaPercentage) / 100;
  const total = net + ivaAmount;

  return { lines, subtotal, discountAmount, net, ivaAmount, total };
};
