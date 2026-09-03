# 🧩 `SaleConfirmedTicketEdge`

> El borde dentado (troquel de recibo) arriba y abajo del ticket blanco de `SaleConfirmedModal`.

## 📦 Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `flipped` | `boolean` (opcional, default `false`) | `true` para el borde de abajo (mismo zig-zag, invertido en Y). |

Toma su color de `theme.custom.saleTicket.paper`.

## 💡 Ejemplo

```tsx
<SaleConfirmedTicketEdge />
<Box sx={{ background: (theme) => theme.custom.saleTicket.paper }}>{/* contenido */}</Box>
<SaleConfirmedTicketEdge flipped />
```

## Tests

- `src/modules/cart/test/SaleConfirmed/SaleConfirmedTicketEdge.test.tsx`
