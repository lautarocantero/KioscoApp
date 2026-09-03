# 🧩 `TutorialOverlay`

> Overlay del tutorial de onboarding: scrim oscuro + spotlight sobre el elemento del paso activo + dock (mascota + globo de texto) abajo a la derecha. Puro presentacional.

## 📦 Props

Ninguna — lee todo su estado de `useTutorialContext()` (`src/hooks/tutorial/useTutorialContext.ts`): `steps`, `stepIndex`, `running`, `rect`, y las acciones `next`/`prev`/`skip`.

## 🎯 ¿Para qué sirve?

Es la pieza visual del [sistema de tutoriales](../features/tutorialesOnboardingImplementacion.md). No decide *cuándo* correr ni *qué* resaltar — solo renderiza el paso activo que ya resolvió el motor (`useTutorialEngine`). Replica 1:1 el patrón visual del mock de referencia entregado por el usuario (`Tutorial Select Kiosco.dc.html`): scrim (`alpha(theme.custom.black, 0.74)`), spotlight pulsante con `theme.palette.primary.main`, dock con `theme.custom.lightBackground`, mascota (`stocko-mascot.png`), contador + dots, botones Anterior/Siguiente y "Saltar tutorial" (con hint de `Esc`). Todos los colores salen de tokens del theme (`theme.custom.*`), ninguno está inventado.

- Si `!running`, no renderiza nada (`return null`).
- `role="dialog"` `aria-modal="true"` `aria-labelledby`/`aria-describedby` apuntando al título/cuerpo del paso.
- El manejo de teclado (Esc / ← / → / Enter) **no** vive acá: lo resuelve `useTutorialEngine` a nivel motor, para que funcione sin importar el foco del usuario.

## 🪝 Montaje

Se monta una única vez, de forma global y lazy (`React.lazy` + `Suspense`), en `src/StokoApp.tsx`, envuelto en `TutorialProvider`:

```tsx
<TutorialProvider>
  <AppRouther />
  <Suspense fallback={null}>
    <TutorialOverlay />
  </Suspense>
</TutorialProvider>
```

## Tests

`src/modules/shared/test/Tutorial/TutorialOverlay.test.tsx`
