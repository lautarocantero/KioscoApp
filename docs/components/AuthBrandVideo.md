# 🧩 `AuthBrandVideo`

> Video de fondo del panel izquierdo (`AuthBrandPanel`) del layout de autenticación: ocupa todo el espacio disponible del panel (`position: absolute; inset: 0`, `objectFit: cover`, debajo del bloque de marca y el logo), se reproduce automáticamente sin sonido y sin forma de pausarlo.

## 📦 Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `onEnded` | `() => void` | Se dispara cuando el video termina de reproducirse. |
| `onContextMenu` | `(event: React.MouseEvent<HTMLVideoElement>) => void` | Se dispara al hacer click derecho sobre el video. |

## 💡 Ejemplo

```tsx
const { hasEnded, handleVideoEnded, handleVideoContextMenu } = useAuthBrandVideo();

{!hasEnded && <AuthBrandVideo onEnded={handleVideoEnded} onContextMenu={handleVideoContextMenu} />}
```

## ✨ Notas

- No es interactivo: sin `controls`, `pointerEvents: none` y `tabIndex={-1}`, así no puede recibir foco ni clicks. El único camino nativo que quedaría para pausarlo es el menú contextual del botón derecho (algunos navegadores lo ofrecen incluso sin `controls`), por eso `AuthBrandPanel` bloquea ese evento con `handleVideoContextMenu` (ver [`useAuthBrandVideo`](../hooks/auth/useAuthBrandVideo.md)).
- `muted` + `autoPlay` + `playsInline`: requisito de los navegadores para poder autoreproducir sin interacción del usuario.
- `disablePictureInPicture`: evita que el usuario abra una ventana flotante con sus propios controles de pausa.
- `aria-hidden="true"`: es puramente decorativo, el nombre "Stocko" y la tagline ya están presentes como texto accesible por encima.
- No tiene `loop`: se reproduce una única vez. Cuando termina, dispara `onEnded` y `AuthBrandPanel` deja de renderizarlo, revelando el fondo noisy + marca + logo que ya estaban ahí debajo (ver [`AuthBrandPanel`](./AuthBrandPanel.md)).
- La URL del archivo la resuelve [`getAuthBrandVideoUrl`](../helpers/getAuthBrandVideoUrl.md).

## Tests

`src/modules/auth/test/Layout/AuthBrandVideo.test.tsx`
