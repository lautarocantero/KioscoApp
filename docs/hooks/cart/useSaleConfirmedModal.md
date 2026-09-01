# 🪝 `useSaleConfirmedModal`

> Controla el auto-cierre con barra de progreso del modal de venta confirmada en `/new-sell`.

## 🎯 ¿Para qué sirve?

Maneja el ciclo de vida del `SaleConfirmedModal`: abrir, cerrar, pausar (al
pasar el mouse por encima) y reanudar el conteo hasta el auto-cierre. Vive
dentro de `useCart` — se abre en `generateTicket` tras registrar la venta.

## 📦 Firma

```ts
useSaleConfirmedModal(autoCloseMs: number): {
  isOpen: boolean;
  progress: number;        // 0..100, tiempo restante
  remainingSeconds: number;
  isPaused: boolean;
  open: () => void;
  close: () => void;
  pause: () => void;
  resume: () => void;
}
```

- `autoCloseMs`: duración total antes del auto-cierre (`SALE_CONFIRMED_MODAL_AUTO_CLOSE_MS`
  en `src/config/constants.ts`, 4000 ms).
- El conteo corre en un `setInterval` de 50ms; se detiene solo mientras
  `isPaused` es `true` (mouse sobre el modal) y se reinicia por completo en
  cada `open()`.

## 💡 Ejemplo

```tsx
const saleConfirmedModal = useSaleConfirmedModal(SALE_CONFIRMED_MODAL_AUTO_CLOSE_MS);

<SaleConfirmedModal
  open={saleConfirmedModal.isOpen}
  progress={saleConfirmedModal.progress}
  remainingSeconds={saleConfirmedModal.remainingSeconds}
  isPaused={saleConfirmedModal.isPaused}
  onClose={saleConfirmedModal.close}
  onPause={saleConfirmedModal.pause}
  onResume={saleConfirmedModal.resume}
  // ...
/>
```

## Tests

- `src/hooks/cart/test/useSaleConfirmedModal.test.ts`
- `src/modules/cart/test/SaleConfirmed/SaleConfirmedModal.test.tsx`
