# InviteSellerModal — Documentación

## ¿Para qué sirve?

Modal disparado por el header action "Agregar vendedor" en `/sellers` (visible solo para admin del kiosco activo — ver [useSellers](../hooks/sellers/useSellers.md)). Muestra el código y el link de invitación del kiosco para compartir manualmente con quien se quiera sumar como vendedor.

> No envía ningún email — el envío por Resend está deshabilitado hasta que se pague un plan (ver nota en `authThunks.ts`/`emailService.ts`). Es un flujo de "copiá y compartí vos mismo".

## Props (`InviteSellerModalProps`)

```ts
interface InviteSellerModalProps {
  open: boolean;
  onClose: () => void;
}
```

Toda la data (`inviteInfo`, `loading`, `error`, `copied`) y el handler de copiado vienen de [useKioscoInvite](../hooks/kiosco/useKioscoInvite.md) — el componente es puramente presentacional (loader con `Skeleton`, `Alert` de error, o el contenido con los dos `TextField` de solo-lectura + botón "Copiar link").

## Estados

| Estado | Qué se muestra |
|---|---|
| `loading` | dos `Skeleton` rectangulares |
| `error` | `Alert severity="error"` con el mensaje |
| `inviteInfo` listo | código + link (readOnly) + botón "Copiar link" (cambia a "¡Copiado!" con ícono de check tras el click) |

## Ejemplo de uso

```tsx
const [inviteModalOpen, setInviteModalOpen] = useState(false);

<DataTableHeader
  newItem={isAdmin ? { label: t("sellers.addSeller"), onClick: () => setInviteModalOpen(true) } : undefined}
/>
<InviteSellerModal open={inviteModalOpen} onClose={() => setInviteModalOpen(false)} />
```

## Tests

`src/modules/sellers/test/components/InviteSellerModal.test.tsx`
