# `formatPresentationCategoryLabel` — Documentación

## ¿Para qué sirve?

Arma el label legible de las categorías de una presentación: traduce cada código (`presentationCategory.<value>`) y las une con coma. Retorna `""` si no hay categorías.

## Firma

```ts
formatPresentationCategoryLabel(
  category: PresentationCategory[] | undefined,
  t: TFunction
): string
```

## Ejemplo

```ts
formatPresentationCategoryLabel([PresentationCategory.Dairy, PresentationCategory.Bakery], t);
// "Lácteos, Panadería"
```

## Notas

Único lugar que arma este string — lo usan `ProductExhibitorColumns` (columna "Categoría") y `buildPresentationRows` (índice del buscador de presentaciones, para poder buscar por categoría).
