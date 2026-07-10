# Sidebar — Documentación

## 1. Resumen rápido

`AppSidebar` es el componente de navegación lateral principal de la aplicación. Se renderiza desde `src/modules/shared/layout/AppShell.tsx` y se encarga de:

- mostrar los links de navegación principales
- manejar el estado de expansión / colapso del sidebar
- mostrar datos del usuario y acceso rápido a configuración
- ofrecer un botón de cierre de sesión
- adaptarse a desktop y mobile con un drawer lateral

**¿Dónde se usa?**
- `src/modules/shared/layout/AppShell.tsx`

**Arquitectura básica:**

```
AppSidebar
├── SidebarToggleButtonMobile
├── SidebarMobileDrawer
├── SidebarToggle
├── SidebarLinksList
│   ├── SidebarNavItem
│   │   ├── SidebarExpandMore
│   │   ├── SidebarExpandedList
│   │   │   ├── SidebarSubGroup
│   │   │   │   └── SidebarSubLink
├── SidebarUserData
│   ├── SidebarUserAvatar
│   ├── SidebarUserInfo
│   └── SidebarUserSettings
└── SidebarLogout
```

---

## 2. Componente principal: `AppSidebar`

Archivo: `src/modules/shared/layout/components/appSideBar/Appsidebar.tsx`

`AppSidebar` actúa como un contenedor visual fijo en escritorio y como launcher del drawer en móvil.

Comportamiento principal:

- `SidebarToggleButtonMobile` muestra el botón de menú solo en `xs`.
- `SidebarMobileDrawer` se abre en pantallas pequeñas usando `Drawer` de MUI.
- En desktop, el sidebar es un `Box` con `position: fixed` y ancho variable.
- El ancho se guarda y restaura desde `localStorage` usando la clave `SIDEBAR_STORAGE_KEY`.

Contiene:

- `SidebarToggleComponent` para alternar entre expandido y colapsado
- `SidebarLinksList` para renderizar la lista de navegación
- `SidebarUserData` para mostrar avatar y datos del usuario
- `SidebarLogout` para el botón de cerrar sesión

---

## 3. Hook de comportamiento: `useAppSidebar`

Archivo: `src/modules/shared/layout/components/appSideBar/hooks/useAppSidebar.ts`

Este hook encapsula la lógica de navegación y estado del sidebar.

### Estado que maneja

- `isExpanded`: si el sidebar está expandido o colapsado. Se inicializa leyendo `localStorage`.
- `openSection`: link actualmente expandido en el menú al tener subgrupos.
- `isMobileOpen`: control de apertura del drawer en mobile.

### Funciones clave

- `toggleSidebar()`: invierte `isExpanded` y guarda la nueva preferencia en `localStorage`.
- `handleNavClick(link)`: si el link tiene subgrupos, abre/cierra el grupo; si no, navega.
- `handleLogout()`: despacha `startLogout()`.
- `getLinkMeta(link)`: devuelve metadata derivada de cada link:
  - `subGroups`
  - `hasSubGroups`
  - `isActive`
  - `isOpen`
- `isSubLinkActive(url)`: compara `location.pathname` con la URL de sublink.

### Dependencias

- `useNavigate` y `useLocation` de `react-router-dom`
- `useDispatch` de `react-redux`
- `SidebarNavLinks` de `src/config/Links.tsx`
- `NAV_SUBGROUPS` de `src/modules/shared/layout/components/appSideBar/helper/NavSubGroups.ts`

---

## 4. Links de navegación

Archivo: `src/config/Links.tsx`

La lista principal es `SidebarNavLinks` y contiene objetos con:

- `description`: texto del link
- `icon`: ícono ReactNode
- `url`: ruta de navegación
- `subtitle` / `value`: información adicional opcional
- `subGroups` opcional disponible a través de `NAV_SUBGROUPS`

Ejemplo de link:

```tsx
{
  description: "Productos",
  icon: <CategoryIcon />,
  url: "/products",
  value: "48",
  subtitle: "3 con stock bajo",
}
```

También hay un filtro `HomePageLinks` que excluye el link principal de la home.

---

## 5. Lista de navegación: `SidebarLinksList`

Archivo: `src/modules/shared/layout/components/appSideBar/components/SidebarLinksList.tsx`

Recibe metadata y handlers desde el hook. Renderiza cada item usando `SidebarNavItem`.

Props principales:

- `isExpanded`: controla si el sidebar está desplegado
- `navLinks`: array de links
- `handleNavClick`: callback al clicar un item
- `getLinkMeta`: obtiene estado `isActive`, `isOpen`, `hasSubGroups`
- `isSubLinkActive`: determina si un sublink es activo
- `navigate`: función de navegación

---

## 6. Items y sublinks

### `SidebarNavItem`

Archivo: `src/modules/shared/layout/components/appSideBar/components/SidebarNavItem.tsx`

Renderiza un botón de navegación principal. Su comportamiento:

- muestra solo el icono cuando `isHovered` es falso (sidebar colapsado)
- muestra descripción cuando `isHovered` es verdadero (sidebar expandido)
- usa `Tooltip` para mostrar el texto en hover cuando está colapsado
- cambia estilos si `isActive`
- incluye `SidebarExpandMore` para indicar subgrupos
- renderiza `SidebarExpandedList` para sublinks

### `SidebarExpandMore`

Archivo: `src/modules/shared/layout/components/appSideBar/components/SidebarExpandMore.tsx`

Muestra el indicador de flecha / estado de expansión solo si el item tiene subgrupos.

### `SidebarExpandedList`

Archivo: `src/modules/shared/layout/components/appSideBar/components/SidebarExpandedList.tsx`

Renderiza la lista de subgrupos dentro de un `Collapse` cuando el item está abierto y el sidebar está expandido.

### `SidebarSubGroup`

Archivo: `src/modules/shared/layout/components/appSideBar/components/SidebarSubGroup.tsx`

Agrupa sublinks bajo un título de grupo. Solo se muestra cuando el sidebar está expandido.

### `SidebarSubLink`

Archivo: `src/modules/shared/layout/components/appSideBar/components/SidebarSubLink.tsx`

Renderiza el link secundario dentro del grupo. Cambia color y peso cuando está activo.

---

## 7. Usuario y acciones rápidas

### `SidebarUserData`

Archivo: `src/modules/shared/layout/components/appSideBar/components/SidebarUserData/SidebarUserData.tsx`

Muestra el bloque de usuario cuando existe un usuario autenticado.

- usa `useSidebarUserData()` para leer datos de Redux
- si está cargando o no hay usuario, no renderiza nada
- muestra avatar, nombre, rol y botón de configuración

Subcomponentes:

- `SidebarUserAvatar`: avatar circular con inicial si no hay imagen
- `SidebarUserInfo`: nombre + rol, visible solo si `isExpanded`
- `SidebarUserSettings`: ícono de configuración que navega a `/account`

### `useSidebarUserData`

Archivo: `src/modules/shared/layout/components/appSideBar/hooks/useSidebarUserData.ts`

Lee el estado `auth` de Redux y normaliza los datos:

- devuelve `userData` con `id`, `name`, `role`, `avatarUrl`, `email`
- si `isLoading`, no hay usuario autenticado o falta `_id`, devuelve `null`

### `SidebarLogout`

Archivo: `src/modules/shared/layout/components/appSideBar/components/SidebarLogout.tsx`

Botón para cerrar sesión.

- muestra texto solo cuando el sidebar está expandido
- usa tooltip cuando el sidebar está colapsado
- invoca `onLogout` al hacer click

---

## 8. Mobile

### `SidebarToggleButtonMobile`

Archivo: `src/modules/shared/layout/components/appSideBar/components/SidebarToggleButtonMobile.tsx`

Es el botón de menú que aparece únicamente en móviles. Abre el drawer lateral.

### `SidebarMobileDrawer`

Archivo: `src/modules/shared/layout/components/appSideBar/components/SidebarMobileDrawer.tsx`

Versión móvil del sidebar. Incluye:

- close button
- `SidebarLinksList` con `isExpanded` forzado a `true`
- `SidebarUserData`
- `SidebarLogout`

Al clicar un link, cierra el drawer inmediatamente.

---

## 9. Tipos relevantes

Archivo: `src/typings/ui/sidebar.types.ts`

Tipos principales:

- `SidebarThemeProps`: `isHovered`
- `NavLinkInterface`: estructura del link de navegación
- `SubGroup` / `SubLink`
- `SidebarLinksListProps`: props del listado principal
- `SidebarNavItemProps`, `SidebarSubGroupProps`, `SidebarSubLinkProps`
- `SidebarToggleProps`, `SidebarLogoutProps`, `SidebarUserDataProps`
- `SidebarMobileDrawerProps`

---

## 10. Consideraciones importantes

- El estado expandido del sidebar se persiste en `localStorage` con la clave `SIDEBAR_STORAGE_KEY`.
- El sidebar desktop es `position: fixed` y no empuja el contenido; el layout reserva ancho con un spacer invisible.
- Los ítems de navegación usan `location.pathname.startsWith(link.url)` para determinar el link activo.
- Los sublinks usan `location.pathname === url` para marcar el sublink exacto.
- En la versión colapsada, los textos no se muestran, pero los tooltips revelan las descripciones.
- La experiencia móvil utiliza `Drawer` y fuerza el sidebar expandido internamente.

---

## 11. Cómo extender o modificar

- Para agregar un nuevo link, edita `SidebarNavLinks` en `src/config/Links.tsx`.
- Para agregar sublinks, define `NAV_SUBGROUPS` en `src/modules/shared/layout/components/appSideBar/helper/NavSubGroups.ts`.
- Para cambiar el orden de los links, modifica el arreglo `SidebarNavLinks`.
- Para cambiar el color de fondo o animaciones, revisa `getNoisyBackgroundSx` en `src/modules/shared/components/NoisyBackground/NoisyBackground.tsx`.
