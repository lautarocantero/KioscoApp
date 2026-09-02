# `getAuthBrandLogoUrl` — Documentación

## ¿Para qué sirve?

Función pura que elige, según el modo de theme activo, cuál de los dos PNG del logo premium de Stocko usar en [`AuthBrandPanel`](../components/AuthBrandPanel.md). Existen dos variantes del mismo ícono (bolsa + `$`) con el círculo de fondo en un tono distinto, para que no se pierda contra el violeta de cada theme:

- `StockoLogoPrem-transparent.png` → modo claro.
- `StockoLogoPrem-transparent-2.png` → modo oscuro.

## Firma

```ts
getAuthBrandLogoUrl(mode: PaletteMode): string
```

- Recibe `theme.palette.mode` ("light" | "dark") por parámetro (no un import estático), para respetar el modo vigente.
- Devuelve la URL pública ya resuelta vía `getPublicAssetUrl`.

## Dónde se usa

- `AuthBrandPanel.tsx` — logo del panel izquierdo de login/registro.

## Tests

`src/modules/auth/test/helpers/getAuthBrandLogoUrl.test.ts`
