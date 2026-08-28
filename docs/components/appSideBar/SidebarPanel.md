# `SidebarPanel`

Panel flotante de sección del sidebar. Overlay `position: absolute` sobre el contenido — nunca lo empuja, entra/sale con `transform: translateX` en vez de animar el ancho.

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `isOpen` | `boolean` | `isPanelOpen` de `useAppSidebar`. |
| `activeLink` | `OptionLink \| undefined` | `activeLink` de `useAppSidebar` — `undefined` en `/new-sell` (Vender no es un ítem del riel). |
| `destinations` | `SubLink[]` | `destinations` de `useAppSidebar`. |
| `isSubLinkActive` | `(url: string) => boolean` | De `useAppSidebar`. |
| `onNavigate` | `(url: string) => void` | `navigate` de `useAppSidebar`. |
| `onOpenSettings` | `() => void` | Abre el modal de Ajustes. |
| `onLogout` | `() => void` | `handleLogout` de `useAppSidebar`. |
| `onClosePanel` | `() => void` | `closePanel` de `useAppSidebar`. |

## Composición

```
SidebarPanel
├── SidebarKioscoCard       ← siempre arriba, sin props
├── SidebarSectionHeader    ← solo si hay activeLink, key={activeLink.url}
├── SidebarSectionAction    ← solo si activeLink.action existe
├── SidebarSectionLinks
├── SidebarUserMenu         ← solo si ya hay userData resuelto
└── SidebarPanelToggle
```

## Notas de estilo

- Ancho `SIDEBAR_PANEL_WIDTH` (258px), posicionado a partir de `SIDEBAR_RAIL_WIDTH` (72px) — ambos en `src/config/constants.ts`.
- Fondo: `alpha(theme.custom.darkBackground, 0.85)` + `backdropFilter: blur(22px) saturate(150%)`. La propuesta original pedía un `rgba(38,29,60,.72)` fijo; acá se deriva de un token real del theme para no inventar un hex (ver regla 4 de `CLAUDE.md`).
- `aria-hidden` cuando está cerrado, y `pointer-events: none` para que no capture clicks mientras está fuera de pantalla.
