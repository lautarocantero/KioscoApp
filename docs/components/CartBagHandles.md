# 🧩 `CartBagHandles`

> Las dos asas SVG ancladas arriba del card del carrito (forma de bolsa).

## 📦 Props

No recibe props — se posiciona con `position:absolute` relativo al primer
ancestro posicionado (el wrapper de `CartComponent`) y toma sus colores de
`theme.custom.cartBag.handlePrimary` / `handleSecondary`.

## 💡 Ejemplo

```tsx
<Box sx={{ position: "relative" }}>
  <CartBagHandles />
  {/* card del carrito */}
</Box>
```
