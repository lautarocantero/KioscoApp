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
  - `presentations` — presentaciones de **un producto** (tabla admin, `fetchPresentationsByProductId`).
  - `selectedPresentation`
  - `isLoading`
  - `errorMessage`
  - `allPresentations` — **todas** las presentaciones de la tienda, sin filtrar por producto. Campo separado de `presentations` a propósito, para que un fetch global (dashboard de `/shop`) no pise el estado de la tabla admin de un producto puntual, y viceversa.
  - `isLoadingAllPresentations`
  - `allPresentationsError`
- Reducers:
  - `startLoadingPresentations`
  - `setPresentations`
  - `setSelectedPresentation`
  - `removePresentationFromList`
  - `setError`
  - `clearError`
  - `resetPresentations`
  - `checkingAllPresentations`
  - `setAllPresentations`
  - `setAllPresentationsError`

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
  - `fetchAllPresentationsThunk` — `GET /get-product-presentations` (`getPresentationsRequest`, endpoint que ya existía en `presentationsApi.ts` pero no tenía ningún thunk que lo consumiera). Usado por `useShopLowStockPresentations` para la lista de "Productos con stock bajo" de `/shop`.
- Maneja errores con `handleError` y actualiza el slice.

## ✨ Beneficios

- 🧠 **Centraliza operaciones CRUD** para presentaciones.
- 🔁 **Usa Redux y thunks** para separar efectos y estado.
- ♻️ **Facilita la reactividad** con `isLoading` y `errorMessage`.
