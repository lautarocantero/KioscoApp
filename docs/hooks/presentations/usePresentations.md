# 🪝 `usePresentations`

> Hook de React para manejar la lista de presentaciones y las acciones de eliminación.

## 🎯 ¿Para qué sirve?

Controla el listado de presentaciones de un producto, el estado de búsqueda, dialogo de borrado y columnas de tabla.

## 📦 Firma

```ts
usePresentations(): UsePresentationsReturn
```

- No recibe parámetros.
- Devuelve presentaciones, carga, errores, búsqueda, diálogo de eliminación y columnas para la tabla.

## 💡 Ejemplo

```tsx
import { usePresentations } from "../../hooks/presentations/usePresentations";

function PresentationListPage() {
  const { presentations, loading, columns, handleDeleteRequest } = usePresentations();

  return (
    <PresentationTable data={presentations} columns={columns} />
  );
}
```

## ✨ Beneficios

- 🧠 **Centraliza la lógica de la lista** de presentaciones.
- 🗂️ **Expone columnas preconfiguradas** para la tabla.
- 🧹 **Manejo integrado de borrado** con diálogo.
- 🔎 **Incluye búsqueda y estado de carga**.
