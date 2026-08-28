# 🪝 `useProductItem` / `useProductStock`

> Lógica de la card de producto de `/new-sell`.

## 🎯 ¿Para qué sirve?

- `useProductItem(product)` — `handleSelect` abre el `ProductDialog` con ese producto (para ver detalle/variantes raras); `handleAddPresentation(presentation)` agrega esa presentación directo al carrito, reusando el mismo pipeline que el diálogo (`handleAddProductDialogItemToCart`), sin abrir nada.
- `useProductStock(presentations)` — suma el stock total de un array de presentaciones (ya existía, sin cambios).

## 📦 Firma

```ts
useProductItem(product: ProductWithPresentations): UseProductItemReturn
useProductStock(presentations?: Presentation[]): UseProductStockReturn
```

## 💡 Ejemplo

```tsx
const { handleSelect, handleAddPresentation } = useProductItem(product);
<ProductItemAvatar name={product.name} onClick={handleSelect} />
<ProductItemPresentationRow presentation={p} onAdd={handleAddPresentation} />
```

## ✨ Notas

- La cantidad agregada por `handleAddPresentation` es `1` para venta por unidad y `100` (gramos) para venta por peso (`getDefaultAddQuantity`).
- Si la presentación ya está en el carrito, el pipeline compartido suma la cantidad en vez de duplicar la fila — no hay lógica extra acá.
