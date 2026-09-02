# 🧩 `AuthBrandPanel`

> Panel izquierdo (60%) del layout de autenticación: fondo violeta oscuro con textura noisy, video de intro de fondo, bloque de marca (nombre + tagline) arriba a la izquierda en tono sobre tono, y logo grande centrado en el espacio restante. Oculto en mobile (`xs`), visible desde `md`.

## 📦 Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `tagline` | `string` | Texto que acompaña al nombre "Stocko", distinto por pantalla (ej. login vs. registro). |

## 💡 Ejemplo

```tsx
<AuthBrandPanel tagline="Gestión de stock y ventas para tu kiosco" />
```

## ✨ Notas

- El fondo usa `getNoisyBackgroundSx` con `theme.palette.primary.dark` (variante oscura autogenerada por MUI a partir de `primary.main`, no un hex ad-hoc), así queda coherente en modo claro y oscuro.
- El "Stocko" es grande y en tono sobre tono: `theme.custom.lightMain` (violeta claro) sobre el fondo `primary.dark`, `fontWeight: 800`, `fontSize: { xs: "2.75rem", md: "4rem" }`. La tagline usa el mismo tono a menor opacidad y tamaño `caption`, para quedar claramente subordinada al título.
- ⚠️ Contraste: en modo oscuro, `lightMain` sobre `primary.dark` da ~2.2:1 (por debajo del 3:1 que pide WCAG AA para texto grande). Es una decisión de diseño consciente para lograr el look tono sobre tono en un panel puramente decorativo (no es contenido funcional); si en algún momento se necesita subir el contraste, la forma más simple es acercar `lightMain` más al blanco.
- El logo cambia de archivo según `theme.palette.mode` vía [`getAuthBrandLogoUrl`](../helpers/getAuthBrandLogoUrl.md) (hay dos PNG, uno por tema, con el círculo de fondo en un tono distinto para no perderse contra el violeta del panel). Usa `alt=""` porque es decorativo: el nombre "Stocko" ya está presente como texto accesible al lado.
- Usado por [`AuthLayout`](../../src/modules/auth/layout/AuthLayout.tsx), que le pasa el `tagline` recibido (o uno por defecto).
- Se implementa con `Box` (no `Grid`): ver la nota en [`AuthLayout`](./AuthLayout.md) sobre por qué se evita `Grid` para contenedores de layout en este módulo.
- Coordina el ciclo de vida del video de intro con [`useAuthBrandVideo`](../hooks/auth/useAuthBrandVideo.md) (`phase`, con 4 estados: `Playing` → `Holding` → `Fading` → `Done`):
  - Mientras `phase !== Done`, renderiza [`AuthBrandVideo`](./AuthBrandVideo.md) ocupando todo el panel por debajo del bloque de marca (`zIndex: 1` el texto, `zIndex: 0` el video), así el nombre y la tagline se ven todo el tiempo por encima.
  - El logo queda **oculto** (`opacity: 0`) durante `Playing` y `Holding`, para no competir visualmente con el video. Solo se hace visible (`opacity: 1`, con una transición lenta de `FADE_TRANSITION_MS`) a partir de la fase `Fading`, en simultáneo con el fade-out del video — el video se apaga mientras el logo aparece, como un cross-fade hacia el diseño estático de siempre.
  - Al terminar el video (`Holding`), se sostiene su último frame unos segundos (`HOLD_LAST_FRAME_MS`) antes de arrancar el fade, para que la transición no se sienta abrupta.
  - En `phase === Done`, el video ya no está en el DOM y queda visible el fondo noisy + marca + logo de siempre — es decir, "lo que hay actualmente" no cambia, el video y el fade son una capa temporal encima.
- Todo el panel tiene `userSelect: "none"`: ni el texto ni ninguna otra parte del panel se puede seleccionar (es contenido puramente decorativo).
