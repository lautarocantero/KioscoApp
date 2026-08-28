# ProductItemComponent — Documentación

## ¿Para qué sirve?

Card de un producto en la grilla de `/new-sell`. Header clickeable (avatar + nombre) que abre el `ProductDialog` para ver detalle/variantes raras, y debajo la lista de presentaciones inline (`ProductItemData`) — cada una con su propio botón `+` para agregar directo al carrito sin pasar por el diálogo.

Puramente presentacional — toda la lógica (seleccionar producto, agregar una presentación) viene resuelta por `useProductItem`.

## Props (`ProductItemProps`)

```ts
interface ProductItemProps {
  product: Product;
  viewMode?: ViewMode;
}
```

## Comportamiento

- Ya no tiene `maxWidth`/altura fija — el tamaño lo controla el grid padre (`minmax(240px, 1fr)` en `useProductsExhibitor.gridSx`), porque la altura ahora varía según cuántas presentaciones tenga el producto.
- El header (avatar + nombre) es accesible por teclado (`role="button"`, `tabIndex`, `Enter`/`Espacio`).

## Ejemplo de uso

```tsx
<ProductItemComponent product={product} />
```

## Ver también

- [ProductItemAvatar](./ProductItemAvatar.md)
- [ProductItemPresentationRow](./ProductItemPresentationRow.md)
