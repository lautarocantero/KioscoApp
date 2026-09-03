# 🪝 `useCurrentRouteTutorial`

> Resuelve qué tutorial corresponde a la ruta activa, para el `TutorialHelpButton` genérico de `AppShell`.

## 📦 Firma

```ts
useCurrentRouteTutorial(): { tutorialId: TutorialIdEnum; steps: TutorialStep[] } | null
```

Devuelve `null` si la ruta activa no tiene ningún tutorial registrado.

## 🎯 ¿Para qué sirve?

`AppShell` envuelve todas las pantallas con sidebar (`/shop`, `/products`, etc.) y necesita un único ícono de ayuda genérico, sin que cada pantalla tenga que "avisarle" cuál es su tutorial. Este hook resuelve eso leyendo `TUTORIAL_ROUTE_REGISTRY` (`src/modules/shared/tutorial/tutorialRouteRegistry.ts`) — el mismo patrón de composición central que ya usa `AppRouter.tsx` para las rutas de cada módulo — y matcheando contra `useLocation().pathname` con `matchPath` de `react-router-dom` (no comparación exacta de string): hace falta porque `/products/:product_id/presentations` es una ruta con parámetro, registrada con la misma sintaxis `:param` que usa React Router.

### ⚠️ Por qué llama TODOS los `useSteps()` del registro

Reglas de hooks: la cantidad de hooks invocados en cada render debe ser siempre la misma. Como el registro es una constante estática, este hook llama a `entry.useSteps()` para **cada** entrada registrada, en cada render, sin importar en qué ruta esté el usuario — y solo descarta el resultado de las que no matchean. Es intencional, no un bug: agregar más pantallas al registro solo agrega más llamadas fijas, nunca condicionales.

## Ver también

- [tutorialRouteRegistry](../../features/tutorialesOnboardingImplementacion.md)
- [TutorialHelpButton](../../components/TutorialHelpButton.md)
