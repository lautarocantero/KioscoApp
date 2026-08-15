# 🎭 Edición de rol y eliminación de vendedores (solo admin) — Documentación técnica

> **Actualización:** reglas de permisos más finas por campo — ver
> [Permisos por campo (actualización)](#permisos-por-campo-actualización)
> al final del documento.

## Índice

1. [Resumen](#resumen)
2. [Modelo mental](#modelo-mental)
3. [Flujo completo](#flujo-completo)
4. [Backend](#backend)
5. [Frontend](#frontend)
6. [Decisiones de diseño](#decisiones-de-diseño)
7. [Cómo probarlo](#cómo-probarlo)
8. [Pendientes](#pendientes)
9. [Archivos tocados](#archivos-tocados-referencia-rápida)

---

## Resumen

En el form de edición de vendedor, el select de **Rol** ahora se deshabilita
para cualquier usuario que no sea `admin`. Solo un admin puede promover o
degradar a otro vendedor.

Al investigar cómo se guardaba ese cambio de rol aparecieron dos bugs de
fondo, ambos arreglados en esta misma pasada:

1. **El rol nunca se guardaba.** `PUT /seller/edit-seller` no acepta `rol`
   — el rol vive en `Auth`, no en `Seller` (ver comentario en
   `seller.controller.ts`). El form lo mandaba igual y el backend lo
   ignoraba en silencio.
2. **Eliminar un vendedor dejaba el login huérfano.** El botón "Eliminar"
   pegaba a `DELETE /seller/delete-seller`, que solo borra el perfil. Las
   credenciales (`Auth`) quedaban vivas pero sin `Seller` asociado, así que
   ese usuario ya no podía loguearse pero tampoco estaba realmente borrado.

## Modelo mental

```
Seller (perfil)              Auth (credenciales + rol)
  _id                          _id  (== Seller._id)
  name                         email
  profilePhoto                 password
  created_at                   role         ← acá vive el rol
  user_status                  isVerified

PUT /seller/edit-seller  → solo toca Seller (name/profilePhoto/user_status)
PUT /auth/edit-auth       → solo toca Auth (email/password/role) — role: solo admin
DELETE /auth/delete-auth  → borra Auth Y Seller en cascada (transacción) — solo admin
DELETE /seller/delete-seller → borra SOLO Seller (ya no lo usa el front)
```

## Flujo completo

### Editar un vendedor (`useSellerEdit` → `SellerEditForm`)

```
SellerFormFirstStep.tsx
  isAdmin = state.auth.role === AuthRoleEnum.Admin
    → FormFieldsRenderer disabledFields={isAdmin ? [] : ["rol"]}
      → el <Select> de Rol queda disabled para cualquiera que no sea admin

Guardar (Formik onSubmit → useSellerEdit.handleEdit)
  1. dispatch(editSellerThunk({ _id, name }))        → PUT /seller/edit-seller (siempre)
  2. si isAdmin && rol !== editingSeller.role:
       dispatch(startEditAuthRole({ _id, role }))    → PUT /auth/edit-auth (solo si cambió)
  3. navigate("/sellers")
```

El paso 2 es condicional a propósito: si un admin abre el form y guarda sin
tocar el rol, no se dispara una llamada extra a `/auth/edit-auth`.

### Eliminar un vendedor (`useSellers` → `deleteSellerThunk`)

```
Eliminar (confirmación en el diálogo)
  → dispatch(deleteSellerThunk(_id))
    → authDeleteAccountRequest({ _id })   → DELETE /auth/delete-auth (cascada)
    → dispatch(removeSellerFromList({ _id }))
```

## Backend

### `auth.controller.ts` — `editAuth`

El campo `role` es "uso administrativo": si viene en el body y quien llama
no es admin, corta con 403 **antes** de tocar el modelo. `email`/`password`
siguen editables por cualquier usuario autenticado (nadie los usa desde el
front todavía, pero no hace falta ser admin para eso).

```ts
export async function editAuth(req: EditAuthRequest, res: Response): Promise<void> {
  const { _id, email, password, role } = req.body;

  if (role !== undefined && req.user?.role !== AuthRoleEnum.Admin) {
    res.status(403).json({ message: 'Solo un administrador puede editar el rol de un usuario' });
    return;
  }

  try {
    await AuthModel.editAuth({ _id, email, password, role });
    // ...
```

> Nota de implementación: el import de `AuthRoleEnum` acá es **relativo**
> (`../typings/auth/enums`), no vía el alias `@typings/auth/enums`. El dev
> server corre con `ts-node-dev --transpile-only`, que no resuelve el path
> alias en runtime (solo en type-check). Si el símbolo se usa como *tipo*
> el import se elide en la transpilación y no importa; en cuanto se usa
> como *valor* (como acá, `AuthRoleEnum.Admin`), hace falta el import
> relativo — mismo patrón que ya usaba `authModel.ts`.

### `auth.routes.ts`

```ts
router.put('/edit-auth', authMiddleware, editAuth);
// Elimina identidad + cascada a Seller: solo un admin puede borrar cuentas.
router.delete('/delete-auth', authMiddleware, requireRole([AuthRoleEnum.Admin]), deleteAuth);
```

`requireRole` ya existía en `authMiddleware.ts` pero no se usaba en ningún
lado — el TODO en el código (`//hacer que rol especifico pueda eliminar o
editar auth`) señalaba exactamente este gap. Antes de este cambio,
**cualquier usuario autenticado podía borrar la cuenta de cualquier otro**
(incluido un admin) con solo conocer su `_id`.

### `authModel.ts` — `deleteAuth`

Sin cambios de comportamiento, solo documentando lo que ya hacía: borra
`Auth` y `Seller` dentro de una transacción de Mongoose.

```ts
static async deleteAuth(data: DeleteAuthPayload): Promise<void> {
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
        const deletedAuth = await AuthSchema.findOneAndDelete({ _id }).session(session);
        if (!deletedAuth) throw new Error('User not found');
        await SellerSchema.findOneAndDelete({ _id }).session(session);
    });
}
```

## Frontend

### Mecanismo genérico: `disabledFields` en `FormFieldsRenderer`

Antes, `FormFieldsRenderer` solo tenía un `readOnly` global (todo el form
o nada — usado en modo Detalle). Se agregó un `disabledFields?: (keyof
T)[]` para deshabilitar campos puntuales sin tocar el resto del form:

```ts
// formCard.types.ts
export interface FormFieldsRendererProps<T extends object> {
    // ...
    readOnly?: boolean;
    disabledFields?: (keyof T)[];
}
```

```tsx
// FormFieldsRenderer.tsx
const isFieldDisabled = readOnly || !!disabledFields?.includes(fieldKey);
// se pasa a TextField, al FormControl del radio, y a SelectField
```

El `<Select>` (`PresentationCategoryField.tsx` → `FormSelector` →
`FormSelectorSingle`/`Multi`) ya soportaba un prop `disabled` a nivel de
tipos (`CategorySelectorBaseProps`) pero nadie se lo pasaba desde el
renderer genérico — solo faltaba conectar el cable.

### `SellerFormFirstStep.tsx`

```tsx
const currentUserRole = useSelector((state: RootState) => state.auth.role);
const isAdmin = currentUserRole === AuthRoleEnum.Admin;

<FormFieldsRenderer
    // ...
    disabledFields={isAdmin ? [] : ["rol"]}
/>
```

### Tipos: `Seller` vs `SellerWithRole`

`Seller` (`sellerTypes.ts`) es un espejo exacto del `SellerEntity` del
backend — **no** tiene `email` ni `rol`, porque esos campos viven en
`Auth`. `SellerWithRole` es lo que devuelven los endpoints que sí hacen el
join contra `Auth` (`get-sellers`, `get-seller-by-id`).

El form de edición necesita `email`/`role` para mostrarlos, así que:
- `getSellerByIdRequest` ahora tipa su respuesta como `SellerWithRole[]`
  (antes decía `Seller[]`, aunque el backend siempre devolvió el join).
- `useSellerData` devuelve `SellerWithRole | null` (antes `Seller | null`,
  con un `any` tapando el hueco en `getSellerEditInitialValues`).
- `SellerFormValues` (nuevo, en `sellerTypes.ts`) es el tipo real de los
  valores del form: `{ name, email, rol, password? }`, con `rol:
  AuthRoleEnum` como campo propio (no viene de `Pick<Seller, ...>`, que ya
  no tiene esas keys).

Esto además destapó un bug real: `getSellerEditInitialValues` leía
`seller?.rol` (undefined siempre — el campo se llama `role`), así que el
select de Rol arrancaba mostrando "Vendedor" por defecto sin importar el
rol real del vendedor que se estaba editando.

### `useSellersForm.ts` — `useSellerEdit`

```ts
const handleEdit = async (values: Pick<SellerFormValues, "name" | "rol">) => {
    const sellerBody: EditSellerPayload = { _id: sellerId, name: values.name };
    const ok = await dispatch(editSellerThunk(sellerBody));
    if (!ok) throw new Error("No se pudo editar el vendedor");

    if (isAdmin && values.rol !== editingSeller?.role) {
        const roleOk = await dispatch(startEditAuthRole({ _id: sellerId, role: values.rol }));
        if (!roleOk) throw new Error("No se pudo actualizar el rol del vendedor");
    }

    navigate(`/sellers`);
};
```

Antes armaba un `EditSellerPayload` con `email`, `rol`, `created_at` y un
`user_status` hardcodeado a `"active"` (valor que ni siquiera existe en
`SellerStatus`) — campos que el backend ignora o que ya estaban mal
tipados (de ahí el `as unknown as EditSellerPayload`). Ahora solo manda lo
que el endpoint realmente acepta.

### `authApi.ts` / `authThunks.ts` — nuevos

```ts
// authApi.ts — cliente CON refresh (createHttpClient), porque estos
// endpoints sí dependen de un access_token vigente (a diferencia de
// login/register, que usan el cliente sin interceptor).
export const authEditRoleRequest = (data: AuthEditRoleApiPayload) =>
  authenticatedUrl.put("/edit-auth", data).then(r => r.data);

export const authDeleteAccountRequest = (data: AuthDeleteAccountApiPayload) =>
  authenticatedUrl.delete("/delete-auth", { data }).then(r => r.data);
```

```ts
// authThunks.ts
export const startEditAuthRole = (payload: AuthEditRolePayload) => /* ... */;
```

`deleteSellerThunk` (en `sellerThunks.ts`) mantiene el mismo nombre y la
misma firma — sigue viviendo en el dominio de sellers porque actualiza la
lista de vendedores del store (`removeSellerFromList`) — pero por dentro
ahora llama a `authDeleteAccountRequest` en vez de al `deleteSellerRequest`
que solo borraba el perfil. Ese `deleteSellerRequest` (y la ruta `DELETE
/seller/delete-seller` que consumía) quedó sin uso desde el frontend y se
borró de `sellerApi.ts`.

## Decisiones de diseño

### ¿Por qué el guard de rol vive en el controller y no en la ruta con `requireRole`?

`PUT /edit-auth` es un único endpoint para tres campos con dueños
distintos: `email`/`password` los puede tocar cualquier usuario
autenticado sobre su propia cuenta (aunque nada lo use desde el front
todavía), `role` es exclusivamente administrativo. Un `requireRole` a
nivel de ruta bloquearía el endpoint entero para no-admins, cerrando la
puerta a un futuro "editar mi email/contraseña" self-service. El chequeo
puntual (`if (role !== undefined && !isAdmin)`) solo restringe lo que
efectivamente necesita restricción.

### ¿Por qué `DELETE /delete-auth` sí usa `requireRole` a nivel de ruta?

Ahí no hay ambigüedad: el endpoint entero es "borrar una cuenta", no hay
una variante self-service que conservar (no existe un flujo de "borrar mi
propia cuenta" en el front hoy). Restringir toda la ruta es más simple y
no le saca nada a nadie.

### ¿Por qué `deleteSellerThunk` no cambió de nombre?

`useSellers.ts` ya lo importaba y lo usaba en el `handleDeleteConfirm`.
Cambiar la implementación interna (qué endpoint pega) sin tocar la firma
pública evita un diff innecesario en la capa de UI — el hook que lo
consume no necesita saber que ahora es una cascada Auth+Seller en vez de
un borrado de Seller solo.

### ¿Por qué el rol solo se manda a `/auth/edit-auth` si cambió?

Evita una llamada de red redundante en el caso común (admin edita el
nombre, no toca el rol). También evita generar un 403 espurio si por
alguna razón el `role` que ya tenía el seller no es exactamente el que
espera el enum (edge case de datos viejos).

## Cómo probarlo

Verificado manualmente contra el backend real (Mongo Atlas), con cuentas
descartables creadas y borradas para no tocar datos reales:

1. **Select deshabilitado para no-admin** — login como `seller`, ir a
   Editar sobre cualquier vendedor: el combobox de Rol no abre al
   clickearlo (queda fuera del árbol de accesibilidad "interactive").
   ✅ confirmado.
2. **Select habilitado para admin + persistencia** — login como `admin`,
   cambiar el rol de otro vendedor a Administrador, Guardar. Confirmado
   `PUT /seller/edit-seller → 200` y `PUT /auth/edit-auth → 200` en
   Network, y el valor `role` actualizado en Mongo. ✅ confirmado.
3. **403 si un no-admin pega directo a la API** — login como `seller` vía
   `curl`, `PUT /auth/edit-auth` con `role` en el body → `403 {"message":
   "Solo un administrador puede editar el rol de un usuario"}`. ✅
   confirmado (protección real es del servidor, no solo la UI).
4. **Delete en cascada** — login como admin, eliminar un vendedor desde la
   lista → `DELETE /auth/delete-auth → 200`, y tanto el doc de `auth` como
   el de `sellers` desaparecen de Mongo. ✅ confirmado.
5. **403 en delete para no-admin** — `DELETE /auth/delete-auth` con sesión
   de `seller` vía `curl` → `403 {"message": "Insufficient permissions"}`.
   ✅ confirmado.

### Tests automatizados

- `src/hooks/sellers/test/useSellersForm.test.ts` — cubre los 4 casos de
  `handleEdit`: solo-nombre (no admin), nombre+rol (admin, rol cambió), no
  llama a `startEditAuthRole` si el rol no cambió, y los dos caminos de
  error (falla el nombre / falla el rol).
- `src/modules/shared/test/FormCard/FormFieldsRenderer.test.tsx` — cubre
  el mecanismo genérico de `disabledFields` (texto y select).
- `src/modules/sellers/test/schema/SellerFormSchema.test.ts` — cubre el
  fix de `getSellerEditInitialValues` (lee `.role`, no `.rol`).

## Pendientes

- [x] ~~El listado de vendedores muestra "Eliminar" a cualquier usuario~~ —
      resuelto, ver [Permisos por campo (actualización)](#permisos-por-campo-actualización).
- [ ] 🟡 `email`/`password` en `/auth/edit-auth` no tienen ningún consumidor
      desde el front todavía (nadie edita su propio email/contraseña). El
      endpoint está listo para eso, falta el flujo de UI.
- [ ] 🟢 `docs/hooks/sellers/useSellers.md` describe una versión vieja del
      hook (`{ sellers, loading, error, clearError }`) — el hook real
      devuelve bastante más (`deleteDialog`, `columns`, etc). No se tocó
      en esta pasada por no ser parte de lo que se estaba arreglando.

## Archivos tocados (referencia rápida)

**Backend**
- `controllers/auth.controller.ts` — guard de admin en `editAuth`
- `routes/auth.routes.ts` — `requireRole([Admin])` en `/delete-auth`

**Frontend**
- `typings/shared/types/formCard.types.ts` — `disabledFields`, `SelectFieldProps.disabled`
- `modules/shared/components/FormCard/FormFieldsRenderer.tsx` — conecta `disabled` al `<Select>`
- `modules/presentations/components/PresentationForm/PresentationCategoryField.tsx` — threading de `disabled`
- `modules/sellers/components/SellerForm/SellerFormFirstStep.tsx` — `isAdmin` + `disabledFields`
- `modules/sellers/components/SellerForm/SellerFieldRegistry.ts` — tipo `SellerFormValues`
- `modules/sellers/schema/SellerFormSchema.ts` — `getSellerEditInitialValues` lee `.role`
- `modules/sellers/pages/SellersList/components/SellerColumns.tsx` — label de rol en español
- `typings/seller/sellerTypes.ts` — `SellerFormValues`
- `typings/auth/authTypes.d.ts` — `AuthEditRolePayload`, `AuthDeleteAccountPayload`
- `modules/auth/api/authApi.ts` — `authEditRoleRequest`, `authDeleteAccountRequest`
- `modules/sellers/api/sellerApi.ts` — `getSellerByIdRequest` retipado, `deleteSellerRequest` eliminado
- `store/auth/authThunks.ts` — `startEditAuthRole`
- `store/seller/sellerThunks.ts` — `deleteSellerThunk` usa `authDeleteAccountRequest`
- `hooks/sellers/useSellerData.ts` — devuelve `SellerWithRole | null`
- `hooks/sellers/useSellersForm.ts` — `handleEdit` reescrito

---

## Permisos por campo (actualización)

Reglas finales, por campo y por acción:

| Campo/acción | Seller (no-admin) | Admin |
|---|---|---|
| Nombre | ✅ edita | ✅ edita |
| Email | 🚫 nunca editable | 🚫 nunca editable |
| Rol | 🚫 disabled | ✅ edita |
| Acceder al form de editar | ✅ (a cualquier vendedor) | ✅ |
| Botón "Eliminar" | 🚫 no se muestra | ✅ visible, borra en cascada |

### Email: nunca editable, ni por admin

Antes el email quedaba habilitado para admins (aunque el backend lo
ignoraba). Ahora `disabledFields` en `SellerFormFirstStep.tsx` incluye
`"email"` incondicionalmente:

```ts
disabledFields={isAdmin ? ["email"] : ["email", "rol"]}
```

El tooltip del campo también lo aclara: *"Email de contacto del vendedor
(no editable)"*.

### Badge sobre el select de Rol

Nuevo prop genérico `renderBeforeField` en `FormFieldsRenderer` (hermano
de `renderAfterField`, mismo shape `Partial<Record<keyof T, ReactNode>>`),
usado acá para mostrar un `Chip` informativo arriba del select:

```tsx
renderBeforeField={{ rol: <RoleAdminOnlyBadge /> }}
```

`RoleAdminOnlyBadge` (nuevo componente,
`modules/sellers/components/SellerForm/RoleAdminOnlyBadge.tsx`) se
muestra siempre — para admin y para no-admin — porque comunica una regla
del sistema, no un estado de error puntual.

### Delete: el botón desaparece para no-admins

`useSellers.ts` ahora resuelve `isAdmin` y solo pasa `onDeleteRequest` a
`buildColumnsForSellers` si es admin:

```ts
onDeleteRequest: isAdmin ? handleDeleteRequest : undefined,
```

`RowActionsCell` ya soportaba `onDelete` opcional (solo renderiza el botón
si la prop está definida), así que no hizo falta tocar ese componente —
solo dejar de pasarle la función cuando no corresponde. El 403 del backend
(ver más arriba) sigue siendo la protección real; esto es solo para que la
UI no ofrezca una acción que va a fallar.

### Home: card de vendedores con `useData`

Mismo patrón que "Productos" (`useProductsLinkData`): un hook
`useSellersLinkData` (en `hooks/sellers/useSellerListData.ts`, junto a
`useSellersListData`) adaptado al shape `LinkDataResult`, registrado en
`dataHooksByUrl` (`hooks/shared/useLinksData.ts`) bajo la key `/sellers`:

```ts
export const useSellersLinkData = (): LinkDataResult => {
    const { sellers, loading, error } = useSellersListData();
    const onlineCount = 0; // TODO(online-status): mock hasta que exista tracking real

    return {
        value: sellers.length,
        isLoading: loading,
        error,
        subtitle: `${onlineCount} en línea`,
    };
};
```

Resultado en el Home: card "Vendedores" con la cantidad total como
`value` y `"0 en línea"` como subtítulo. El conteo de online/offline
queda mockeado en 0 a propósito — no hay todavía un mecanismo real de
presencia/conexión para vendedores.

### Tests agregados en esta pasada

- `useSellers.test.ts` — `onDeleteRequest` es `undefined` para no-admin,
  una función para admin.
- `useSellerListData.test.ts` — `useSellersLinkData`: `value` = cantidad
  de sellers, `subtitle` = `"0 en línea"`, propaga `isLoading`/`error`.
- `FormFieldsRenderer.test.tsx` — casos nuevos para `renderBeforeField`.

### Verificado manualmente (cuentas descartables, borradas después)

- Email deshabilitado (`input.disabled === true`) tanto para admin como
  para seller. ✅
- Nombre editable y persistente para ambos roles. ✅
- Badge "Solo administradores pueden editar el rol." visible arriba del
  select en ambos casos. ✅
- Select de Rol: `aria-disabled="true"` para seller, abre normalmente
  para admin. ✅
- Botón "Eliminar" ausente en la tabla para una sesión de seller, presente
  para admin. ✅
- Card "Vendedores" en `/home` mostrando cantidad real + `"0 en línea"`. ✅
