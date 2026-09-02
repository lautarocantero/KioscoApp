# 🧩 `AuthBrandVideo`

> Video de fondo del panel izquierdo (`AuthBrandPanel`) del layout de autenticación: ocupa todo el espacio disponible del panel (`position: absolute; inset: 0`, `objectFit: cover`, debajo del bloque de marca y por encima del fondo noisy), se reproduce automáticamente sin sonido y sin forma de pausarlo. Al terminar hace un fade lento hacia `opacity: 0`.

## 📦 Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `isFading` | `boolean` | Si es `true`, el video anima su `opacity` a `0` (fase `Fading` de [`useAuthBrandVideo`](../hooks/auth/useAuthBrandVideo.md)). |
| `onEnded` | `() => void` | Se dispara cuando el video termina de reproducirse. |
| `onContextMenu` | `(event: React.MouseEvent<HTMLVideoElement>) => void` | Se dispara al hacer click derecho sobre el video. |

## 💡 Ejemplo

```tsx
const { phase, handleVideoEnded, handleVideoContextMenu } = useAuthBrandVideo();

{phase !== AuthBrandVideoPhaseEnum.Done && (
  <AuthBrandVideo
    isFading={phase === AuthBrandVideoPhaseEnum.Fading}
    onEnded={handleVideoEnded}
    onContextMenu={handleVideoContextMenu}
  />
)}
```

## ✨ Notas

- No es interactivo: sin `controls`, `pointerEvents: none` y `tabIndex={-1}`, así no puede recibir foco ni clicks. El único camino nativo que quedaría para pausarlo es el menú contextual del botón derecho (algunos navegadores lo ofrecen incluso sin `controls`), por eso `AuthBrandPanel` bloquea ese evento con `handleVideoContextMenu`.
- `muted` + `autoPlay` + `playsInline`: requisito de los navegadores para poder autoreproducir sin interacción del usuario.
- `disablePictureInPicture`: evita que el usuario abra una ventana flotante con sus propios controles de pausa.
- `aria-hidden="true"`: es puramente decorativo, el nombre "Stocko" y la tagline ya están presentes como texto accesible por encima.
- No tiene `loop`: se reproduce una única vez. Al terminar (evento nativo `ended`, sin llamar `pause()` explícitamente porque el propio navegador congela el video en su último frame), avisa vía `onEnded` y `AuthBrandPanel` lo sostiene así unos segundos antes de iniciar el fade.
- `transition: opacity ${FADE_TRANSITION_MS}ms ease`, con `FADE_TRANSITION_MS` importado desde [`useAuthBrandVideo`](../hooks/auth/useAuthBrandVideo.md) — misma duración que usa el hook para decidir cuándo pasar a `Done` y desmontar el video (así el fade CSS siempre termina de animar antes de que el elemento desaparezca del DOM).
- La URL del archivo la resuelve [`getAuthBrandVideoUrl`](../helpers/getAuthBrandVideoUrl.md).

## Tests

`src/modules/auth/test/Layout/AuthBrandVideo.test.tsx`
