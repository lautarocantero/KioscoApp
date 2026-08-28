# `SidebarRailItem`

Ítem de navegación del riel del sidebar. Reemplaza al viejo `SidebarNavItem` — ya no tiene estado expandido/colapsado (el riel nunca cambia de ancho) ni sub-lista propia (los destinos de la sección viven en `SidebarSectionLinks`, dentro del panel).

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `link` | `OptionLink` | Link de `SidebarNavLinks` (`src/config/Links.tsx`). |
| `isActive` | `boolean` | `true` cuando `location.pathname` empieza con `link.url`. |
| `onClick` | `(link: OptionLink) => void` | Normalmente `handleNavClick` de `useAppSidebar` — navega y abre el panel si estaba cerrado. |

## Comportamiento

- Siempre muestra solo el ícono; la descripción se ve por `Tooltip` al hacer hover.
- El item activo se marca con un fondo translúcido (`alpha(custom.white, 0.24)`) y una barra lateral (`custom.white`) — así se sabe en qué sección se está incluso con el panel cerrado.

## Ejemplo

```tsx
<SidebarRailItem link={link} isActive={isLinkActive(link)} onClick={handleNavClick} />
```
