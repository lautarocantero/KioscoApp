# `KioscoMemberSchema` — Documentación

## ¿Para qué sirve?

Esquemas de Zod para las acciones sobre un miembro de un kiosco (sacar del kiosco, cambiar rol). Validación de **forma** antes de pegarle a la API — mismo patrón que `EditSellerSchema` en `modules/sellers/schema/SellerSchema.ts`. La validación de **autorización** la hace el backend (403 si quien llama no es admin del kiosco).

## Contenido

### `RemoveKioscoMemberSchema`

```ts
z.object({
  kioscoId: z.string().min(1),
  userId: z.string().min(1),
})
```

Usado en `deleteSellerThunk` (`store/seller/sellerThunks.ts`) antes de pegarle a `DELETE /kiosco/:kiosco_id/member/:user_id`.

### `UpdateKioscoMemberRoleSchema`

```ts
z.object({
  kioscoId: z.string().min(1),
  userId: z.string().min(1),
  role: z.string().min(1),
})
```

Usado en `updateKioscoMemberRoleThunk` (`store/kiosco/kioscoThunks.ts`) antes de pegarle a `PUT /kiosco/:kiosco_id/member/:user_id/role`.

## Ejemplo de uso

```ts
const parsed = RemoveKioscoMemberSchema.safeParse({ kioscoId, userId });
if (!parsed.success) return false; // no pega a la API con datos inválidos
```

## Tests

`src/modules/kiosco/test/schema/KioscoMemberSchema.test.ts`
