# `SidebarMobileDrawer`

Versión mobile del sidebar. El riel + panel flotante no tienen sentido en una pantalla angosta, así que en mobile sigue siendo una única columna con todo el contenido en línea: Vender, los links del riel, la tarjeta de tienda activa y el menú de usuario.

## Props

Ver `SidebarMobileDrawerProps` en `src/typings/ui/sidebar.types.ts` — son básicamente los mismos valores que devuelve `useAppSidebar`, más `open`/`onClose` para el estado del drawer.

## Composición

```
SidebarMobileDrawer
├── SidebarMobileNavRow ("Vender")
├── SidebarMobileNavRow × N   (uno por navLink)
├── SidebarKioscoCard          ← reusado tal cual del panel de escritorio
└── SidebarUserMenu            ← reusado tal cual del panel de escritorio
```

## Notas

- Vender también vive como FAB fuera del drawer (`SidebarSellButton variant="fab"`, ver `Appsidebar.tsx`) — la fila de acá es para cuando el drawer ya está abierto.
- `SidebarKioscoCard` y `SidebarUserMenu` son los mismos componentes que usa `SidebarPanel` en desktop — no se duplica su lógica ni su estilo para mobile.
