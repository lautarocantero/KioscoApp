# 🪝 `useIsActiveKioscoAdmin`

> Hook de React que resuelve si el usuario logueado es admin **del kiosco activo**.

## 🎯 ¿Para qué sirve?

Reemplaza al viejo `useIsAdmin` (`hooks/auth/useIsAdmin.ts`, eliminado): el rol dejó de ser global sobre `Auth` y ahora vive por-kiosco en `KioscoMembership` (ver [docs/features/multiKiosco.md](../../features/multiKiosco.md)). Mantiene el mismo shape de retorno (`boolean`) para minimizar el diff en los call sites que ya usaban `useIsAdmin`.

## 📦 Firma

```ts
useIsActiveKioscoAdmin(): boolean
```

- No recibe parámetros.
- Internamente es `useActiveKiosco().isAdmin`.

## 💡 Ejemplo

```ts
import { useIsActiveKioscoAdmin } from "../../hooks/kiosco/useIsActiveKioscoAdmin";

const isAdmin = useIsActiveKioscoAdmin();
```

## 📍 Consumidores actuales

- `useSellerFormPermissions` — gating de campos en el form de edición de vendedor.

## ✨ Beneficios

- 🧠 **Una sola fuente de verdad** para la comparación de rol, ahora resuelta contra el kiosco activo en vez de un campo global.
- 🔁 **Migración de bajo diff**: mismo nombre de shape que `useIsAdmin`, así los consumidores que solo necesitan el booleano no tuvieron que cambiar de forma.

## Tests

`src/hooks/kiosco/test/useIsActiveKioscoAdmin.test.ts`
