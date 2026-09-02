# 🧰 `getMascotFaceOpacity`

> Opacidad de la cara-mascota del carrito según si está vacío o tiene ítems.

## 📦 Firma

```ts
getMascotFaceOpacity(isEmpty: boolean): number
```

- Vacío (`true`): `1` — la cara se ve a pleno, es la ilustración principal.
- Con ítems (`false`): `0.07` — la cara queda como marca de agua sutil detrás
  del contenido (pago, resumen, footer).

## 💡 Ejemplo

```ts
getMascotFaceOpacity(true);  // 1
getMascotFaceOpacity(false); // 0.07
```
