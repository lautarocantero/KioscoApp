# 🪝 `useProviders`

> Hook de React que orquesta la página de listado de proveedores (`/providers`).

## 🎯 ¿Para qué sirve?

Combina `useProvidersListData` (fetch + búsqueda) con el estado del diálogo de borrado y arma las columnas de la tabla vía `buildColumnsForProviders`.

## 📦 Firma

```ts
useProviders(): UseProvidersReturn
// { providers, loading, error, clearError, deleteDialog,
//   handleDeleteRequest, handleDeleteCancel, handleDeleteConfirm,
//   searchTerm, setSearchTerm, columns }
```

- `handleDeleteRequest(id, name)` — abre el diálogo con el proveedor a borrar.
- `handleDeleteCancel()` — cierra el diálogo sin despachar nada.
- `handleDeleteConfirm()` — despacha `deleteProviderThunk(deleteDialog.id)` y cierra el diálogo (con o sin éxito — el error queda reflejado en `error` vía el store).
- `columns` — resultado de `buildColumnsForProviders({ onDeleteRequest: handleDeleteRequest, navigate })`, listo para pasarle a `DataTable`.

## 💡 Ejemplo

```tsx
const { providers, columns, deleteDialog, handleDeleteConfirm, handleDeleteCancel, searchTerm, setSearchTerm } = useProviders();

<DataTable
  rows={providers}
  columns={columns}
  search={{ value: searchTerm, onChange: setSearchTerm, placeholder: "Distribuidora del Sur..." }}
  newItem={{ label: "Nuevo proveedor", href: "/provider-create" }}
  deleteDialog={{ ...deleteDialog, onCancel: handleDeleteCancel, onConfirm: handleDeleteConfirm }}
/>
```

## Tests

`src/hooks/providers/test/useProviders.test.ts`
