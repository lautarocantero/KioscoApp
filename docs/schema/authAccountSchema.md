# `authAccountSchema` — Documentación

## ¿Para qué sirve?

Esquemas de Zod para las acciones administrativas sobre una cuenta (`Auth`): editar rol y borrar cuenta. Se usan como validación de forma en la capa de thunks, antes de pegarle a la API — mismo patrón que `EditSellerSchema` en `modules/sellers/schema/SellerSchema.ts`.

> La validación de **forma** vive acá. La validación de **autorización** (¿puede este usuario hacer esto?) la hace el backend — ver `docs/features/sellerRoleAndAccountDeletion.md`.

## Contenido

### `EditAuthRoleSchema`

```ts
z.object({
  _id:  z.string().min(1),
  role: z.string().min(1),
})
```

Usado en `startEditAuthRole` (`store/auth/authThunks.ts`) antes de pegarle a `PUT /auth/edit-auth`.

### `DeleteAuthAccountSchema`

```ts
z.object({
  _id: z.string().min(1),
})
```

Usado en `deleteSellerThunk` (`store/seller/sellerThunks.ts`) antes de pegarle a `DELETE /auth/delete-auth`.

## Ejemplo de uso

```ts
const parsed = EditAuthRoleSchema.safeParse(payload);
if (!parsed.success) return false; // no pega a la API con datos inválidos
```

## Tests

`src/modules/auth/test/schema/authAccountSchema.test.ts`
