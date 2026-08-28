# `SidebarMobileNavRow`

Fila de navegación del drawer mobile: ícono + label visible. A diferencia de `SidebarRailItem` (riel de escritorio, siempre solo ícono), acá el label siempre está a la vista porque el drawer no tiene el problema de espacio del riel.

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `icon` | `ReactNode` | Ícono del link o de "Vender". |
| `label` | `string` | Texto visible. |
| `isActive` | `boolean` | Resalta la fila con `palette.primary.light`. |
| `onClick` | `() => void` | Handler de navegación. |

## Ejemplo

```tsx
<SidebarMobileNavRow icon={link.icon} label={link.description} isActive={isLinkActive(link)} onClick={() => handleNavClick(link)} />
```
