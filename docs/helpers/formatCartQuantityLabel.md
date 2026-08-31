# 🧰 `formatCartQuantityLabel`

> Label de cantidad de una línea del carrito: `"3 u"` o `"300 g"` según el tipo de venta.

## 📦 Firma

```ts
formatCartQuantityLabel(quantity: number, isWeight: boolean, t: TFunction): string
```

## 💡 Ejemplo

```ts
formatCartQuantityLabel(3, false, t);   // "3 u"
formatCartQuantityLabel(300, true, t);  // "300 g"
```
