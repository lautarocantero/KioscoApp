# 🪝 `useSellers`

> Hook de React que orquesta la página de listado de vendedores (`/sellers`).

## 🎯 ¿Para qué sirve?

Combina la carga de vendedores del kiosco activo con búsqueda, el diálogo de borrado, el gating admin-only de acciones, y el modal de invitación.

## 📦 Firma

```ts
useSellers(): {
  sellers: Seller[];
  loading: boolean;
  error: string | null;
  clearError: () => void;
  deleteDialog: DeleteDialogState;
  handleDeleteRequest: (id: string, name: string) => void;
  handleDeleteCancel: () => void;
  handleDeleteConfirm: () => Promise<void>;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  columns: GridColDef[];
  isAdmin: boolean;
  inviteModalOpen: boolean;
  openInviteModal: () => void;
  closeInviteModal: () => void;
}
```

- `sellers` ya viene filtrado por `searchTerm` (`filterSellersBySearch`).
- `isAdmin` sale de [`useActiveKiosco()`](../kiosco/useActiveKiosco.md) — es el rol del usuario logueado **en el kiosco activo**, no un rol global.
- `columns` — resultado de `buildColumnsForSellers({ onDeleteRequest, onEditRequest, navigate })`. `onDeleteRequest` solo se pasa si `isAdmin` es `true`; si no, el botón "Eliminar" ni se renderiza en la tabla (el 403 del backend sigue siendo la protección real).
- `handleDeleteConfirm` despacha `deleteSellerThunk(activeKiosco._id, deleteDialog.id)` — saca al vendedor del kiosco activo, no borra su cuenta (ver [docs/store/seller.md](../../store/seller.md)). Si `activeKiosco` es `null` no hace nada.
- `inviteModalOpen`/`openInviteModal`/`closeInviteModal` — controlan [`InviteSellerModal`](../../components/InviteSellerModal.md), disparado por el header action "Agregar vendedor" (admin-only).

## 💡 Ejemplo

```tsx
const {
  sellers, columns, deleteDialog, handleDeleteConfirm, handleDeleteCancel,
  searchTerm, setSearchTerm, isAdmin, inviteModalOpen, openInviteModal, closeInviteModal,
} = useSellers();

<DataTable
  rows={sellers}
  columns={columns}
  search={{ value: searchTerm, onChange: setSearchTerm }}
  newItem={isAdmin ? { label: t("sellers.addSeller"), onClick: openInviteModal } : undefined}
  deleteDialog={{ ...deleteDialog, onCancel: handleDeleteCancel, onConfirm: handleDeleteConfirm }}
/>
<InviteSellerModal open={inviteModalOpen} onClose={closeInviteModal} />
```

## ✨ Beneficios

- 🔐 **Gating admin-only centralizado** — ni la tabla ni el modal de invitar aparecen para un vendedor no-admin.
- 🏪 **Scoped al kiosco activo**: tanto el borrado como la invitación operan sobre `activeKiosco`, nunca sobre "todos los vendedores" globalmente.

## Tests

`src/hooks/sellers/test/useSellers.test.ts`
