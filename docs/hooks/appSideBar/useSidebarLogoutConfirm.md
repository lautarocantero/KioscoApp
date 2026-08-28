# `useSidebarLogoutConfirm`

Gate de confirmación para "Cerrar sesión" en `SidebarUserMenu`.

## ¿Para qué sirve?

El click en "Cerrar sesión" del menú ya no dispara el logout real directo — abre un `ConfirmDialog` primero. `onLogout` (el `handleLogout` de `useAppSidebar`: dispatch + navigate) solo se ejecuta si el usuario confirma.

## Firma

```ts
useSidebarLogoutConfirm(onLogout: () => void): UseSidebarLogoutConfirmReturn
```

- `isOpen` — si el diálogo de confirmación está abierto.
- `requestLogout()` — abre el diálogo (handler del ítem "Cerrar sesión" del menú).
- `cancelLogout()` — cierra sin llamar a `onLogout`.
- `confirmLogout()` — cierra y llama a `onLogout`.

## Ejemplo

```tsx
const { isOpen, requestLogout, cancelLogout, confirmLogout } = useSidebarLogoutConfirm(onLogout);

<Box component="button" onClick={requestLogout}>Cerrar sesión</Box>
<ConfirmDialog open={isOpen} onConfirm={confirmLogout} onCancel={cancelLogout} .../>
```

## Ver también

- [SidebarUserMenu](../../components/appSideBar/SidebarUserMenu.md)
