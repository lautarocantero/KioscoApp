# CartLineItem — Documentación

## ¿Para qué sirve?

Una fila del carrito lateral de `/new-sell`: imagen, nombre + variante + precio unitario, cantidad (stepper `−`/`+` para venta por unidad, input editable en gramos para venta por peso), subtotal editable y botón de quitar. Reemplaza la fila de `DataGrid` que usaba `CartProductTableComponent` — un `DataGrid` no entra cómodo en una columna de 380px.

## Props (`CartLineItemProps`)

```ts
interface CartLineItemProps extends CartItemHandlers {
  product: ProductTicketWithStockType;
}
```

`CartItemHandlers` (`onIncrease` / `onDecrease` / `onSubtotalChange` / `onQuantityChange`) vienen resueltos por `useCart` — el componente no calcula nada, solo los invoca con el `_id` del producto.

## Comportamiento

- Venta por peso (`isWeightSaleType`): cantidad libre vía `EditableNumberCell`, sufijo "g".
- Venta por unidad: stepper `−`/`+`.
- El subtotal siempre es editable a mano (`EditableNumberCell`) — mismo comportamiento que ya existía en la tabla.
- La eliminación de la fila delega en `CartProductRowActionCell` (ya existente, sin cambios).

## Ejemplo de uso

```tsx
<CartLineItem
  product={product}
  onIncrease={handleIncreaseProduct}
  onDecrease={handleDecreaseProduct}
  onSubtotalChange={handleSubtotalChange}
  onQuantityChange={handleQuantityChange}
/>
```
