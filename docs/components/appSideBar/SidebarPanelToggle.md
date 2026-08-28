# `SidebarPanelToggle`

Botón "Ocultar panel", pinneado abajo del todo del panel del sidebar.

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `onClick` | `() => void` | Normalmente `closePanel` de `useAppSidebar`. |

## Ejemplo

```tsx
<SidebarPanelToggle onClick={closePanel} />
```

## Notas

- Efecto de "respiración": un `@keyframes` en loop infinito hace oscilar el color (texto + chevron, vía `currentColor`) entre `custom.translucidWhite` y `palette.primary.main`, para llamar la atención de que ahí se puede contraer el panel. Se corta en `:hover` (`animation: "none"`, color sólido `custom.white`) para no competir con esa interacción.
