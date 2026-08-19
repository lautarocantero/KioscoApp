# 🪝 `useIsElectron`

> Hook de React que indica si la app corre dentro del wrapper de Electron (escritorio).

## 🎯 ¿Para qué sirve?

Envuelve `isElectronRuntime` (`modules/shared/helpers/isElectronRuntime.ts`) en un hook memoizado para que los componentes `.tsx` puedan condicionar su render sin contener ellos mismos la lógica de detección de plataforma. Pensado para ocultar rutas o secciones exclusivas de la web (o del escritorio) — ver `AppRouter.tsx`.

## 📦 Firma

```ts
useIsElectron(): boolean
```

## 💡 Ejemplo

```tsx
import { useIsElectron } from "../../hooks/shared/useIsElectron";

const WebOnlyPage = () => {
  const isElectron = useIsElectron();

  if (isElectron) return null;

  return <section>{/* contenido solo web */}</section>;
};
```

## ✨ Beneficios

- ✅ Centraliza la detección de plataforma en un solo lugar.
- 🔄 Memoiza el resultado (no cambia durante la vida de la ventana).
- 🎯 Deja los `.tsx` libres de lógica de negocio, solo consumen el booleano ya resuelto.
