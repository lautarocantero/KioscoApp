# 🧩 `CartGlobalDiscountRow`

> Fila de la banda de totales del carrito: input de descuento global (%) + monto descontado.

## 📦 Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `globalDiscount` | `string` | Valor crudo del input (dígitos, sin clamp — se muestra vacío cuando es `"0"`). |
| `onGlobalDiscountChange` | `(value: string) => void` | Handler del input (sanitiza a dígitos en `useCart`). |
| `discountAmount` | `number` | Monto ya calculado (`calculateCartTotals`) — se muestra como `− $X`. |

## 💡 Ejemplo

```tsx
<CartGlobalDiscountRow globalDiscount="10" onGlobalDiscountChange={handleGlobalDiscountChange} discountAmount={140} />
```

## ✨ Notas

El `aria-label` va en `slotProps.input` (no como prop directa de `InputBase`) porque el input está envuelto en un `<label>` con texto ("Descuento") — si el `aria-label` cae en el root en vez del `<input>`, el nombre accesible termina siendo la concatenación del texto del label + el aria-label, en vez de solo este último.
