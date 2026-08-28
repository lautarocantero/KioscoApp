# `formatPresentationVariantLabel` — Documentación

## ¿Para qué sirve?

Arma el label legible de la variante de una presentación combinando `model_type` (traducido vía `modelType.<value>`) y `model_size`. Ej: `"Botella, 500"`.

## Firma

```ts
formatPresentationVariantLabel(
  presentation: Pick<Presentation, "model_type" | "model_size">,
  t: TFunction
): string
```

## Ejemplo

```ts
formatPresentationVariantLabel({ model_type: "bottle", model_size: 500 }, t);
// "Botella, 500"
```

## Notas

Único lugar que arma este string — lo usan `ProductExhibitorColumns` (columna "Presentaciones" del catálogo) y `buildPresentationRows` (índice del buscador de presentaciones). Si hace falta cambiar el formato, se cambia acá.
