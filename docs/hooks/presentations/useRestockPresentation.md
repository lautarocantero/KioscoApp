# 🪝 `useRestockPresentation`

> Hook de React para el modal "Reponer stock" de la tabla de presentaciones.

## 🎯 ¿Para qué sirve?

Controla la apertura/cierre del diálogo de reposición de stock, el valor editable de `stock`, el envío al backend (vía el thunk `restockPresentation`) y el manejo de errores/loading.

## 📦 Firma

```ts
useRestockPresentation(): UseRestockPresentationReturn
```

- No recibe parámetros.
- Devuelve el estado del diálogo (`restockDialog`, `stockValue`), el estado de envío (`isSubmitting`, `errorMessage`) y los handlers para abrir, editar, cancelar y confirmar.

## 💡 Ejemplo

```tsx
import { useRestockPresentation } from "../../hooks/presentations/useRestockPresentation";

function PresentationsTable() {
  const {
    restockDialog,
    stockValue,
    handleRestockRequest,
    handleStockChange,
    handleRestockCancel,
    handleRestockConfirm,
  } = useRestockPresentation();

  return (
    <RestockDialog
      restockDialog={restockDialog}
      stockValue={stockValue}
      onStockChange={handleStockChange}
      onConfirm={handleRestockConfirm}
      onCancel={handleRestockCancel}
    />
  );
}
```

## ✨ Beneficios

- 🔐 **No depende de `selectedPresentation`**: la tabla de listado no lo tiene cargado, así que actualiza directamente la fila afectada por `_id`.
- 🧼 **Manejo de errores reutilizable** con `useErrorParser`.
- 🌐 **Mensajes traducidos** vía `react-i18next` (`presentations.restockDialog.*`).
