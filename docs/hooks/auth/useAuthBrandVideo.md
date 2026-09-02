# 🪝 `useAuthBrandVideo`

> Hook de React para el video de intro del panel izquierdo de autenticación: guarda si ya terminó de reproducirse y bloquea el menú contextual para que no se pueda pausar desde ahí.

## 🎯 ¿Para qué sirve?

Encapsula el único estado que necesita [`AuthBrandPanel`](../../components/AuthBrandPanel.md) para coordinar el video: si `hasEnded` es `true`, deja de renderizar [`AuthBrandVideo`](../../components/AuthBrandVideo.md) y vuelve a quedar visible el fondo noisy + marca + logo que ya estaban debajo.

## 📦 Firma

```ts
useAuthBrandVideo(): UseAuthBrandVideoReturn

interface UseAuthBrandVideoReturn {
  hasEnded: boolean;
  handleVideoEnded: () => void;
  handleVideoContextMenu: (event: React.MouseEvent<HTMLVideoElement>) => void;
}
```

- No recibe parámetros.
- `handleVideoEnded` se pasa al `onEnded` del `<video>` y pone `hasEnded` en `true`.
- `handleVideoContextMenu` se pasa al `onContextMenu` del `<video>` y llama `preventDefault()`, para que el botón derecho no ofrezca una forma de pausarlo/mostrar controles.

## 💡 Ejemplo

```tsx
const { hasEnded, handleVideoEnded, handleVideoContextMenu } = useAuthBrandVideo();

{!hasEnded && <AuthBrandVideo onEnded={handleVideoEnded} onContextMenu={handleVideoContextMenu} />}
```

## Tests

`src/hooks/auth/test/useAuthBrandVideo.test.ts`
