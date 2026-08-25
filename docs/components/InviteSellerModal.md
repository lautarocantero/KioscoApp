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

## Link "¿Qué puede hacer un vendedor?"

Siempre visible al pie del modal (independiente del estado de `inviteInfo`). Abre [RolesPermissionsDialog](RolesPermissionsDialog.md) con la matriz completa de qué puede hacer cada rol — es el momento natural en que un admin decide si invitar a alguien y necesita saber qué le va a poder delegar. El estado de apertura (`rolesInfoOpen`) es un `useState` local al componente (mismo patrón que `PasswordField.tsx`): es un toggle de UI puro, no hay lógica de negocio que resolver.

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
