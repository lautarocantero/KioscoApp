# KioscoGrid — Documentación

## ¿Para qué sirve?

Reemplaza el `CardCarousel` horizontal que usaba antes `/select-kiosco` (mockup "2a": grilla + buscador). Grilla CSS responsive (1 columna en mobile, 2 en tablet, 3 en desktop+, scroll vertical natural de la página en vez de scroll horizontal). Puramente presentacional — todo lo que decide qué mostrar (`loading`, `noResults`) llega resuelto por props desde `useKioscoSelector`.

## Props (`KioscoGridProps`)

```ts
interface KioscoGridProps {
  kioscos: KioscoWithStats[];
  loading: boolean;
  noResults: boolean;
  entering: string | null;
  onEnter: (kiosco: KioscoWithStats) => void;
  onCreate: () => void;
  onJoin: () => void;
}
```

- `kioscos` ya viene filtrado por búsqueda (`filteredKioscos` de `useKioscoSelector`).

## Comportamiento

- `AddKioscoCard` se renderiza siempre primera, sin depender de `loading` ni de `kioscos` — es estática.
- `loading` → 3 `KioscoCardSkeleton` en vez de cards reales.
- `noResults` (búsqueda activa sin coincidencias) → `KioscoNoResults` debajo, además de `AddKioscoCard` (no reemplaza la grilla entera; eso lo hace `KioscoEmptyState` cuando no hay kioscos en absoluto).

## Ejemplo de uso

```tsx
<KioscoGrid
  kioscos={filteredKioscos}
  loading={loading}
  noResults={noResults}
  entering={entering}
  onEnter={handleEnterKiosco}
  onCreate={() => navigate("/create-kiosco")}
  onJoin={() => navigate("/join-kiosco")}
/>
```

## Ver también

- [AddKioscoCard](AddKioscoCard.md)
- [KioscoNoResults](KioscoNoResults.md)
- [KioscoEmptyState](KioscoEmptyState.md)
- [docs/hooks/kiosco/useKioscoSelector.md](../hooks/kiosco/useKioscoSelector.md)

## Tests

`src/modules/kiosco/test/components/KioscoGrid.test.tsx`
