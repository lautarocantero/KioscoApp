# `buildColumnsForProviders` — Documentación

## ¿Para qué sirve?

Arma las columnas de la tabla de proveedores (`GridColDef<Provider>[]`) para `DataTable`/`GenericDataGrid`. Mismo patrón que `buildColumnsForProductExhibitor`/`SellerColumns`.

## Firma

```ts
buildColumnsForProviders({ onDeleteRequest, navigate }: BuildProviderColumnsArgs): GridColDef<Provider>[]
```

## Columnas

| field | headerName | Notas |
|---|---|---|
| `name` | Nombre | texto plano |
| `valoration` | Valoración | `renderCell` con un MUI `Rating` de solo lectura (`readOnly`, `size="small"`), `aria-label="Valoración: N de 5"` |
| `contact_phone` | Teléfono | texto plano |
| `contact_email` | Email | texto plano |
| `actions` | Acciones | `RowActionsCell` (ver/editar/borrar) centrado con `CellCenter` |

La columna `actions` navega a `/provider/:id` (ver), `/provider/:id/provider-edit` (editar), y llama a `onDeleteRequest(id, name)` (borrar) — que en la práctica abre el diálogo de confirmación manejado por `useProviders`.

## Ejemplo de uso

```tsx
const columns = buildColumnsForProviders({ onDeleteRequest: handleDeleteRequest, navigate });
<GenericDataGrid columns={columns} rows={providers} />
```

## Tests

`src/modules/providers/test/ProvidersList/providerColumns.test.tsx`
