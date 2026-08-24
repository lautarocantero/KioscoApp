import { defineConfig, type Plugin } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";
import electron from "vite-plugin-electron/simple";

const isElectronBuild = Boolean(process.env.ELECTRON);

// BrowserRouter navega con history.pushState, así que la URL "actual" del
// documento deja de ser la carpeta real de dist/ apenas se entra a una ruta
// anidada (ej. /products). Bajo file://, eso rompe la resolución de toda
// URL relativa (imágenes, etc.) generada después de esa navegación. La
// etiqueta <base> fija la URL base al momento de la carga inicial y no se
// recalcula con pushState, así que la deja inmune a esto.
const injectElectronBaseHref = (): Plugin => ({
  name: "inject-electron-base-href",
  transformIndexHtml: (html) => html.replace("<head>", '<head>\n    <base href="./" />'),
});

// https://vite.dev/config/
export default defineConfig({
  base: isElectronBuild ? "./" : "/",
  plugins: [
    tsconfigPaths(),
    react(),
    ...(isElectronBuild
      ? [
          injectElectronBaseHref(),
          electron({
            main: { entry: "electron/main.ts" },
            preload: { input: "electron/preload.ts" },
          }),
        ]
      : []),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ["./src/modules/shared/test/utils/setupTests.tsx"],
  },
  server: {
    port: Number(process.env.PORT) || 5173,
    }
  })
