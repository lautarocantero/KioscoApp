# 🏪 Multi-kiosco (multi-tenant) — Documentación técnica

## Índice

1. [Resumen](#resumen)
2. [Modelo mental](#modelo-mental)
3. [Flujos completos](#flujos-completos)
4. [Backend](#backend)
5. [Frontend](#frontend)
6. [Decisiones de diseño](#decisiones-de-diseño)
7. [Pendientes / fuera de alcance](#pendientes--fuera-de-alcance)
8. [Archivos tocados (referencia rápida)](#archivos-tocados-referencia-rápida)

---

## Resumen

Antes de este feature, la app asumía **un solo kiosco implícito**: todo
(productos, presentaciones, proveedores, ventas, vendedores) era un único
espacio global, y el rol (`admin`/`seller`) era un campo fijo en `Auth`.

Con multi-kiosco:

- Un usuario puede **crear** un kiosco (queda como su admin) o **unirse**
  a uno existente vía código de invitación (entra como vendedor).
- Un usuario puede pertenecer a **múltiples kioscos**, con un rol
  distinto en cada uno.
- **Todos** los datos de negocio — productos, presentaciones, proveedores,
  ventas, vendedores — quedan aislados por kiosco. Nada se comparte entre
  kioscos distintos.
- Después de loguearse, el usuario ve una pantalla de selección
  (`/select-kiosco`) con una card por cada kiosco al que pertenece, más
  las opciones "Crear un nuevo kiosco" / "Unirme a kiosco existente".

## Modelo mental

```
Auth (identidad global)          Kiosco (tienda)
  _id                              _id
  email                            name, address, currency
  password                         owner_id
  ...                              invite_code

                    KioscoMembership (join, 1 fila por par usuario↔kiosco)
                      _id
                      kiosco_id  →  Kiosco
                      user_id    →  Auth/Seller
                      role         (admin | seller — YA NO vive en Auth)
                      joined_at
                      last_accessed_at

Product / Presentation / Provider / Sell / Notification
  ... campos existentes
  kiosco_id  →  Kiosco   (nuevo, requerido, indexado)
```

**El rol dejó de ser un campo global.** Antes `Auth.role` decía si alguien
era admin o vendedor en toda la app. Ahora esa pregunta no tiene sentido
sin contexto — un usuario puede ser admin en "Kiosco A" y vendedor en
"Kiosco B" al mismo tiempo. El rol vive en `KioscoMembership.role`, uno
por cada par `(kiosco, usuario)`.

**El scoping es por header, no por URL.** En vez de cambiar la forma de
cada ruta existente (`/product/:kiosco_id/get-products`, etc.), el
frontend manda el kiosco activo en un header (`x-kiosco-id`) en cada
request, y un middleware lo resuelve contra la sesión. Esto significa que
**ningún** endpoint de producto/presentación/proveedor/venta/vendedor
cambió su firma — solo se les agregó el middleware.

## Flujos completos

### Crear un kiosco

```
CreateKioscoPage → CreateKioscoForm (Formik) → useCreateKiosco.handleSubmit
  1. POST /kiosco/create { name, address }
       → crea Kiosco (invite_code generado) + KioscoMembership(role: admin)
  2. GET /kiosco/my-kioscos        (fetchMyKioscosThunk, refresca la lista)
  3. POST /kiosco/:id/select       (selectKioscoThunk, marca activo)
  4. navigate("/shop")
```

### Unirse a un kiosco (ya logueado)

```
JoinKioscoPage → JoinKioscoForm (Formik) → useJoinKiosco.handleSubmit
  1. POST /kiosco/join { invite_code }
       → crea KioscoMembership(role: seller) — 404 código inválido, 409 ya es miembro
  2-4. igual que crear (refresca lista, marca activo, navega a /shop)
```

### Unirse vía link de invitación, deslogueado

Este es el flujo que conecta "Agregar vendedor" (admin comparte un link)
con un usuario que todavía no tiene cuenta:

```
Admin en /sellers → "Agregar vendedor" → InviteSellerModal
  → useKioscoInvite pide GET /kiosco/:id/invite-info (solo admin)
  → muestra invite_code + invite_link ({FRONTEND_URL}/join-kiosco?code=...)
  → admin copia y comparte el link por fuera de la app

Invitado (sin sesión) abre el link → /join-kiosco?code=XXXX
  → useJoinKioscoAccess: status === NotAuthenticated
      1. guarda "XXXX" en localStorage (PENDING_INVITE_CODE_STORAGE_KEY)
      2. navigate("/register")
  → se registra o loguea normalmente
  → useHandlePendingInviteCode (montado global en AppRouter):
      status pasa a Authenticated
      1. lee el código guardado, lo borra de localStorage
      2. dispatch(joinKioscoThunk({ invite_code: "XXXX" }))
      3. dispatch(fetchMyKioscosThunk())
  → usuario termina en /select-kiosco con el nuevo kiosco ya en la lista
```

### Seleccionar / cambiar de kiosco activo

```
/select-kiosco → KioscoCard → onEnter → useKioscoSelector.handleEnterKiosco
  1. dispatch(selectKioscoThunk(kiosco._id))
       → setActiveKioscoId (state + localStorage, optimista)
       → POST /kiosco/:id/select (bumpea last_accessed_at en el back)
  2. navigate("/shop")
```

`/shop` muestra el nombre del kiosco activo en el título
(`ShopHeader`, vía `useActiveKiosco`) y un botón "Cambiar de Tienda" que
navega de vuelta a `/select-kiosco`.

### Sacar a un vendedor del kiosco (no borra su cuenta)

```
/sellers → Eliminar → useSellers.handleDeleteConfirm
  → dispatch(deleteSellerThunk(activeKiosco._id, sellerId))
       → DELETE /kiosco/:kioscoId/member/:userId (solo admin, 403 si no)
       → removeSellerFromList (store, sin refetch)
```

La cuenta (`Auth`) del vendedor **no se toca** — puede seguir
perteneciendo a otros kioscos. Esto es un cambio de comportamiento
respecto a antes de multi-kiosco, donde "eliminar vendedor" borraba la
cuenta entera en cascada (ver nota de actualización en
[docs/features/sellerRoleAndAccountDeletion.md](sellerRoleAndAccountDeletion.md)).

## Backend

> Repo `KioscoAppBackEnd`. Resumen de alto nivel — el detalle línea por
> línea vive en `src/docs/` de ese repo (Routes.md, Models.md,
> Controllers.md, Schemas.md).

- **Schemas nuevos**: `kioscoSchema.ts` (`kioscos`), `kioscoMembershipSchema.ts`
  (`kiosco_memberships`, índice único compuesto `(kiosco_id, user_id)`).
- **`kioscoMiddleware.ts`**:
  - `requireKioscoContext` — corre después de `authMiddleware`, lee
    `x-kiosco-id`, busca la membership de `(req.user.id, kiosco_id)`, 403
    si no existe, adjunta `req.kioscoId`/`req.kioscoRole`.
  - `requireKioscoRole(roles)` — mismo patrón que el `requireRole`
    existente, pero contra `req.kioscoRole` en vez de un rol global.
- **`kiosco.routes.ts`**: `POST /create`, `GET /my-kioscos`, `POST /join`,
  `GET /:id/invite-info` (admin), `PUT /:id` (admin, editar
  nombre/dirección/moneda), `POST /:id/select` (bumpea `last_accessed_at`),
  `DELETE /:id/member/:userId` (admin), `PUT /:id/member/:userId/role`
  (admin).
- **Retrofit**: `product`, `presentation`, `provider`, `sell`, `seller`,
  `receipts` — todas sus rutas ganaron `authMiddleware` +
  `requireKioscoContext` (antes tenían **cero** middleware de auth). Cada
  modelo (`ProductModel.getProducts`, etc.) ahora filtra por `kiosco_id` en
  las lecturas y lo estampa en las creaciones, leyendo `req.kioscoId`.
- **`GET /seller/get-sellers`**: cambió de "todos los vendedores" a
  "miembros del kiosco activo" — join `KioscoMembership` (filtrado por
  `kiosco_id`) → `Seller` (perfil) → `Auth` (email), con `role` resuelto
  desde la membership.
- **Auth**: `role` se eliminó de `authSchema.ts`. El JWT sigue siendo
  `{ id, email }` — el rol nunca viaja en el token, se resuelve por
  request contra `KioscoMembership`, así que cambiar de kiosco o de rol
  nunca necesita refrescar el token. `login`/`check-auth`/`refresh`
  devuelven `myKioscos: [{ _id, name, address, role }]` para que el
  frontend bootstree sin un segundo roundtrip.
- **Migración**: `src/scripts/migrateToKiosco.ts` — script manual
  (`npm run migrate:kiosco`), idempotente (no-op si ya existe algún
  `Kiosco`). Crea un kiosco default con el primer `Auth` admin encontrado
  como dueño, backfillea `kiosco_id` en todo lo existente, y crea una
  `KioscoMembership` por cada `Auth` con su rol global anterior. No corre
  automáticamente al bootear — se ejecuta manualmente contra la base real.

## Frontend

> Repo `KioscoApp`. Módulo nuevo: `src/modules/kiosco/`.

### Módulo `kiosco`

- `api/kioscoApi.ts` — todos los requests contra `/kiosco/*`.
- `pages/{KioscoSelectorPage,CreateKioscoPage,JoinKioscoPage}.tsx` —
  pantallas standalone (sin `AppShell`/sidebar), como el resto del
  onboarding.
- `components/{KioscoCard,KioscoCardSkeleton,KioscoSelectorActionRow}` —
  ver [docs/components/KioscoCard.md](../components/KioscoCard.md) y
  [docs/components/KioscoSelectorActionRow.md](../components/KioscoSelectorActionRow.md).
- `components/{CreateKioscoForm,JoinKioscoForm}` — reusan el patrón
  `FormCard` + `FormFieldsRenderer` + `FieldRegistry` + Formik que ya usan
  los forms de Proveedor/Vendedor (regla del proyecto: mismos inputs y
  botones en todos los formularios).
- `routes/KioscoRoutes.tsx` — ver
  [docs/components/KioscoRoutes.md](../components/KioscoRoutes.md).
- `schema/{KioscoFormSchema,JoinKioscoFormSchema,KioscoMemberSchema}.ts` —
  ver sus docs en `docs/schema/`.
- `helpers/{getKioscoAccentColor,formatLastAccessedAt}.ts`.
- Tipos: `src/typings/kiosco/{kioscoTypes.ts,kioscoComponentTypes.ts}`.

### Estado — `store/kiosco/`

Ver [docs/store/kiosco.md](../store/kiosco.md) para el detalle de slice y
thunks.

### Hooks — `hooks/kiosco/`

| Hook | Para qué |
|---|---|
| [`useActiveKiosco`](../hooks/kiosco/useActiveKiosco.md) | resuelve kiosco activo + si soy admin ahí |
| [`useIsActiveKioscoAdmin`](../hooks/kiosco/useIsActiveKioscoAdmin.md) | solo el booleano, reemplaza al viejo `useIsAdmin` |
| [`useKioscoSelector`](../hooks/kiosco/useKioscoSelector.md) | orquesta `/select-kiosco` |
| [`useCreateKiosco`](../hooks/kiosco/useCreateKiosco.md) | submit de `/create-kiosco` |
| [`useJoinKiosco`](../hooks/kiosco/useJoinKiosco.md) | submit de `/join-kiosco` (logueado) |
| [`useJoinKioscoAccess`](../hooks/kiosco/useJoinKioscoAccess.md) | `/join-kiosco` deslogueado → guarda código y manda a registro |
| [`useHandlePendingInviteCode`](../hooks/kiosco/useHandlePendingInviteCode.md) | retoma el join guardado, apenas hay sesión |
| [`useKioscoInvite`](../hooks/kiosco/useKioscoInvite.md) | data del modal "Agregar vendedor" |
| [`useKioscoHttpBridge`](../hooks/kiosco/useKioscoHttpBridge.md) | inyecta `x-kiosco-id` en cada request |

### Scoping por header — `httpClient.ts`

`createHttpClient` adjunta `x-kiosco-id: <activeKioscoId>` a cada request
vía un interceptor, leyendo el valor **en el momento de la request** (no
cacheado). Esto es lo que permite que ningún módulo existente
(`productApi`, `presentationApi`, `providerApi`, `sellApi`, `sellerApi`,
`receiptApi`) haya tenido que cambiar su firma — el scoping es
transparente. Ver [useKioscoHttpBridge](../hooks/kiosco/useKioscoHttpBridge.md).

### Routing — `AppRouter.tsx`

```
status !== Authenticated       → AuthRoutes (login/register)
status === Authenticated:
  /join-kiosco                 → siempre montada (dentro y fuera del gate)
  KioscoRoutes()                → /select-kiosco, /create-kiosco
  hasActiveKiosco (myKioscos incluye activeKioscoId):
    true  → <AppShell> con TODAS las rutas de negocio existentes
    false → cualquier otra ruta redirige a /select-kiosco
```

`hasActiveKiosco` es el gate central: sin un kiosco activo válido, no hay
forma de llegar a `/shop`, `/products`, `/sellers`, etc. — ni siquiera
tipeando la URL directamente.

### `/shop`

`ShopHeader.tsx` (presentacional) recibe `kioscoName` y `onChangeKiosco`
ya resueltos — el nombre sale de `useActiveKiosco().activeKiosco.name` y
el botón "Cambiar de Tienda" navega a `/select-kiosco`.

### `/sellers` — "Agregar vendedor"

Header action admin-only (`isAdmin` de `useSellers`, que a su vez sale de
`useActiveKiosco`) que abre
[`InviteSellerModal`](../components/InviteSellerModal.md), mostrando el
código/link de invitación del kiosco activo para compartir manualmente
(no se envía ningún email — Resend deshabilitado hasta plan pago).

### Sidebar

`useSidebarUserData.ts` ahora resuelve `role` desde
`useActiveKiosco().activeKiosco?.role` (con fallback a
`AuthRoleEnum.Seller` si todavía no hay kiosco activo resuelto) en vez de
leer un rol global de `Auth`.

## Decisiones de diseño

### ¿Por qué header (`x-kiosco-id`) y no un segmento de URL (`/kiosco/:id/...`)?

Cambiar cada ruta existente a `/kiosco/:id/product/get-products` hubiera
significado tocar la firma de **todos** los endpoints de negocio y todos
los call sites del frontend que los consumen. Con un header + middleware,
el kiosco activo se resuelve una sola vez por request, de forma
transparente, y ningún módulo preexistente (productos, presentaciones,
proveedores, ventas, vendedores) tuvo que cambiar su API pública.

### ¿Por qué el rol no vive en el JWT?

Si el rol viajara en el token, cambiar de kiosco activo (con un rol
distinto en cada uno) o que un admin te promueva en un kiosco requeriría
invalidar/refrescar el token para que el cambio se reflejara. Resolviendo
el rol por request contra `KioscoMembership`, ambos casos funcionan sin
tocar la sesión.

### ¿Por qué "sacar del kiosco" no borra la cuenta?

Antes de multi-kiosco, "eliminar vendedor" borraba `Auth`+`Seller` en
cascada porque solo existía un espacio de trabajo — no tenía sentido que
alguien "sin kiosco" siguiera teniendo cuenta. Con multi-kiosco, un
vendedor puede pertenecer a varios kioscos: sacarlo de uno no debe
afectar su membership en los demás. El endpoint de borrado de cuenta
sigue existiendo, pero pasó a ser **estrictamente self-service** (sin
`_id` en el body — siempre borra la sesión que hace la request).

### ¿Por qué `/join-kiosco` está montada dos veces (dentro y fuera del gate de auth)?

Es la única pantalla del feature que necesita ser alcanzable en **ambos**
estados de sesión: un link de invitación puede llegar a alguien sin
cuenta (guardar código + mandar a registro) o a alguien ya logueado
(unir directo). Separarla de `KioscoRoutes.tsx` (que sí requiere sesión)
evita que la lógica de "¿tengo sesión o no?" tenga que vivir en el router
en vez de en `useJoinKioscoAccess`.

## Pendientes / fuera de alcance

- [ ] 🟡 **Moneda por kiosco** — el tipo `EditKioscoBody`/`Kiosco` ya
      tiene el campo `currency`, pero el frontend (`useCurrencyOption.ts`,
      `getConfiguredCurrency.ts`) todavía lee la moneda de un
      `localStorage` global, no de `activeKiosco.currency`. Migrar ese
      hook para que la moneda sea per-kiosco (como el resto de los datos)
      queda pendiente de una pasada futura.
- [ ] 🟢 **Edición de nombre/dirección de un kiosco** — el backend expone
      `PUT /kiosco/:id` (admin) y el frontend tiene `editKioscoRequest` en
      `kioscoApi.ts`, pero no hay todavía ninguna pantalla/flujo de UI que
      lo dispare (ni un botón "Editar kiosco" en `/select-kiosco` ni en
      `/shop`).
- [ ] 🟢 **Regenerar código de invitación** — si un código se filtra, hoy
      no hay forma de invalidarlo y generar uno nuevo sin tocar la base a
      mano.

## Archivos tocados (referencia rápida)

**Backend** (`KioscoAppBackEnd`)
- `schemas/kioscoSchema.ts`, `schemas/kioscoMembershipSchema.ts`
- `models/kioscoModel.ts`
- `middlewares/kioscoMiddleware.ts`
- `routes/kiosco.routes.ts`, `controllers/kiosco.controller.ts`
- `typings/kiosco/index.d.ts`, `typings/kioscoMembership/index.d.ts`
- `schemas/{product,presentation,provider,sell,notification}Schema.ts` (+`kiosco_id`)
- modelos/controladores/rutas de esos mismos módulos + `seller`
- `services/catalogService.ts`, `services/presentationAnalysticsService.ts`,
  `services/receipts/receiptImportService.ts`
- `typings/auth/index.d.ts`, `schemas/authSchema.ts`, `models/authModel.ts`,
  `middlewares/authMiddleware.ts`, `controllers/auth.controller.ts`,
  `routes/auth.routes.ts`
- `scripts/migrateToKiosco.ts`

**Frontend** (`KioscoApp`)
- `src/typings/kiosco/{kioscoTypes.ts,kioscoComponentTypes.ts}`
- `src/modules/kiosco/**` (api, store consumers, pages, components, routes, schema, helpers)
- `src/store/kiosco/{kioscoSlice.ts,kioscoThunks.ts}`
- `src/hooks/kiosco/**`
- `src/modules/sellers/components/InviteSellerModal/InviteSellerModal.tsx`
- `src/modules/shop/components/ShopHeader.tsx`, `src/modules/shop/pages/Shop/ShopPage.tsx`
- `src/router/AppRouter.tsx`
- `src/store/auth/{authSlice.ts,authThunks.ts}`, `src/typings/auth/authTypes.d.ts`
- `src/hooks/sellers/{useSellers.ts,useSellersForm.ts,useSellerFormPermissions.ts}`
- `src/store/seller/sellerThunks.ts`
- `src/modules/sellers/api/sellerApi.ts`
- `src/modules/shared/layout/components/appSideBar/hooks/useSidebarUserData.ts`
- `src/i18n/locales/{es.ts,en.ts}`

**Eliminados** (reemplazados por su equivalente per-kiosco)
- `src/hooks/auth/useIsAdmin.ts` → [`useIsActiveKioscoAdmin`](../hooks/kiosco/useIsActiveKioscoAdmin.md)
- `src/modules/auth/schema/authAccountSchema.ts` (`EditAuthRoleSchema`,
  `DeleteAuthAccountSchema`) → rol por [`KioscoMemberSchema`](../schema/KioscoMemberSchema.md),
  borrado de cuenta pasó a self-service sin body
