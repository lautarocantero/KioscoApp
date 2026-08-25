# RolesPermissionsDialog — Documentación

## ¿Para qué sirve?

Modal de solo lectura que responde "¿qué puede hacer un vendedor hoy en Stocko?". Vive en `src/modules/shared/components/RolesPermissionsDialog/` porque tiene dos disparadores en dos módulos distintos:

- Un link al pie de [InviteSellerModal](InviteSellerModal.md) (app autenticada) — el momento en que un admin decide si invitar a alguien y necesita saber qué le va a poder delegar.
- El propio bullet "Permisos por rol" en la banda "Multi-kiosco" de la landing pública (`LandingFeatureShowcaseRow.tsx` → `LandingFeatureShowcaseBullets.tsx`) — mismo contenido, para quien todavía no tiene cuenta y está evaluando el producto. Ahí no hay un link aparte: el bullet en sí se resalta con el color de acento de la sección (azul) y suma un `ChevronRightIcon` para señalar que es clickeable (`LandingFeatureShowcaseBullet.isClickable`).

Es un componente puramente presentacional: recibe `open`/`onClose` y renderiza la matriz de `src/config/rolesPermissionsMatrix.ts`, sin ningún cálculo propio ni dependencia de auth/kiosco activo (por eso puede vivir también en la landing sin sesión).

## Props (`RolesPermissionsDialogProps`)

```ts
interface RolesPermissionsDialogProps {
  open: boolean;
  onClose: () => void;
}
```

## Fuente de datos: `ROLES_PERMISSIONS_MATRIX`

`src/config/rolesPermissionsMatrix.ts` exporta un array de dominios (`RolePermissionDomain[]`, tipos en `src/typings/permissions/permissionsTypes.ts`):

```ts
interface RolePermissionAction {
    labelKey: string;   // clave de traducción, namespace rolesPermissions.domains.*
    adminOnly: boolean;
}

interface RolePermissionDomain {
    titleKey: string;
    actions: RolePermissionAction[];
}
```

**Regla importante:** cada fila debe reflejar una restricción *ya implementada en código*, no una funcionalidad planeada a futuro — mostrarle al usuario un permiso que no es real todavía sería peor que no mostrar nada. Cuando se agregue o saque un gate de admin en algún módulo (ej. un nuevo `useIsActiveKioscoAdmin()` en un hook), hay que actualizar la fila correspondiente acá también.

Dominios cubiertos hoy: Kiosco, Productos, Presentaciones, Proveedores, Ventas/Caja, Comprobantes, Vendedores, Dashboard, Membresía, Configuración. Quedaron afuera Autenticación/Cuenta propia y Notificaciones (son acciones sobre la propia cuenta, no hay distinción de rol que mostrar) y Categorías (todavía es un stub sin CRUD real).

## Estilo visual

Cada acción muestra un badge:
- **Admin** — mismo gradiente dorado que `theme.custom.adminBadge` (el badge de rol que ya se ve en el sidebar, `SidebarUserInfo.tsx`), para que "esto es admin-only" se lea igual en toda la app.
- **Ambos** — pill neutro (`alpha(theme.custom.white, 0.08)`).

No se usó `RoleAdminOnlyBadge.tsx` (el chip que ya existe para el campo Rol del form de vendedor) porque ese es un componente atado a un solo campo puntual; acá se necesitaba un badge por cada fila de una lista larga, así que se armó el pill inline con los mismos tokens del theme en vez de forzar la reutilización de un componente con una forma distinta.

## Ejemplo de uso

```tsx
const [rolesInfoOpen, setRolesInfoOpen] = useState(false);

<Link component="button" onClick={() => setRolesInfoOpen(true)}>
  {t("rolesPermissions.triggerLabel")}
</Link>
<RolesPermissionsDialog open={rolesInfoOpen} onClose={() => setRolesInfoOpen(false)} />
```

## Tests

`src/modules/shared/test/RolesPermissionsDialog.test.tsx`
