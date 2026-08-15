# 🪝 `useIsAdmin`

> Hook de React que resuelve si el usuario logueado es admin.

## 🎯 ¿Para qué sirve?

Único punto de verdad para "¿el usuario logueado es admin?" — evita repetir `state.auth.role === AuthRoleEnum.Admin` en cada hook/componente que necesite esa autorización.

## 📦 Firma

```ts
useIsAdmin(): boolean
```

- No recibe parámetros.
- Lee `state.auth.role` del store y lo compara contra `AuthRoleEnum.Admin`.

## 💡 Ejemplo

```ts
import { useIsAdmin } from "../../hooks/auth/useIsAdmin";

function useSellers() {
  const isAdmin = useIsAdmin();
  // ... solo pasar onDeleteRequest si isAdmin
}
```

## 📍 Consumidores actuales

- `useSellerFormPermissions` — gating de campos en el form de edición de vendedor.
- `useSellers` — gating del botón "Eliminar" en el listado.
- `useSellerEdit` (`useSellersForm.ts`) — decide si además de editar el nombre hay que pegarle a `/auth/edit-auth` para el rol.

## ✨ Beneficios

- 🧠 **Una sola fuente de verdad** para la comparación de rol — si cambia cómo se determina "es admin" (por ejemplo, agregar un rol intermedio), se toca acá y no en 3 lugares distintos.
- 🧪 **Fácil de testear en aislado**, sin tener que levantar cada consumidor.
