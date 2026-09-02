# 🧩 `CartMascotFace`

> Cara de la mascota del carrito: cejas, ojos que siguen el mouse y boca.

## 📦 Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `eyeOffset` | `{ x: number; y: number }` | Desplazamiento de los ojos, de `useMascotEyeTracking`. |
| `opacity` | `number` | `1` en carrito vacío (ilustración principal), `0.07` con ítems (marca de agua), de `getMascotFaceOpacity`. |

Colores desde `theme.custom.cartBag.face` (línea de cejas/ojos/boca) y
`theme.custom.background` (recorte de la sonrisa, para que se funda con el
fondo real del card).

## 💡 Ejemplo

```tsx
<CartMascotFace eyeOffset={eyeOffset} opacity={getMascotFaceOpacity(isEmpty)} />
```

## Tests

- `src/modules/cart/test/CartComponent/CartMascotFace.test.tsx`
