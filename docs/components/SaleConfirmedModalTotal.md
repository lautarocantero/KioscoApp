# 🧩 `SaleConfirmedModalTotal`

> Banda destacada de "Total cobrado" + fila de "Vuelto" del ticket de `SaleConfirmedModal`.

## 📦 Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `formattedTotal` | `string` | Total ya formateado como moneda (`getSaleConfirmedSummaryFields`). |
| `formattedChange` | `string` | Vuelto ya formateado como moneda. |

Toma sus colores de `theme.custom.saleTicket.totalBg` / `totalBorder` /
`totalLabel` / `changeColor`.

## 💡 Ejemplo

```tsx
const { formattedTotal, formattedChange } = getSaleConfirmedSummaryFields(ticketSummary);

<SaleConfirmedModalTotal formattedTotal={formattedTotal} formattedChange={formattedChange} />
```

## Tests

- Cubierto por `src/modules/cart/test/SaleConfirmed/SaleConfirmedModal.test.tsx`.
