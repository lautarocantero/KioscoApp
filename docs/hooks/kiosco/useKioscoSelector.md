# 🪝 `useKioscoSelector`

> Hook de React que orquesta la pantalla `/select-kiosco`.

## 🎯 ¿Para qué sirve?

Carga la lista de kioscos del usuario logueado al montar, maneja el flujo de "entrar a un kiosco" (marcarlo como activo y navegar a `/shop`), y ahora también el buscador de la grilla: filtra por nombre/dirección vía `filterKioscosByQuery`. `isEmpty` (cero kioscos, sin relación a la búsqueda) determina si la página muestra el estado vacío (`KioscoEmptyState`) en vez de buscador + grilla; `noResults` (búsqueda activa sin coincidencias) determina si la grilla muestra `KioscoNoResults`.

## 📦 Firma

```ts
useKioscoSelector(): {
  kioscos: KioscoWithStats[];
  filteredKioscos: KioscoWithStats[];
  loading: boolean;
  error: string | null;
  clearError: () => void;
  handleEnterKiosco: (kiosco: KioscoWithStats) => Promise<void>;
  entering: string | null;
  query: string;
  onQueryChange: (value: string) => void;
  clearQuery: () => void;
  hasQuery: boolean;
  isEmpty: boolean;
  noResults: boolean;
}
```

- No recibe parámetros.
- `kioscos` es la lista completa sin filtrar (para el conteo total del header); `filteredKioscos` es la que se renderiza en la grilla.
- `entering` es el `_id` del kiosco que se está por entrar (o `null`) — sirve para deshabilitar/mostrar loading solo en el botón de esa card puntual, no en toda la pantalla.
- `handleEnterKiosco(kiosco)` despacha `selectKioscoThunk(kiosco._id)` (marca activo + notifica al backend) y navega a `/shop`.
- `isEmpty` usa `!loading` para no mostrar el estado vacío mientras todavía no se sabe si el usuario tiene kioscos.

## 💡 Ejemplo

```tsx
const { filteredKioscos, loading, entering, handleEnterKiosco, query, onQueryChange, clearQuery } = useKioscoSelector();

<SearchBar value={query} onChange={onQueryChange} onClear={clearQuery} />

{filteredKioscos.map((kiosco, index) => (
  <KioscoCard
    key={kiosco._id}
    kiosco={kiosco}
    colorIndex={index}
    entering={entering === kiosco._id}
    onEnter={() => handleEnterKiosco(kiosco)}
  />
))}
```

## ✨ Beneficios

- 🧠 **Un solo hook orquesta toda la pantalla** — `KioscoSelectorPage.tsx` queda libre de lógica de negocio (regla del proyecto).
- 🎯 **Loading por-card, no global**: `entering` evita que un click bloquee visualmente las demás cards mientras una entra.
- 🔍 **Filtrado delegado a un helper puro** (`filterKioscosByQuery`), no inline en el hook ni en el `.tsx`.

## Tests

`src/hooks/kiosco/test/useKioscoSelector.test.ts`
