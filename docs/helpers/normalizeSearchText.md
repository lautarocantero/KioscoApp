# `normalizeSearchText` — Documentación

## ¿Para qué sirve?

Normaliza un string para matching de búsqueda: minúsculas + sin acentos (`normalize("NFD")` + strip de diacríticos). Así "almacen" encuentra "Almacén".

## Firma

```ts
normalizeSearchText(value: string): string
```

## Ejemplo

```ts
normalizeSearchText("Almacén"); // "almacen"
```

## Dónde se usa

`searchPresentationRows` (buscador de presentaciones de `/new-sell`) lo usa tanto sobre la query como sobre cada campo del índice antes de comparar.
