# 🪝 `useKioscoInvite`

> Hook de React que trae el código/link de invitación del kiosco activo y maneja el estado de "copiado".

## 🎯 ¿Para qué sirve?

Alimenta `InviteSellerModal` (acción "Agregar vendedor" en `/sellers`, solo admin). Pide el código de invitación al abrirse el modal (no antes, para no gastar una request en cada render de la página de vendedores) y expone un `handleCopy` que copia el link completo al portapapeles.

## 📦 Firma

```ts
useKioscoInvite(open: boolean): {
  inviteInfo: InviteInfo | null;
  loading: boolean;
  error: string | null;
  copied: boolean;
  handleCopy: () => void;
}
```

- `open`: si el modal está abierto. El hook solo dispara la request cuando `open` pasa a `true` (y hay un `activeKiosco`).
- `inviteInfo`: `{ invite_code, invite_link }`, `null` mientras carga o si todavía no se abrió.
- `handleCopy()`: copia `inviteInfo.invite_link` con `navigator.clipboard.writeText` y setea `copied = true`. No hace nada si `inviteInfo` es `null`.

## ⚙️ Comportamiento

```
open pasa a true (y hay activeKiosco):
  1. loading = true, clearError(), copied = false
  2. GET /kiosco/:id/invite-info   (solo admin — el back devuelve 403 si no)
  3. éxito → inviteInfo = { invite_code, invite_link }
     error → error = mensaje parseado
  4. loading = false
```

## 💡 Ejemplo

```tsx
function InviteSellerModal({ open, onClose }: InviteSellerModalProps) {
  const { inviteInfo, loading, error, copied, handleCopy } = useKioscoInvite(open);

  if (loading) return <Skeleton />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <>
      <TextField value={inviteInfo?.invite_code} slotProps={{ input: { readOnly: true } }} />
      <TextField value={inviteInfo?.invite_link} slotProps={{ input: { readOnly: true } }} />
      <Button onClick={handleCopy}>{copied ? "¡Copiado!" : "Copiar link"}</Button>
    </>
  );
}
```

## ✨ Beneficios

- ⏳ **Lazy por diseño**: no pide el código hasta que el modal realmente se abre.
- 🔐 **La autorización es del backend**: el hook solo refleja el 403 como `error` si un no-admin llegara a intentarlo (la UI ya lo previene mostrando "Agregar vendedor" solo a admins).

## Tests

`src/hooks/kiosco/test/useKioscoInvite.test.ts`
