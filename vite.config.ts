import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";
import electron from "vite-plugin-electron/simple";

const isElectronBuild = Boolean(process.env.ELECTRON);

// https://vite.dev/config/
export default defineConfig({
  base: isElectronBuild ? "./" : "/",
  plugins: [
    tsconfigPaths(),
    react(),
    ...(isElectronBuild
      ? [
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
