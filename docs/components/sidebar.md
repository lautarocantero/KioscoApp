# Sidebar — Documentación

## 1. Resumen rápido

`AppSidebar` es el componente de navegación lateral principal de la aplicación. Se renderiza desde `src/modules/shared/layout/AppShell.tsx`. Arquitectura: **riel de íconos fijo** (72px, nunca se colapsa) + **panel flotante de sección** que aparece por encima del contenido sin empujarlo, con **Vender** como botón permanente fuera de ambos.

**¿Dónde se usa?**
- `src/modules/shared/layout/AppShell.tsx`

**Arquitectura básica:**

```
AppSidebar
├── SidebarToggleButtonMobile        (mobile)
├── SidebarSellButton (variant="fab") (mobile)
├── SidebarMobileDrawer              (mobile)
│   ├── SidebarMobileNavRow × (1 + N)
│   ├── SidebarKioscoCard
│   └── SidebarUserMenu
├── [riel] <nav>
│   ├── SidebarSellButton (variant="rail")
│   ├── SidebarRailItem × N          (uno por SidebarNavLinks)
│   ├── SidebarKioscoSwitcher
│   └── SidebarUserAvatar
├── SidebarPanel                     (overlay, position: fixed)
│   ├── SidebarKioscoCard
│   ├── SidebarSectionHeader         (si hay sección activa)
│   ├── SidebarSectionAction         (si la sección trae action)
│   ├── SidebarSectionLinks
│   ├── SidebarUserMenu
│   └── SidebarPanelToggle
└── SettingsModal (lazy, solo montado mientras está abierto)
```

---

## 2. Componente principal: `AppSidebar`

Archivo: `src/modules/shared/layout/components/appSideBar/Appsidebar.tsx`

- El riel es un `Box` `position: fixed`, ancho fijo `SIDEBAR_RAIL_WIDTH` (72px) — **nunca cambia de ancho**, así que nunca hay reflow del layout. El layout reserva ese ancho con un spacer invisible.
- `SidebarPanel` es un overlay `position: fixed` que entra/sale con `transform: translateX`, apoyado justo a la derecha del riel. Su visibilidad (`isPanelOpen`) se persiste en `localStorage` con `SIDEBAR_STORAGE_KEY`.
- `SidebarSellButton` es el único punto de entrada al catálogo (`/new-sell`): vive arriba del riel en desktop, y como FAB flotante fuera del drawer en mobile. También se activa con el atajo de teclado `V` (`useSidebarShortcut`).
- En mobile, `SidebarMobileDrawer` reemplaza riel + panel por una única columna (ver sección 8).

---

## 3. Hook de comportamiento: `useAppSidebar`

Archivo: `src/modules/shared/layout/components/appSideBar/hooks/useAppSidebar.ts`

### Estado que maneja

- `isPanelOpen`: si el panel de sección está visible. Se inicializa leyendo `localStorage` y se persiste en cada cambio.
- `isMobileOpen`: control de apertura del drawer en mobile.

### Funciones y valores clave

- `togglePanel()` / `closePanel()`: abren/cierran el panel y persisten la preferencia.
- `handleNavClick(link)`: navega a `link.url` y abre el panel si estaba cerrado (si ya estaba abierto, se queda abierto mostrando la nueva sección).
- `handleSellClick()`: navega a `/new-sell`. Registrado también contra `useSidebarShortcut` para el atajo `V`.
- `handleLogout()`: despacha `startLogout()`.
- `activeLink`: el `OptionLink` de `SidebarNavLinks` cuya `url` matchea `location.pathname` — ya no hay `openSection` ni acordeón, la sección activa se deriva directo de la ruta. Queda `undefined` en `/new-sell` (Vender no es un ítem del riel).
- `destinations`: `NAV_DESTINATIONS[activeLink.url]` — los destinos de la sección activa.
- `isLinkActive(link)` / `isSubLinkActive(url)`: comparan contra `location.pathname`.
- `isSellActive`: `true` cuando `location.pathname` empieza con `/new-sell`.
- `navLinks`: de `useSidebarNavLinks()` (`SidebarNavLinks` + `useData` real por sección).

### Dependencias

- `useNavigate` y `useLocation` de `react-router-dom`
- `useDispatch` de `react-redux`
- `useSidebarNavLinks` (`src/config/Links.tsx` + `useShopStatLinks.dataHooksByUrl`)
- `useSidebarShortcut` (atajo de teclado `V`)
- `NAV_DESTINATIONS` de `src/modules/shared/layout/components/appSideBar/helper/NavDestinations.ts`

---

## 4. Links de navegación

Archivo: `src/config/Links.tsx`

`SidebarNavLinks: OptionLink[]` (tipo compartido con el resto del layout, `src/typings/ui/layout.types.ts`) — ya no incluye Catálogo (es el botón fijo Vender). Orden por frecuencia de uso: Ventas · Boletas · Productos · Proveedores · Tienda · Vendedores.

Cada link puede traer:
- `subtitle`: texto estático de fallback, usado cuando no hay `useData`.
- `action?: { label, url }`: CTA único de la sección (ex sublink "Crear"), renderizado por `SidebarSectionAction`.
- `useData`: asignado por `useSidebarNavLinks` para las secciones con hook de stats real (Ventas, Productos, Proveedores, Vendedores) — mismo mapeo (`dataHooksByUrl`) que usa `useShopStatLinks` para la fila de `/shop`.

---

## 5. Riel: `SidebarSellButton`, `SidebarRailItem`, `SidebarKioscoSwitcher`, `SidebarUserAvatar`

Todos en `src/modules/shared/layout/components/appSideBar/components/`. El riel nunca se expande: siempre muestra solo íconos, con `Tooltip` para el texto y una barra lateral (`SidebarRailItem`) para marcar la sección activa.

- **`SidebarSellButton`**: botón circular fijo, `variant="rail"` (desktop) o `"fab"` (mobile). Ver [doc](./appSideBar/SidebarSellButton.md).
- **`SidebarRailItem`**: un ítem por `navLink`. Ver [doc](./appSideBar/SidebarRailItem.md).
- **`SidebarKioscoSwitcher`**: ícono + iniciales de la tienda activa, abre el panel. Ver [doc](./appSideBar/SidebarKioscoSwitcher.md).
- **`SidebarUserAvatar`**: se resuelve solo con `useSidebarUserData()`, abre el panel. Ver [doc](./appSideBar/SidebarUserAvatar.md).

---

## 6. Panel: `SidebarPanel` y su contenido

- **`SidebarPanel`** (contenedor overlay) — [doc](./appSideBar/SidebarPanel.md).
- **`SidebarKioscoCard`** ("tienda activa" + lista desplegable de otras tiendas) — [doc](./appSideBar/SidebarKioscoCard.md), hook: [useSidebarKioscoCard](../hooks/appSideBar/useSidebarKioscoCard.md).
- **`SidebarSectionHeader`** (título + subtítulo con dato real, vía `useLinkCard`) — [doc](./appSideBar/SidebarSectionHeader.md).
- **`SidebarSectionAction`** (CTA único de la sección) — [doc](./appSideBar/SidebarSectionAction.md).
- **`SidebarSectionLinks`** (destinos de la sección, ex `SidebarSubGroup`/`SidebarSubLink`) — [doc](./appSideBar/SidebarSectionLinks.md).
- **`SidebarUserMenu`** (Ajustes / Cuenta / Plan / Cerrar sesión — absorbe lo que antes eran `SidebarUserInfo` + `SidebarUserSettings` + `SidebarLogout`) — [doc](./appSideBar/SidebarUserMenu.md).
- **`SidebarPanelToggle`** ("Ocultar panel") — [doc](./appSideBar/SidebarPanelToggle.md).

---

## 7. Destinos por sección: `NAV_DESTINATIONS`

Archivo: `src/modules/shared/layout/components/appSideBar/helper/NavDestinations.ts` (ex `NavSubGroups.ts` — ya no hay `groupLabel`: el panel ya tiene un solo grupo, el de la sección activa).

Solo lista destinos con una ruta real (`/categories-list`, `/shop/stadistics`) para no linkear a nada. El resto de la información imaginada en la propuesta de rediseño (ej. "Ventas de hoy", "Parciales sin cerrar", "Stock bajo") todavía no existe como vista/filtro navegable — sumarla acá a medida que esas rutas se construyan.

---

## 8. Mobile: `SidebarMobileDrawer`

Archivo: `src/modules/shared/layout/components/appSideBar/components/SidebarMobileDrawer.tsx`

El riel + panel flotante no tienen sentido en una pantalla angosta, así que en mobile el drawer sigue siendo una única columna: Vender (`SidebarMobileNavRow`), los links del riel, `SidebarKioscoCard` y `SidebarUserMenu` — reusando los mismos componentes que usa el panel de escritorio, sin duplicar su lógica. Ver [doc](./appSideBar/SidebarMobileDrawer.md).

Vender también vive como FAB (`SidebarSellButton variant="fab"`) fuera del drawer, siempre visible.

---

## 9. Tipos relevantes

Archivo: `src/typings/ui/sidebar.types.ts`

El sidebar trabaja directamente con `OptionLink` (`src/typings/ui/layout.types.ts`) en vez de un `NavLinkInterface` propio — ya no hace falta el cast forzado que tenía el `useAppSidebar` anterior. Tipos propios: `SubLink`/`NavDestinationsMap` (destinos de sección), `UseSidebarKioscoCardReturn`, y un props interface por componente nuevo del riel/panel.

---

## 10. Consideraciones importantes

- El riel nunca se colapsa — la sección activa siempre se ve (barra lateral en `SidebarRailItem`), incluso con el panel cerrado.
- La visibilidad del panel se persiste en `localStorage` con `SIDEBAR_STORAGE_KEY` (misma clave que usaba el viejo "expandido/colapsado").
- `activeLink` usa `location.pathname.startsWith(link.url)`; `isSubLinkActive` usa igualdad exacta.
- `SidebarSectionHeader` debe montarse con `key={activeLink.url}` — reusa `useLinkCard`, que llama a un hook distinto según `link.useData`; sin ese remount al cambiar de sección se rompen las reglas de hooks.
- El fondo translúcido del panel se deriva de `alpha(theme.custom.darkBackground, 0.85)` en vez del `rgba(38,29,60,.72)` fijo de la propuesta original, para no inventar un hex fuera del theme (`CLAUDE.md`, regla 4).

---

## 11. Cómo extender o modificar

- Para agregar/reordenar un link del riel, edita `SidebarNavLinks` en `src/config/Links.tsx`.
- Para agregar destinos de sección, edita `NAV_DESTINATIONS` en `helper/NavDestinations.ts` — solo con rutas reales.
- Para el CTA de una sección, agregá `action: { label, url }` al link en `Links.tsx`.
- Para que una sección muestre un subtítulo con dato real, sumá su hook a `dataHooksByUrl` en `src/hooks/shop/useShopStatLinks.ts` (compartido con `useSidebarNavLinks`).
- Para cambiar el fondo/blur del panel, revisá `SidebarPanel.tsx`. Para el del riel, `getNoisyBackgroundSx` en `src/modules/shared/components/NoisyBackground/NoisyBackground.tsx`.

## 12. Pendiente de definir

Ver `Sidebar Stocko.md` (propuesta original) sección 7 — todavía sin resolver: permisos por rol (qué ve un vendedor), búsqueda en el listado de tiendas para multi-tienda (>5 tiendas), y estados vacíos dedicados por sección (tienda recién creada, sin proveedores, etc).
