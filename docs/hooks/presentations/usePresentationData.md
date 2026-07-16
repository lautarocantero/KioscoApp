# 🪝 `usePresentationData`

> Hook de React para obtener una presentación desde el store y asegurar su carga si no está presente.

## 🎯 ¿Para qué sirve?

Lee los datos de la presentación seleccionada en Redux y, si el store no contiene la presentación solicitada, dispara la carga desde la API.

## 📦 Firma

```ts
usePresentationData(presentationId: string | undefined): UsePresentationDataResult
```

- **`presentationId`** — id de la presentación a obtener.
- Devuelve los datos de la presentación, el estado de carga y el error.

## 💡 Ejemplo

```tsx
import { usePresentationData } from "../../hooks/presentations/usePresentationData";

function PresentationDetail({ presentationId }) {
  const { presentationData, isLoading, error } = usePresentationData(presentationId);

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!presentationData) return <p>No hay presentación</p>;

  return <div>{presentationData.name}</div>;
}
```

## ✨ Beneficios

- 🧠 **Evita fetch redundante** si el store ya tiene los datos.
- 🔄 **Sincroniza la UI con Redux** automáticamente.
- 🚀 **Simplifica componentes de detalle** al separar la lógica de carga.
