# 🧩 `AuthBrandPanel`

> Panel izquierdo (60%) del layout de autenticación: fondo violeta oscuro con textura noisy, bloque de marca (nombre + tagline) arriba a la izquierda en tono sobre tono, y logo grande centrado en el espacio restante. Oculto en mobile (`xs`), visible desde `md`.

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
