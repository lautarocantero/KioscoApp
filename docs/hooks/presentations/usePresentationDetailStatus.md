# 🪝 `usePresentationDetailStatus`

> Hook de React para derivar el estado de stock y expiración de una presentación.

## 🎯 ¿Para qué sirve?

Calcula si una presentación tiene stock suficiente y si su fecha de expiración es válida, a partir de los valores del formulario de edición.

## 📦 Firma

```ts
usePresentationDetailStatus(values: ReturnType<typeof getPresentationEditInitialValues>): UsePresentationDetailStatusReturn
```

- **`values`** — valores actuales del formulario de edición de presentación.
- Devuelve flags que indican stock suficiente y vigencia de la presentación.

## 💡 Ejemplo

```tsx
import { usePresentationDetailStatus } from "../../hooks/presentations/usePresentationData";

function PresentationStatus({ formValues }) {
  const { hasSufficientStock, isNotExpired } = usePresentationDetailStatus(formValues);

  return (
    <div>
      <p>{hasSufficientStock ? "Stock OK" : "Stock bajo"}</p>
      <p>{isNotExpired ? "No vencida" : "Vencida"}</p>
    </div>
  );
}
```

## ✨ Beneficios

- ✅ **Presenta badges de estado** con lógica separada.
- 📌 **Evita mezclar reglas de negocio** en el formulario.
- 🧩 **Reutilizable para varias pantallas** de presentaciones.
