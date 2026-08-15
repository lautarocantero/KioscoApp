# 🪝 `useProviderListData`

> Hook de React que trae el listado de proveedores y maneja la búsqueda por nombre con debounce.

## 🎯 ¿Para qué sirve?

Alimenta la página `/providers`. Combina el fetch inicial de todos los proveedores con la búsqueda por nombre, sin disparar un request por cada tecla.

## 📦 Firma

```ts
useProvidersListData(): UseProvidersListDataResult
// { providers, loading, error, searchTerm, setSearchTerm }
```

- Al montar (o cuando `searchTerm` está vacío), despacha `fetchProvidersThunk()` de inmediato.
- Cuando `searchTerm` tiene contenido, espera **350ms** desde la última tecla (debounce) y recién ahí despacha `searchProvidersByNameThunk(trimmed)`.
- Si se borra el término de búsqueda, vuelve a traer el listado completo sin esperar el debounce.

## 💡 Ejemplo

```ts
const { providers, loading, searchTerm, setSearchTerm } = useProvidersListData();
<SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
```

## 🚧 Límite conocido

La búsqueda backend (`GET /provider/get-provider-by-name`) es de **coincidencia exacta**, no parcial — ver [docs/features/providersCrud.md](../../features/providersCrud.md#límites-conocidos). El debounce evita spamear requests, pero no compensa la falta de búsqueda parcial en el backend.

## Tests

`src/hooks/providers/test/useProviderListData.test.ts`
