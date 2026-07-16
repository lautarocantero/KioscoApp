# 🗄️ `presentation`

> Documentación del slice y thunks de presentaciones.

## 🎯 ¿Para qué sirve?

Gestiona el estado de presentaciones, su lista y la presentación seleccionada, además de coordinar las operaciones de fetch, creación, edición y eliminación.

## 📦 Archivos

- `src/store/presentation/presentationSlice.ts`
- `src/store/presentation/presentationThunks.ts`

## 💡 Contenido

### `presentationSlice.ts`
- Estado inicial:
  - `presentations`
  - `selectedPresentation`
  - `isLoading`
  - `errorMessage`
- Reducers:
  - `startLoadingPresentations`
  - `setPresentations`
  - `setSelectedPresentation`
  - `removePresentationFromList`
  - `setError`
  - `clearError`
  - `resetPresentations`

### `presentationThunks.ts`
- Thunks disponibles:
  - `fetchPresentationsByProductId`
  - `searchPresentationsByProductId`
  - `fetchPresentationById`
  - `getPresentationsById`
  - `createPresentation`
  - `editPresentation`
  - `deletePresentation`
  - `fetchPresentationAnalytics`
- Maneja errores con `handleError` y actualiza el slice.

## ✨ Beneficios

- 🧠 **Centraliza operaciones CRUD** para presentaciones.
- 🔁 **Usa Redux y thunks** para separar efectos y estado.
- ♻️ **Facilita la reactividad** con `isLoading` y `errorMessage`.
