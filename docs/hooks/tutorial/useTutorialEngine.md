# 🪝 `useTutorialEngine`

> Motor del sistema de tutoriales: estado de la corrida (paso activo, running/finished, rect del target) + medición/scroll + atajos de teclado. Traducción a hook del componente de clase del mock de referencia entregado por el usuario.

## 🎯 ¿Para qué sirve?

Es el único lugar donde vive la lógica del tutorial — `TutorialOverlay` es puramente presentacional y solo lee de acá vía `TutorialContext`. No se implementó como slice de Redux: es estado de sesión efímero (como `ProductDialogContext`/`ProductDialogProvider`, mismo precedente ya usado en el proyecto), no datos de dominio.

## 📦 Firma

```ts
useTutorialEngine(): {
  activeTutorialId: TutorialIdEnum | null;
  steps: TutorialStep[];
  stepIndex: number;
  running: boolean;
  finished: boolean;
  rect: TutorialRect | null;
  start: (tutorialId: TutorialIdEnum, steps: TutorialStep[]) => void;
  next: () => void;
  prev: () => void;
  skip: () => void;
  restart: () => void;
}
```

## ⚙️ Comportamiento

- `start()` con un array vacío no hace nada (guard).
- `next()` en el último paso termina el tutorial (`finished: true`) en vez de salirse de rango.
- `prev()` nunca baja de 0.
- Al cambiar de paso (o arrancar), scrollea el target al tercio superior libre de la pantalla (ver [`getTutorialScrollTarget`](../../components/TutorialTarget.md)) y arranca un poll corto (20 ticks × 50ms) para asentar la medición mientras el layout todavía se está acomodando (imágenes, fuentes, animaciones).
- Mientras `running`, escucha `resize`/`scroll` (re-mide) y `keydown` global: `Escape` → `skip()`, `ArrowRight`/`Enter` → `next()`, `ArrowLeft` → `prev()`.
- Todos los listeners/timers se limpian solos al pasar a `!running` o al desmontar.

## 🔌 Se consume vía contexto, no directo

No se usa este hook directamente en componentes de pantalla — se consume `TutorialProvider` (que lo llama una sola vez, a nivel raíz en `StokoApp.tsx`) + `useTutorialContext()` en cualquier componente que necesite disparar/leer el tutorial (`TutorialHelpButton`, `useAutoStartTutorial`, `TutorialOverlay`).

## Tests

`src/hooks/tutorial/test/useTutorialEngine.test.ts`
