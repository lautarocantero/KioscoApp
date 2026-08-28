# CartItemsList — Documentación

## ¿Para qué sirve?

Banda 2 (scrollable) del carrito lateral de `/new-sell`: lista semántica (`<ul>`) de `CartLineItem`, o `EmptyCartComponent` si el carrito está vacío. La monta `CartComponent` dentro de un contenedor con `flex:1 1 auto; minHeight:0; overflowY:auto`, para que sea la única zona que scrollea libremente dentro del carrito.

## Props (`CartItemsListProps`)

```ts
interface CartItemsListProps extends CartItemHandlers {
  cart: ProductTicketWithStockType[];
}
```

## Ejemplo de uso

```tsx
<CartItemsList
  cart={cart}
  onIncrease={handleIncreaseProduct}
  onDecrease={handleDecreaseProduct}
  onSubtotalChange={handleSubtotalChange}
  onQuantityChange={handleQuantityChange}
/>
```

## Ver también

- [CartLineItem](./CartLineItem.md)
