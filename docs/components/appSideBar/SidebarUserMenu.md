# `SidebarUserMenu`

Menú de usuario abajo del panel: nombre + rol, Ajustes y Cerrar sesión. Absorbe lo que antes eran `SidebarUserInfo` + `SidebarUserSettings` + `SidebarLogout`, que vivían repartidos en el bloque de usuario del riel viejo.

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `userData` | `UserData` | De `useSidebarUserData()`. |
| `onOpenSettings` | `() => void` | Abre el modal de Ajustes (`useSettingsModal`). |
| `onLogout` | `() => void` | `handleLogout` de `useAppSidebar` — la acción real (dispatch + navigate). No se llama directo: ver `useSidebarLogoutConfirm`. |

## Comportamiento

- No repite "Editar cuenta"/"Plan de suscripción" (`AccountNavLinks` de `src/config/Links.tsx`) — esos accesos ya están en la propia página de Cuenta, listarlos acá también era redundante.
- El badge de rol reusa los tokens `custom.adminBadge` (mismo criterio que tenía `SidebarUserInfo`).
- "Cerrar sesión" no dispara `onLogout` directo — abre un `ConfirmDialog` (con noisy background, vía `getNoisyBackgroundSx` que ya trae `ConfirmDialog`) preguntando "¿Seguro que querés cerrar sesión?"; `onLogout` recién se llama al confirmar. Ver [useSidebarLogoutConfirm](../../hooks/appSideBar/useSidebarLogoutConfirm.md).
- Como `SidebarMobileDrawer` también renderiza este mismo componente, la confirmación aplica igual en desktop y mobile sin duplicar nada.

## Ejemplo

```tsx
{userData && <SidebarUserMenu userData={userData} onOpenSettings={openSettings} onLogout={handleLogout} />}
```
