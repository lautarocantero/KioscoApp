# 🧩 `CartBagHandles`

> Las dos asas SVG ancladas arriba del card del carrito (forma de bolsa).

## 📦 Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `style` | `Pick<CSSProperties, 'transform'>` (opcional) | Transform de "apretón" mientras `useCartClearAnimation` está en fase `grab`/`lift`. |

Se posiciona con `position:absolute` relativo al primer ancestro
posicionado (el wrapper de `CartComponent`) y toma sus colores de
`theme.custom.cartBag.handlePrimary` / `handleSecondary`.

## 💡 Ejemplo

```tsx
<Box sx={{ position: "relative" }}>
  <CartBagHandles style={handlesStyle} />
  {/* card del carrito */}
</Box>
```
