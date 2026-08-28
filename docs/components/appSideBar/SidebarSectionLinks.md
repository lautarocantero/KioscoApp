# `SidebarSectionLinks`

Lista de destinos de la sección activa. Reemplaza a `SidebarSubGroup`/`SidebarSubLink` — sin `groupLabel`, porque el panel ya tiene un solo grupo (el de la sección activa).

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `destinations` | `SubLink[]` | `NAV_DESTINATIONS[activeLink.url]` (`helper/NavDestinations.ts`). |
| `isSubLinkActive` | `(url: string) => boolean` | De `useAppSidebar` — compara contra `location.pathname`. |
| `onNavigate` | `(url: string) => void` | Normalmente `navigate` de `useAppSidebar`. |

## Comportamiento

- No renderiza nada si `destinations` está vacío (sección sin destinos adicionales todavía).
- Cada destino puede traer un `count` opcional (ej. productos con stock bajo), que se muestra en `palette.error.main` — pero solo si `count > 0` (un contador en 0 no se muestra).
- Antes de la lista muestra un borde punteado (`border-top-style: dotted`) + el label "Páginas" (asociado a la `<ul>` vía `aria-labelledby`), para separarla de lo que venga antes (el CTA de `SidebarSectionAction` si existe, o el header/subtítulo de la sección) y dejar explícito que estos ítems son clickeables y llevan a otra parte de la app.

## Ejemplo

```tsx
<SidebarSectionLinks destinations={destinations} isSubLinkActive={isSubLinkActive} onNavigate={navigate} />
```

## Nota

`NAV_DESTINATIONS` hoy lista destinos con una ruta real (`/categories-list`, `/shop/stadistics`), más dos mock bajo `/products` ("Productos con bajo stock", "Productos más vendidos") que todavía no tienen vista/filtro propio — apuntan a `/products` y su `count` es un valor de ejemplo fijo, no un dato real. Reemplazar por la vista/filtro real (y un count calculado) en cuanto existan.
