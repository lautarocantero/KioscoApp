# `getPublicAssetUrl` — Documentación

## ¿Para qué sirve?

Resuelve la URL de un asset servido desde `public/` (imágenes, videos, archivos descargables) respetando el `base` configurado en Vite (`vite.config.ts`).

En el build web `base` es `/`, así que una ruta root-absolute como `/images/logo.png` funciona. Pero el build de Electron usa `base: "./"` porque la ventana carga el `index.html` empaquetado con el protocolo `file://` (`electron/main.ts`, `mainWindow.loadFile(...)`). Bajo `file://`, una ruta que empieza con `/` se resuelve contra la raíz del sistema de archivos y no contra la carpeta de la app, así que el asset nunca carga. Este helper evita ese problema devolviendo siempre una ruta relativa al `base` real del build.

## Firma

```ts
getPublicAssetUrl(path: string): string
```

`path` puede escribirse con o sin barra inicial (`"images/logo.png"` o `"/images/logo.png"`); el resultado es el mismo.

## Dónde se usa

En todo componente/constante que referencia un archivo de `public/` por string (no por `import`), por ejemplo `FALLBACK_PRODUCT_IMAGE` (`config/constants.ts`) o las imágenes de los `Empty*` state cards.

## Ejemplo de uso

```ts
import { getPublicAssetUrl } from "modules/shared/helpers/getPublicAssetUrl";

const FALLBACK_IMAGE = getPublicAssetUrl("images/stocko_images/empty_product.png");
```

## Tests

`src/modules/shared/test/helpers/getPublicAssetUrl.test.ts`
