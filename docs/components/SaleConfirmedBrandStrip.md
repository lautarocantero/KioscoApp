# 🧩 `SaleConfirmedBrandStrip`

> Franja de marca del ticket de `SaleConfirmedModal`: mascota de Stocko + wordmark "STOKO" + tagline.

## 📦 Props

No recibe props — contenido estático. Usa
`getPublicAssetUrl("images/logo/Stocko-mascotCircle-happy.png")` para la
mascota y `theme.custom.saleTicket.text` / `theme.palette.primary.main` /
`theme.custom.saleTicket.textMuted` para sus colores.

## 💡 Ejemplo

```tsx
<SaleConfirmedDivider />
<SaleConfirmedBrandStrip />
<SaleConfirmedDivider />
```

## Tests

- Cubierto por `src/modules/cart/test/SaleConfirmed/SaleConfirmedModal.test.tsx` (verifica el wordmark "STOK").
