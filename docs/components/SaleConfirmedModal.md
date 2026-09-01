# 🧩 `SaleConfirmedModal`

> Modal de venta confirmada que reemplaza a la vieja página `/cart-order-confirmed`: se abre en `/new-sell` justo después de registrar una venta, con auto-cierre a los 4 s (pausable con el mouse encima).

## 📦 Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `open` | `boolean` | Si el modal está abierto. |
| `progress` | `number` | 0..100, tiempo restante hasta el auto-cierre (barra superior). |
| `remainingSeconds` | `number` | Segundos restantes, para el texto del footer. |
| `isPaused` | `boolean` | `true` mientras el mouse está sobre el modal. |
| `ticketSummary` | `TicketSummaryType \| null` | Datos de la venta; si es `null` el componente no renderiza nada. |
| `onClose` | `() => void` | Cierre manual (botón ×, click afuera, Esc). |
| `onPause` / `onResume` | `() => void` | `onMouseEnter` / `onMouseLeave` del modal. |
| `onPrintTicket` | `() => void` | Vuelve a generar/descargar el PDF del ticket. |
| `goToTicketDetail` | `() => void` | Navega al detalle de la venta. |

## 🧱 Composición

Dividido por responsabilidad, todos en `src/modules/cart/components/SaleConfirmed/`:

- `SaleConfirmedModal.tsx` — `Dialog` + barra de progreso, compone lo demás.
- `SaleConfirmedModalHeader.tsx` — imagen de recibo (misma que usaba `/order-confirmed`), título y botón de cerrar.
- `SaleConfirmedModalSummary.tsx` — total + vuelto destacados, y grilla de N° de ticket / fecha / vendedor.
- `SaleConfirmedModalActions.tsx` — botones "Imprimir ticket" / "Ver detalle" y el texto de cuenta regresiva.
- `getSaleConfirmedSummaryFields.ts` — helper puro que formatea `ticketSummary` a los valores que renderiza `SaleConfirmedModalSummary`.

## 💡 Ejemplo

```tsx
<SaleConfirmedModal
  open={isSaleConfirmedModalOpen}
  progress={saleConfirmedModalProgress}
  remainingSeconds={saleConfirmedModalRemainingSeconds}
  isPaused={isSaleConfirmedModalPaused}
  ticketSummary={ticketSummary}
  onClose={closeSaleConfirmedModal}
  onPause={pauseSaleConfirmedModal}
  onResume={resumeSaleConfirmedModal}
  onPrintTicket={printTicket}
  goToTicketDetail={goToTicketDetail}
/>
```

Se monta en `CartComponent.tsx` (mismo componente que dispara `generateTicket`
vía `useCart`), no en `NewSellPage.tsx` — así no hace falta subir estado a un
contexto.

## Tests

- `src/modules/cart/test/SaleConfirmed/SaleConfirmedModal.test.tsx`
