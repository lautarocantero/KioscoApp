# KioscoNoResults — Documentación

## ¿Para qué sirve?

Mensaje que se muestra dentro de `KioscoGrid` cuando hay una búsqueda activa (`hasQuery`) que no matchea ningún kiosco (`noResults` de `useKioscoSelector`). `AddKioscoCard` sigue visible aparte — esto solo reemplaza el listado de kioscos, no la grilla entera (a diferencia de `KioscoEmptyState`, que sí reemplaza todo cuando el usuario no tiene kioscos).

## Props

Ninguna — puramente presentacional.

## Ejemplo de uso

```tsx
{noResults && <KioscoNoResults />}
```

## Ver también

- [KioscoEmptyState](KioscoEmptyState.md) — estado vacío real (sin kioscos), distinto de "sin resultados de búsqueda".
- [KioscoGrid](KioscoGrid.md)

## Tests

`src/modules/kiosco/test/components/KioscoNoResults.test.tsx`
