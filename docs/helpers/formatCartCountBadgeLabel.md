# 🧰 `formatCartCountBadgeLabel`

> Label del badge del header del carrito: `"vacío"` o `"N ítems"`.

## 📦 Firma

```ts
formatCartCountBadgeLabel(itemsCount: number, t: TFunction): string
```

## 💡 Ejemplo

```ts
formatCartCountBadgeLabel(0, t); // "vacío"
formatCartCountBadgeLabel(4, t); // "4 ítems"
```
