# 🪝 `useSellerFormPermissions`

> Hook de React que resuelve las reglas de autorización del form de edición de vendedor.

## 🎯 ¿Para qué sirve?

Centraliza "quién puede editar qué" en el form de vendedor, para que `SellerFormFirstStep.tsx` no tenga que calcular nada — solo consumir un resultado ya resuelto (regla del proyecto: los `.tsx` no calculan lógica de negocio, solo renderizan).

Reglas actuales:
- **Nombre**: editable por el propio vendedor (`sellerId === auth._id`) o por un admin. Si un seller abre el perfil de *otro* vendedor, el campo queda disabled con tooltip "Solo disponible para el administrador".
- **Email**: nunca editable (ni por admin).
- **Rol**: solo admin **del kiosco activo** (rol por-kiosco, no global — ver [docs/features/multiKiosco.md](../../features/multiKiosco.md)).
- **Badge informativo sobre el rol**: visible en modo Editar, oculto en modo Detalle.

## 📦 Firma

```ts
useSellerFormPermissions(isDetail: boolean, sellerId?: string): {
  isAdmin: boolean;
  disabledFields: (keyof SellerFormValues)[];
  disabledFieldsTooltip: Partial<Record<keyof SellerFormValues, string>>;
  showRoleBadge: boolean;
}
```

- `isDetail`: si el form está en modo solo-lectura (ya todo disabled por otro lado; acá solo afecta si se muestra el badge).
- `sellerId`: el `_id` del vendedor que se está viendo/editando (viene de `useParams<{ seller_id }>()` en `SellerFormFirstStep`). Se compara contra `state.auth._id` para resolver si quien mira el form es el propio vendedor.
- `disabledFieldsTooltip`: mapa campo → texto de tooltip que **reemplaza** al tooltip default de ese campo (`SELLER_FIELD_REGISTRY[campo].tooltip`) mientras el campo esté disabled. Hoy solo aplica a `name` cuando `!isAdmin && !isSelf`.

## 💡 Ejemplo

```tsx
const { seller_id: sellerId } = useParams<{ seller_id: string }>();
const isDetail = actionTitle === FormModeComplexEnum.Detail;
const { disabledFields, disabledFieldsTooltip, showRoleBadge } = useSellerFormPermissions(isDetail, sellerId);

<FormFieldsRenderer
  disabledFields={disabledFields}
  disabledTooltip={disabledFieldsTooltip}
  renderBeforeField={showRoleBadge ? { rol: <RoleAdminOnlyBadge /> } : undefined}
/>
```

## ✨ Beneficios

- 🧼 **`.tsx` limpio de lógica de negocio** — el componente solo decide renderizar, no calcula permisos.
- 🔗 **Reusa [`useIsActiveKioscoAdmin`](../kiosco/useIsActiveKioscoAdmin.md)**, no duplica la comparación de rol.
- 🧪 **Testeable sin montar el form completo** — ver `src/hooks/sellers/test/useSellerFormPermissions.test.ts`.

## 📚 Ver también

[docs/features/sellerRoleAndAccountDeletion.md](../../features/sellerRoleAndAccountDeletion.md) — contexto completo de por qué estas reglas existen (backend incluido).
