# 🪝 `useAutoStartTutorial`

> Arranca el tutorial de una pantalla la primera vez que se visita, persistiendo "ya visto" en `localStorage`.

## 📦 Firma

```ts
useAutoStartTutorial(tutorialId: TutorialIdEnum, steps: TutorialStep[], ready: boolean): void
```

- `ready`: deja que la pantalla espere su propio loader (ej. `!isPageLoading`) antes de intentar arrancar — así el motor mide targets reales del DOM, no un `LoadingScreen`.

## 🎯 ¿Para qué sirve?

Mismo patrón de persistencia que `ACTIVE_KIOSCO_STORAGE_KEY`/`appTheme`: una key de `localStorage` por tutorial (`TUTORIAL_SEEN_STORAGE_KEY_PREFIX` + id, ver [`getTutorialSeenStorageKey`](../../features/tutorialesOnboardingImplementacion.md)). Al primer render con `ready=true`, si la key no existe todavía, la marca y dispara `start()` del tutorial; si ya existe, no hace nada. Un `ref` interno asegura que el intento ocurra una única vez por montaje del componente, sin importar cuántas veces cambien `steps`/`ready` en renders posteriores.

## 💡 Ejemplo

```tsx
// ShopPage.tsx
const isPageLoading = useInitialPageLoading(...);
const shopTutorialSteps = useShopTutorialSteps();
useAutoStartTutorial(TutorialIdEnum.Shop, shopTutorialSteps, !isPageLoading);

if (isPageLoading) return <LoadingScreen label="Cargando tienda..." />;
```

Se llama **antes** del `return` temprano del loader (reglas de hooks: no puede haber un `return` condicional antes de un hook).

## Ver también

- [useTutorialEngine](useTutorialEngine.md)
