# KioscoSelectorHeaderBar — Documentación

## ¿Para qué sirve?

Barra superior de `/select-kiosco`: marca Stocko, avatar + nombre + email del usuario, toggle de idioma, toggle de tema, y botón de cerrar sesión con confirmación. Va arriba de todo, antes del saludo/título (a diferencia del mockup "2a" original, que la ponía al pie — se movió arriba a pedido explícito).

## Props

Ninguna — se resuelve sola: lee `name`/`email`/`profilePhoto` directo de `state.auth` (mismo patrón que ya usaba `KioscoSelectorPage` para `name`).

## Piezas reutilizadas

- `LanguageToggle` (`src/modules/shared/components/LanguageToggle`) y `LightMode` (`src/modules/shared/components/LightMode`) — toggles ya theme-aware, sin cambios.
- [`TutorialHelpButton`](TutorialHelpButton.md) embebido (`tutorialId={TutorialIdEnum.SelectKiosco}`, `steps={selectKioscoTutorialSteps}`) — vuelve a mostrar el tutorial de "crear o unirme a un kiosco". Embebido y no genérico porque `/select-kiosco` es la única pantalla que no vive dentro de `AppShell`.
- `useLogout` (`src/hooks/auth/useLogout.ts`) — acción real de logout (dispatch + navigate).
- `useSidebarLogoutConfirm` (`.../appSideBar/hooks/useSidebarLogoutConfirm.ts`) + `ConfirmDialog` (`src/modules/shared/components/ConfirmDialog/ConfirmDialog.tsx`) — mismo gate de confirmación que ya usa el logout del sidebar, para no logout-ear con un solo click accidental.

## Comportamiento

- Click en "Cerrar sesión" abre el `ConfirmDialog`; solo al confirmar se ejecuta `handleLogout` (dispatch `startLogout` + navigate a `/`).

## Ejemplo de uso

```tsx
<KioscoSelectorHeaderBar />
```

## Tests

`src/modules/kiosco/test/components/KioscoSelectorHeaderBar.test.tsx`
