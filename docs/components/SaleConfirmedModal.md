# 🧩 `SaleConfirmedModal`

> Modal de venta confirmada que se abre en `/new-sell` justo después de registrar una venta: un ticket de papel claro (recibo) flotando sobre el fondo oscuro de la app, con auto-cierre a los 4 s (pausable con el mouse encima).

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

- `SaleConfirmedModal.tsx` — `Dialog` transparente (el "papel" del ticket lo pintan sus hijos) + barra de progreso, compone todo lo demás.
- `SaleConfirmedTicketEdge.tsx` — borde dentado (troquel) arriba y abajo del ticket.
- `SaleConfirmedModalHeader.tsx` — check verde, título y botón de cerrar.
- `SaleConfirmedDivider.tsx` — línea punteada (perforado) entre secciones.
- `SaleConfirmedBrandStrip.tsx` — mascota de Stocko + wordmark + tagline.
- `SaleConfirmedModalSummary.tsx` — grilla de N° de ticket / fecha / vendedor.
- `SaleConfirmedModalTotal.tsx` — banda destacada de "Total cobrado" + fila de "Vuelto".
- `SaleConfirmedBarcode.tsx` — código de barras decorativo + N° de ticket.
- `SaleConfirmedModalActions.tsx` — botones "Imprimir" / "Ver detalle" y el texto de cuenta regresiva.
- `getSaleConfirmedSummaryFields.ts` — helper puro que formatea `ticketSummary` a los valores que renderizan `SaleConfirmedModalSummary` y `SaleConfirmedModalTotal`.

El "papel" siempre es claro (`theme.custom.saleTicket.*`), sin importar si
la app está en modo oscuro o claro — es una metáfora de recibo impreso, no
sigue `fontColor`/`background` del tema.

## 💡 Ejemplo

```tsx
<SaleConfirmedFlashOverlay open={isSaleConfirmedModalOpen} />
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
contexto. `SaleConfirmedFlashOverlay` se monta junto a él, con el mismo `open`.

## Tests

- `src/modules/cart/test/SaleConfirmed/SaleConfirmedModal.test.tsx`
