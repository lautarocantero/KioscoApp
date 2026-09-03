# 🧩 `TutorialHelpButton`

> Ícono para volver a ver el tutorial de una pantalla, en dos modos: embebido (props explícitas) o genérico (autorresuelto por ruta).

## 📦 Props

`TutorialHelpButtonProps` (`src/typings/tutorial/props.ts`), ambas opcionales:

- `tutorialId?: TutorialIdEnum`
- `steps?: TutorialStep[]`

## 🎯 ¿Para qué sirve?

- **Con props** (uso embebido): en `/select-kiosco`, que no vive dentro de `AppShell`, se agrega directo en `KioscoSelectorHeaderBar` con `tutorialId`/`steps` fijos.
- **Sin props** (uso genérico): en `AppShell`, se autorresuelve vía `useCurrentRouteTutorial()` según la ruta activa (`src/modules/shared/tutorial/tutorialRouteRegistry.ts`). Si la ruta actual no tiene tutorial registrado, no renderiza nada.

En ambos casos, el click llama a `start(tutorialId, steps)` del [`TutorialContext`](../features/tutorialesOnboardingImplementacion.md), sin importar si el usuario ya lo vio antes (a diferencia del auto-inicio, este botón no consulta ni escribe el flag de localStorage).

Mismo lenguaje visual que `NotificationsBell` (`IconButton` con `theme.custom.background`/`theme.custom.darkGray`/`theme.custom.fontColor`), para que ambos íconos convivan en la esquina superior derecha de `AppShell`.

## 💡 Ejemplo

```tsx
// Embebido — KioscoSelectorHeaderBar.tsx
<TutorialHelpButton tutorialId={TutorialIdEnum.SelectKiosco} steps={selectKioscoTutorialSteps} />

// Genérico — AppShell.tsx
<TutorialHelpButton />
```

## Ver también

- [useCurrentRouteTutorial](../hooks/tutorial/useCurrentRouteTutorial.md)
