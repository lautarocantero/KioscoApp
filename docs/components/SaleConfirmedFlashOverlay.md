# 🧩 `SaleConfirmedFlashOverlay`

> Flash verde a pantalla completa tipo e-commerce, disparado junto con `SaleConfirmedModal`.

## 📦 Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `open` | `boolean` | Mismo booleano que abre `SaleConfirmedModal` (`isSaleConfirmedModalOpen`). Si es `false`, no renderiza nada. |

Tres capas fijas (`position: fixed; inset: 0`), puramente decorativas
(`aria-hidden`, `pointerEvents: none`): un tinte sólido, un halo radial
(ambos con `theme.palette.success.main`) y un anillo (`theme.custom.white`)
que se expande y se desvanece. Se monta por debajo del `Dialog` de
`SaleConfirmedModal` (zIndex 1200 vs. 1300 default de MUI).

## 💡 Ejemplo

```tsx
<SaleConfirmedFlashOverlay open={isSaleConfirmedModalOpen} />
<SaleConfirmedModal open={isSaleConfirmedModalOpen} ... />
```

## Tests

- `src/modules/cart/test/SaleConfirmed/SaleConfirmedFlashOverlay.test.tsx`
