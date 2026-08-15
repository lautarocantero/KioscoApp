# `ProviderSchema` (Zod) — Documentación

## ¿Para qué sirve?

Esquemas de Zod para las 3 mutaciones de proveedores (crear, editar, borrar). Se usan como validación de forma en la capa de thunks (`store/provider/providerThunks.ts`), antes de pegarle a la API — mismo patrón que `EditSellerSchema`/`authAccountSchema.ts`.

> La validación de **forma** vive acá (y también en `ProviderFormSchema.ts`, con Yup, a nivel de formulario). La validación de **negocio** (rango de `valoration`, formato de `contact_email`, nombre duplicado) la hace el backend — ver `docs/features/providersCrud.md`.

## Contenido

### `CreateProviderSchema`

```ts
z.object({
  name:           z.string().min(1),
  valoration:     z.number().min(1).max(5),
  contact_phone:  z.string().min(1),
  contact_email:  z.string().email(),
})
```

Usado en `createProviderThunk` antes de `POST /provider/create-provider`.

### `EditProviderSchema`

```ts
z.object({
  _id:            z.string().min(1),
  name:           z.string().min(1).optional(),
  valoration:     z.number().min(1).max(5).optional(),
  contact_phone:  z.string().min(1).optional(),
  contact_email:  z.string().email().optional(),
})
```

Todos los campos salvo `_id` son opcionales — permite ediciones parciales (el backend, `ProviderModel.edit`, solo pisa lo que venga definido). Usado en `editProviderThunk` antes de `PUT /provider/edit-provider`.

### `DeleteProviderSchema`

```ts
z.object({
  _id: z.string().min(1),
})
```

Usado en `deleteProviderThunk` antes de `DELETE /provider/delete-provider`.

## Ejemplo de uso

```ts
const parsed = CreateProviderSchema.safeParse(body);
if (!parsed.success) {
  dispatch(setError({ errorMessage: "Los datos del proveedor no son válidos." }));
  return undefined; // no pega a la API con datos inválidos
}
```

## Tests

`src/modules/providers/test/schema/ProviderSchema.test.ts`
