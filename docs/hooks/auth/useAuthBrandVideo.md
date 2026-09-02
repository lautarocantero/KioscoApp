# 🪝 `useAuthBrandVideo`

> Hook de React para el video de intro del panel izquierdo de autenticación: maneja la máquina de estados que va de "reproduciendo" a "listo", sosteniendo el último frame unos segundos y haciendo un fade lento antes de volver a mostrar el logo. También bloquea el menú contextual para que no se pueda pausar desde ahí.

## 🎯 ¿Para qué sirve?

Encapsula toda la coreografía de tiempos que necesita [`AuthBrandPanel`](../../components/AuthBrandPanel.md) para el video: cuándo mostrar el logo, cuándo empezar a atenuar el video y cuándo sacarlo del DOM.

## 📦 Firma

```ts
useAuthBrandVideo(): UseAuthBrandVideoReturn

interface UseAuthBrandVideoReturn {
  phase: AuthBrandVideoPhaseEnum;
  handleVideoEnded: () => void;
  handleVideoContextMenu: (event: React.MouseEvent<HTMLVideoElement>) => void;
}
```

- No recibe parámetros.
- `phase` es una máquina de 4 estados (`AuthBrandVideoPhaseEnum`, en `typings/auth/authEnums.ts`):
  1. **`Playing`** — estado inicial, el video se está reproduciendo.
  2. **`Holding`** — el video ya terminó (evento `ended`, ver `handleVideoEnded`) y se queda congelado en su último frame durante `HOLD_LAST_FRAME_MS` (2000ms).
  3. **`Fading`** — pasado ese tiempo, arranca el fade: el video se anima a `opacity: 0` y el logo a `opacity: 1` en simultáneo, durante `FADE_TRANSITION_MS` (1500ms).
  4. **`Done`** — terminado el fade, estado final. `AuthBrandPanel` deja de renderizar el video.
- `handleVideoEnded` se pasa al `onEnded` del `<video>` y dispara el paso de `Playing` a `Holding`.
- `handleVideoContextMenu` se pasa al `onContextMenu` del `<video>` y llama `preventDefault()`, para que el botón derecho no ofrezca una forma de pausarlo/mostrar controles.
- Los timers (`setTimeout` dentro de `useEffect`, uno por transición) se limpian en el cleanup de cada efecto si el componente se desmonta antes de tiempo (ej. el usuario navega de `/login` a `/register` en medio del video).
- `HOLD_LAST_FRAME_MS` y `FADE_TRANSITION_MS` se exportan desde este archivo para que [`AuthBrandVideo`](../../components/AuthBrandVideo.md) y `AuthBrandPanel` usen exactamente la misma duración en sus transiciones CSS (evita desincronizar el número en varios lugares).

## 💡 Ejemplo

```tsx
const { phase, handleVideoEnded, handleVideoContextMenu } = useAuthBrandVideo();
const isVideoVisible = phase !== AuthBrandVideoPhaseEnum.Done;
const isLogoVisible = phase === AuthBrandVideoPhaseEnum.Fading || phase === AuthBrandVideoPhaseEnum.Done;

{isVideoVisible && (
  <AuthBrandVideo
    isFading={phase === AuthBrandVideoPhaseEnum.Fading}
    onEnded={handleVideoEnded}
    onContextMenu={handleVideoContextMenu}
  />
)}
```

## Tests

`src/hooks/auth/test/useAuthBrandVideo.test.ts` (usa `vi.useFakeTimers()` para recorrer las 4 fases sin esperar los tiempos reales).
