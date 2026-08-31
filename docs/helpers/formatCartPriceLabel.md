# 🧰 `formatCartPriceLabel`

> Precio formateado de una línea del carrito, con el sufijo `/100 g` para venta por peso.

## 📦 Firma

```ts
formatCartPriceLabel(price: number, isWeight: boolean, t: TFunction): string
```

## 💡 Ejemplo

```ts
formatCartPriceLabel(100, false, t);   // "$ 100,00"
formatCartPriceLabel(1180, true, t);   // "$ 1.180,00 /100 g"
```
