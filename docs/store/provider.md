# 🗄️ `provider`

> Documentación del slice de proveedores (listado, búsqueda, detalle, stats y mutaciones).

## 🎯 ¿Para qué sirve?

Gestiona el estado de la lista de proveedores: carga, búsqueda por nombre, proveedor actualmente visto/editado, stats para la card del Home, y las mutaciones (crear, editar, borrar) reflejadas en el store.

## 📦 Archivos

- `src/store/provider/providerSlice.ts`
- `src/store/provider/providerThunks.ts`

## 💡 Contenido

### `providerSlice.ts`

Estado (`ProviderState`):

- `providers: Provider[]`
- `currentProvider: Provider | null`
- `isLoading: boolean` / `errorMessage: string | null`
- `isLoadingCurrent: boolean` / `currentProviderError: string | null`
- `stats: ProviderStats | null`
- `isLoadingStats: boolean` / `statsError: string | null`

Reducers:

- `checkingProviders()` / `setProviders(providers)` / `resetProviders()`
- `checkingCurrentProvider()` / `setCurrentProvider(provider)` / `clearCurrentProvider()` / `setCurrentProviderError(message)`
- `checkingStats()` / `setStats(stats)` / `setStatsError(message)`
- `removeProvider(_id)` — saca el proveedor de `providers` in-memory tras un borrado exitoso, sin refetchear la lista.
- `setError({ errorMessage })`

### `providerThunks.ts`

- `fetchProvidersThunk()` — `GET /provider/get-providers`.
- `searchProvidersByNameThunk(name)` — `GET /provider/get-provider-by-name` (match exacto, ver [docs/features/providersCrud.md](../features/providersCrud.md#límites-conocidos)).
- `fetchProviderByIdThunk(_id)` — `GET /provider/get-provider-by-id`. Devuelve el array crudo; quien lo llama (`useProviderData`) decide si lo guarda en `currentProvider`.
- `fetchProviderStatsThunk()` — `GET /provider/get-providers-stats`, alimenta `useProvidersLinkData`.
- `createProviderThunk(body)` — valida con `CreateProviderSchema` (Zod), `POST /provider/create-provider`, devuelve el `_id` nuevo o `undefined` si falla.
- `editProviderThunk(body)` — valida con `EditProviderSchema` (Zod, todos los campos salvo `_id` opcionales — edición parcial), `PUT /provider/edit-provider`, devuelve `boolean`.
- `deleteProviderThunk(_id)` — valida con `DeleteProviderSchema`, `DELETE /provider/delete-provider`, y si tiene éxito despacha `removeProvider(_id)`.

## ✨ Beneficios

- 🗂️ **Un solo lugar para la lista de proveedores** — `removeProvider` evita un refetch completo tras cada borrado.
- 🛡️ **Validación de forma antes de pegarle a la API** en los 3 thunks de mutación (create/edit/delete) — si el payload no matchea el schema de Zod, ni siquiera se hace el request.
- 🧮 **Stats desacoplados del listado** — `fetchProviderStatsThunk` no depende de que `providers` esté cargado, así la card del Home no dispara de rebote la carga de toda la lista.

## Tests

No hay tests directos de `providerSlice.ts`/`providerThunks.ts` — mismo criterio que `sellerSlice.ts`/`sellerThunks.ts` (no tienen tests propios en este proyecto). Se testean indirectamente a través de los hooks que los consumen (`src/hooks/providers/test/*`), mockeando los thunk creators.
