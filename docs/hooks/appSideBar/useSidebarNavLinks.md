# `useSidebarNavLinks`

Hook de React que devuelve los links del riel del sidebar (`SidebarNavLinks` de `src/config/Links.tsx`) con `useData` resuelto para las secciones que tienen un hook de stats real (Ventas, Productos, Proveedores, Vendedores).

## Para qué sirve

`SidebarSectionHeader` necesita un subtítulo con dato real (ej. "48 activos · 3 con stock bajo"), no el subtítulo estático de `Links.tsx`. Este hook reusa el mismo mapeo `dataHooksByUrl` que ya usa `useShopStatLinks` (`src/hooks/shop/useShopStatLinks.ts`) para no duplicar esa tabla.

## Firma

```ts
useSidebarNavLinks(): OptionLink[]
```

## Ejemplo

```tsx
// hooks/useAppSidebar.ts
const navLinks = useSidebarNavLinks();
```

## Notas

- Tienda y Boletas quedan con `useData` sin definir — no tienen un hook de stats dedicado, así que `SidebarSectionHeader` cae al subtítulo estático del link.
- Reemplaza el cast forzado `SidebarNavLinks as NavLinkInterface[]` que usaba el `useAppSidebar` anterior: ahora el sidebar trabaja directamente con `OptionLink`.
