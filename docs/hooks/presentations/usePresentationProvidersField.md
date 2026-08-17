# 🪝 `usePresentationProvidersField`

> Hook de React que carga el catálogo de proveedores para el step opcional "Proveedores" del wizard de presentaciones.

## 🎯 ¿Para qué sirve?

Dispara el fetch de proveedores (reutilizando `fetchProvidersThunk` del módulo de proveedores) y expone las opciones ya formateadas para un multi-select por `_id`, junto con un resolver de label (`_id` → `name`).

## 📦 Firma

```ts
usePresentationProvidersField(): UsePresentationProvidersFieldReturn
```

- No recibe parámetros.
- Devuelve `providerOptions` (ids), `loading` y `getProviderLabel`.

## 💡 Ejemplo

```tsx
import { usePresentationProvidersField } from "../../hooks/presentations/usePresentationProvidersField";

function ProvidersField() {
  const { providerOptions, loading, getProviderLabel } = usePresentationProvidersField();

  if (loading) return <Skeleton />;

  return (
    <FormSelector
      mode="multi"
      categories={providerOptions}
      getLabel={getProviderLabel}
      value={selected}
      onChange={onChange}
    />
  );
}
```

## ✨ Beneficios

- ♻️ **Reutiliza el catálogo existente de proveedores** (`store/provider`), sin duplicar lógica de fetch.
- 🧩 **Se integra con el `FormSelectorMulti` genérico** ya usado por el campo de categorías, tratando cada `_id` de proveedor como una opción de tipo `string`.
