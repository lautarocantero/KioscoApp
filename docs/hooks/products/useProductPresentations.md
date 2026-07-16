# 🪝 `useProductPresentations`

> Hook de React para cargar y seleccionar presentaciones de un producto.

## 🎯 ¿Para qué sirve?

Trae todas las presentaciones de un producto y mantiene la selección actual, preseleccionando un valor inicial cuando corresponde.

## 📦 Firma

```ts
useProductPresentations(productId: string | undefined, initialPresentationId?: string)
```

- **`productId`** — id del producto cuyas presentaciones se quieren traer.
- **`initialPresentationId`** — id opcional de la presentación a preseleccionar.
- Devuelve presentaciones, estado de carga, error, selección y refetch.

## 💡 Ejemplo

```tsx
import { useProductPresentations } from "../../hooks/products/useProductPresentations";

function ProductPresentationSelector({ productId, initialPresentationId }) {
  const {
    presentations,
    isLoading,
    error,
    selectedPresentationId,
    setSelectedPresentationId,
  } = useProductPresentations(productId, initialPresentationId);

  if (isLoading) return <p>Cargando presentaciones...</p>;
  if (error) return <p>{error}</p>;

  return (
    <select value={selectedPresentationId} onChange={(e) => setSelectedPresentationId(e.target.value)}>
      {presentations.map((presentation) => (
        <option key={presentation._id} value={presentation._id}>{presentation.name}</option>
      ))}
    </select>
  );
}
```

## ✨ Beneficios

- ✅ **Selecciona automáticamente** la presentación inicial válida.
- 🔁 **Refresca la lista** cuando cambia el producto.
- 🧼 **Separa la lógica de selección** del componente de UI.
