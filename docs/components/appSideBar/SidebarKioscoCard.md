# `SidebarKioscoCard`

Tarjeta "TIENDA ACTIVA" que vive siempre arriba del panel del sidebar. Sin props — usa [useSidebarKioscoCard](../../hooks/appSideBar/useSidebarKioscoCard.md) internamente (mismo patrón que `SidebarUserData`).

## Comportamiento

- No renderiza nada mientras no hay kiosco activo resuelto (usuario recién logueado, sin kiosco todavía).
- Muestra un skeleton mientras el listado de kioscos está cargando y todavía no hay un kiosco activo.
- Al tocarla, despliega (`Collapse`) el resto de las tiendas del usuario con su rol en cada una (`getRoleLabel`) para cambiar de contexto sin salir del panel.
- Si `kioscos` solo tiene la tienda activa (usuario con un único kiosco), no muestra el chevron ni la lista desplegable.
- Si falla el fetch de kioscos, muestra el mensaje de error dentro de la lista desplegada.

## Ejemplo

```tsx
// components/SidebarPanel.tsx
<SidebarKioscoCard />
```
