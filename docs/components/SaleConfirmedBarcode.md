# 🧩 `SaleConfirmedBarcode`

> Código de barras decorativo + número de ticket, al pie del recibo de `SaleConfirmedModal`.

## 📦 Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `code` | `string` | Texto mostrado debajo de las barras (el N° de ticket real). Las barras son puramente decorativas — no codifican `code`. |

Toma sus colores de `theme.custom.saleTicket.text` (barras) y
`theme.custom.saleTicket.textMuted` (texto del código).

## 💡 Ejemplo

```tsx
<SaleConfirmedBarcode code={ticketSummary.ticketNumber} />
```

## Tests

- `src/modules/cart/test/SaleConfirmed/SaleConfirmedBarcode.test.tsx`
