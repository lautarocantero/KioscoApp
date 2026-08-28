# `SidebarSellButton`

Botón fijo de "Vender" en el riel del sidebar. Único punto de entrada al catálogo (`/new-sell`).

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `isActive` | `boolean` | `true` cuando la ruta actual es `/new-sell`. Cambia a fondo `primary.dark` + anillo blanco. |
| `onClick` | `() => void` | Handler de click/atajo — normalmente `handleSellClick` de `useAppSidebar`. |
| `variant` | `"rail" \| "fab"` | `"rail"` (default): botón cuadrado (ícono + label "Vender" abajo) fijo arriba del riel — la forma y el texto lo distinguen del resto de los ítems del riel como la acción rápida al catálogo. `"fab"`: botón circular flotante para mobile, solo ícono, sobre el drawer. |

## Ejemplo

```tsx
<SidebarSellButton isActive={isSellActive} onClick={handleSellClick} />
```

## Notas

- El logo es un PNG (`public/images/logo/StocoLogoalt.png`) blanco/claro, así que el estado activo no "tiñe" el ícono — usa fondo `palette.primary.dark` + borde `custom.white` en su lugar (un fondo blanco sólido lo dejaba invisible).
- También se activa con el atajo de teclado `V` — ver [useSidebarShortcut](../../hooks/appSideBar/useSidebarShortcut.md).
