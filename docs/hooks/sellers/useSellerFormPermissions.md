# 🪝 `useSellerFormPermissions`

> Hook de React que resuelve las reglas de autorización del form de edición de vendedor.

## 🎯 ¿Para qué sirve?

Centraliza "quién puede editar qué" en el form de vendedor, para que `SellerFormFirstStep.tsx` no tenga que calcular nada — solo consumir un resultado ya resuelto (regla del proyecto: los `.tsx` no calculan lógica de negocio, solo renderizan).

Reglas actuales:
- **Nombre**: editable por cualquiera.
- **Email**: nunca editable (ni por admin).
- **Rol**: solo admin **del kiosco activo** (rol por-kiosco, no global — ver [docs/features/multiKiosco.md](../../features/multiKiosco.md)).
- **Badge informativo sobre el rol**: visible en modo Editar, oculto en modo Detalle.

## 📦 Firma

```ts
useSellerFormPermissions(isDetail: boolean): {
  isAdmin: boolean;
  disabledFields: (keyof SellerFormValues)[];
  showRoleBadge: boolean;
}
```

- `isDetail`: si el form está en modo solo-lectura (ya todo disabled por otro lado; acá solo afecta si se muestra el badge).

## 💡 Ejemplo

```tsx
const isDetail = actionTitle === FormModeComplexEnum.Detail;
const { disabledFields, showRoleBadge } = useSellerFormPermissions(isDetail);

<FormFieldsRenderer
  disabledFields={disabledFields}
  renderBeforeField={showRoleBadge ? { rol: <RoleAdminOnlyBadge /> } : undefined}
/>
```

## ✨ Beneficios

- 🧼 **`.tsx` limpio de lógica de negocio** — el componente solo decide renderizar, no calcula permisos.
- 🔗 **Reusa [`useIsActiveKioscoAdmin`](../kiosco/useIsActiveKioscoAdmin.md)**, no duplica la comparación de rol.
- 🧪 **Testeable sin montar el form completo** — ver `src/hooks/sellers/test/useSellerFormPermissions.test.ts`.

## 📚 Ver también

[docs/features/sellerRoleAndAccountDeletion.md](../../features/sellerRoleAndAccountDeletion.md) — contexto completo de por qué estas reglas existen (backend incluido).
