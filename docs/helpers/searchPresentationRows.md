# `searchPresentationRows` — Documentación

## ¿Para qué sirve?

Matchea, ordena y recorta el índice plano de presentaciones (`PresentationRow[]`) contra una query de texto libre. Pura — no toca estado ni red.

## Firma

```ts
searchPresentationRows(rows: PresentationRow[], query: string): PresentationRow[]
```

## Comportamiento

1. Normaliza query y campos con `normalizeSearchText` (minúsculas, sin acentos).
2. Con query vacía retorna `[]` (el dropdown no se abre).
3. Matchea contra `producto + presentación + categoría + sku`.
4. Ordena: prefijo del nombre del producto (0) → prefijo de sku (1) → resto (2).
5. Corta a 8 resultados.

## Ejemplo

```ts
searchPresentationRows(rows, "coca"); // hasta 8 PresentationRow, "Coca Cola" primero
```

## Dónde se usa

`usePresentationSearch`, sobre el índice que arma `buildPresentationRows`.
