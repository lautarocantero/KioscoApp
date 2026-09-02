# `getAuthBrandVideoUrl` — Documentación

## ¿Para qué sirve?

Función pura que devuelve la URL pública del video de intro que se reproduce de fondo en [`AuthBrandPanel`](../components/AuthBrandPanel.md), vía [`AuthBrandVideo`](../components/AuthBrandVideo.md).

## Firma

```ts
getAuthBrandVideoUrl(): string
```

- No recibe parámetros: a diferencia de [`getAuthBrandLogoUrl`](./getAuthBrandLogoUrl.md), el video es único y no varía según el theme.
- Devuelve la URL pública ya resuelta vía `getPublicAssetUrl`, apuntando a `files/video/auth-brand-intro.mp4`.

## Dónde se usa

- `AuthBrandVideo.tsx` — video de fondo del panel izquierdo de login/registro.

## Tests

`src/modules/auth/test/helpers/getAuthBrandVideoUrl.test.ts`
