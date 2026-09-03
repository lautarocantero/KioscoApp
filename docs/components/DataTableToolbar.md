# 🧩 `DataTableToolbar`

> Barra de acciones de `DataTable`: buscador, filtros, botón "nuevo item" y acciones extra. Compartido por todas las pantallas de listado (products, presentations, providers, sellers, sells, notifications...).

## 📦 Props

`DataTableToolbarProps` (`src/typings/ui/dataTable.types.ts`): `search?`, `filters?`, `newItem?`, `extraActions?`. Si ninguno está presente, no renderiza nada (`return null`).

`newItem` es `DataTableNewItemConfig`: `{ label?, href?, onClick?, targetId? }`.

## 🎯 ¿Para qué sirve `newItem.targetId`?

El botón "nuevo item" (ej. "Nuevo producto", "Agregar vendedor") se arma acá — no en la página que lo usa — así que ninguna página tiene JSX propio para envolver con `TutorialTarget` cuando ese botón necesita ser el target de un paso de tutorial. `targetId` resuelve esto: se aplica como `data-tutorial-target={newItem.targetId}` directo en el `Button` nativo de MUI (que sí reenvía props `data-*`, a diferencia de `PrimaryButtonComponent`/`OutlinedButtonComponent`).

Cualquier página que use `DataTable` puede targetear su botón de creación solo agregando el campo:

```tsx
<DataTable
  newItem={{ label: "Nuevo proveedor", href: "/provider-create", targetId: "providers-create" }}
  ...
/>
```

Usado hoy por los tutoriales de `/products`, `/products/:id/presentations`, `/providers` y `/sellers` — ver [tutorialesOnboardingImplementacion.md](../features/tutorialesOnboardingImplementacion.md).

## Tests

`src/modules/shared/test/DataTable/DataTableToolbar.test.tsx`
