# `SidebarUserAvatar`

Control de usuario del riel del sidebar. Se resuelve solo con `useSidebarUserData()` (mismo patrón que `SidebarKioscoCard`) — no necesita que le bajen `avatarUrl`/`name` por props.

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `onClick` | `() => void` | Abre/cierra el panel — normalmente `togglePanel` de `useAppSidebar`. |
| `isActive` | `boolean` | `true` mientras el panel está abierto. |

## Comportamiento

No renderiza nada mientras `useSidebarUserData()` está cargando o no hay usuario autenticado (mismo guard que tenía `SidebarUserData`).

## Ejemplo

```tsx
<SidebarUserAvatar isActive={isPanelOpen} onClick={togglePanel} />
```
