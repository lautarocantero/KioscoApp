# 🧰 `calculateCartTotals`

> Único punto de cálculo de precios del carrito: descuento por ítem → subtotal → descuento global → IVA → total.

## 📦 Firma

```ts
calculateCartTotals(
  items: { lineBase: number; itemDiscountPercentage: number }[],
  globalDiscountPercentage: number,
  ivaPercentage: number
): {
  lines: number[];       // línea con descuento de ítem ya aplicado
  subtotal: number;      // Σ lines
  discountAmount: number;// subtotal * globalDiscountPercentage / 100
  net: number;            // subtotal - discountAmount
  ivaAmount: number;      // net * ivaPercentage / 100
  total: number;          // net + ivaAmount
}
```

## ✨ Notas

- `lineBase` ya debe venir en la unidad correcta (`calculateItemAmount` — precio × cantidad, o precio × gramos/100 para venta por peso).
- Los porcentajes se clampean a `[0, 100]` con `clampPercentage` antes de aplicarse — nunca hay que sanitizarlos antes de llamar a esta función.
- El descuento global se aplica **sobre el subtotal ya neto de descuentos por ítem**, y el IVA se calcula sobre el neto post-descuento-global (no sobre el subtotal bruto).

## 💡 Ejemplo

```ts
calculateCartTotals([{ lineBase: 1000, itemDiscountPercentage: 10 }], 10, 21);
// { lines: [900], subtotal: 900, discountAmount: 90, net: 810, ivaAmount: 170.1, total: 980.1 }
```
