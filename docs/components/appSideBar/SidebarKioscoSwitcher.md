# `SidebarKioscoSwitcher`

Control de "tienda activa" en el riel del sidebar: ícono de local + iniciales del kiosco + chevron.

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `name` | `string` | Nombre del kiosco activo (usado en el tooltip/aria-label). |
| `initials` | `string` | Iniciales calculadas con [getInitials](../../helpers/getInitials.md). |
| `isActive` | `boolean` | `true` mientras el panel está mostrando la tarjeta de tienda. |
| `onClick` | `() => void` | Abre/cierra el panel — la tarjeta (`SidebarKioscoCard`) vive siempre arriba del panel. |

## Ejemplo

```tsx
<SidebarKioscoSwitcher
  name={activeKiosco?.name ?? ""}
  initials={getInitials(activeKiosco?.name ?? "")}
  isActive={isPanelOpen}
  onClick={togglePanel}
/>
```
