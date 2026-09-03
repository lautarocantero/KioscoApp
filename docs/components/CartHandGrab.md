# 🧩 `CartHandGrab`

> La mano ilustrada que "agarra" las asas de la bolsa del carrito durante `useCartClearAnimation`.

## 📦 Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `style` | `Pick<CSSProperties, 'transform' \| 'opacity'>` | Pose actual (oculta / agarrando / levantada), la calcula `useCartClearAnimation`. |

Se posiciona con `position:absolute` sobre las asas (mismo ancestro
posicionado que `CartBagHandles`) y toma sus colores de
`theme.custom.darkMain`, `theme.custom.lightMain` y
`theme.custom.cartBag.face`.

## 💡 Ejemplo

```tsx
const { handStyle } = useCartClearAnimation();

<Box sx={{ position: "relative" }}>
  <CartHandGrab style={handStyle} />
  <CartBagHandles />
</Box>
```

## Tests

- `src/modules/cart/test/CartComponent/CartHandGrab.test.tsx`
