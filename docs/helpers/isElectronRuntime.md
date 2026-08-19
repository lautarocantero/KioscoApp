# `isElectronRuntime` — Documentación

## ¿Para qué sirve?

Función pura que detecta si la app corre dentro del wrapper de Electron (escritorio) o en un navegador web normal. Se apoya en `window.electron`, que el `preload` de Electron expone únicamente cuando la ventana es una `BrowserWindow` de la app de escritorio (`electron/preload.ts`).

## Firma

```ts
isElectronRuntime(): boolean
```

Devuelve `false` si `window` no existe (SSR/tests) o si `window.electron.isElectron` no fue expuesto.

## Dónde se usa

- `useIsElectron` (`hooks/shared/useIsElectron.ts`) — hook que expone este resultado a componentes.

## Ejemplo de uso

```ts
import { isElectronRuntime } from "modules/shared/helpers/isElectronRuntime";

if (isElectronRuntime()) {
  // rama exclusiva de escritorio
}
```

## Tests

`src/modules/shared/test/helpers/isElectronRuntime.test.ts`
