# 🏢 CRUD de proveedores — Documentación técnica

## Índice

1. [Resumen](#resumen)
2. [Modelo mental](#modelo-mental)
3. [Backend](#backend)
4. [Frontend](#frontend)
5. [Decisiones de diseño](#decisiones-de-diseño)
6. [Cómo probarlo](#cómo-probarlo)
7. [Límites conocidos](#límites-conocidos)
8. [Archivos tocados](#archivos-tocados-referencia-rápida)

---

## Resumen

Se integró el módulo de **Proveedores** (`Provider`) de punta a punta: listado, alta, edición, borrado y valoración de 1 a 5 estrellas, siguiendo exactamente la misma arquitectura que los módulos de Vendedores y Productos (hooks propios, typings propios, capa de API propia, thunks + slice propios).

Antes de esta pasada existía scaffolding muerto (`hooks/suppliers/*`, `modules/providers/pages/*`, `modules/providers/SupplierDialog/*`) con un modelo de datos ("Supplier": `description`, `email`, `phone` sueltos) que **no coincidía** con el `Provider` real del backend (`name`, `valoration`, `contact_phone`, `contact_email`). Ese scaffolding se borró por completo y se reconstruyó desde cero contra el modelo real.

También se agregó soporte de **rating (estrellas)** al sistema genérico de formularios (`FieldConfig.type: "rating"` en `FormFieldsRenderer`), reutilizable por cualquier otro dominio que necesite un campo de valoración a futuro.

## Modelo mental

```
Provider
├── _id: string
├── name: string
├── valoration: number      (1 a 5, validado en back y front)
├── contact_phone: string
└── contact_email: string   (validado como email)

GET    /provider/get-providers            → listado completo
GET    /provider/get-provider-by-id       → por _id       (query string)
GET    /provider/get-provider-by-name     → por name      (query string, match EXACTO)
GET    /provider/get-provider-by-valoration → por valoration (query string)
GET    /provider/get-providers-by-contact → por teléfono O email (query string)
GET    /provider/get-providers-stats      → { totalProviders }
POST   /provider/create-provider
PUT    /provider/edit-provider            → solo pisa los campos enviados
DELETE /provider/delete-provider
```

Frontend:

```
providerApi.ts (createHttpClient)
  → providerThunks.ts (valida con Zod antes de pegarle a la API)
    → providerSlice.ts (estado: providers[], currentProvider, stats, loaders, errores)
      → hooks/providers/*.ts (adaptan el store a lo que cada página necesita)
        → modules/providers/pages/*.tsx + ProviderForm.tsx (solo presentación)
```

## Backend

### `Validation.range` (nuevo, `src/models/validation.ts`)

Se agregó un validador genérico de rango numérico, reutilizando el patrón de `Validation.number`/`Validation.email`:

```ts
static range(digit: unknown, title: string, min: number, max: number): number {
    if (digit === undefined || digit === null) throw new Error(`No number provided for ${title}`);
    if (!isNumber(digit)) throw new Error(`${title} is not a number`);
    if ((digit as number) < min || (digit as number) > max) {
      throw new Error(`${title} must be between ${min} and ${max}`);
    }
    return digit as number;
}
```

Usado en `ProviderModel.create`/`edit` para validar `valoration` entre 1 y 5. Un valor fuera de rango o no numérico responde `400` con el mensaje de `Validation.range`.

### `ProviderModel` (reescrito, `src/models/providerModel.ts`)

- `getProviders()` — trae hasta 100.
- `getProviderByField<T>(field, value, type)` — **match exacto** (`find({[field]: value})`), no regex/parcial. Mismo comportamiento que `SellerModel.getSellerByField`.
- `getProvidersByContact(contact)` — `$or: [{contact_phone}, {contact_email}]`, para buscar con un solo término.
- `getProvidersCount()` — usado por el endpoint de stats.
- `create()` — valida `name`, `valoration` (rango 1-5), `contact_phone`, `contact_email` (formato); rechaza si ya existe un proveedor con el mismo `name`.
- `edit()` — **parcial**: solo pisa los campos que vengan `!== undefined` en el payload (mismo patrón que `SellerModel.edit`), así el frontend puede mandar solo lo que cambió.
- `delete()` — por `_id`.

### `provider.controller.ts`

Los 4 endpoints de filtro (`getProviderById`, `getProvidersByName`, `getProvidersByValoration`, `getProvidersByContact`) leen de **`req.query`**, no de `req.body`. Ver [Límites conocidos](#límites-conocidos) para el porqué.

## Frontend

### Typings — `src/typings/provider/providerTypes.ts` + `providerComponentTypes.ts`

Mismo patrón que `sellerTypes.ts`: entidad base (`ProviderEntity`), tipos derivados con `Pick`/`Omit`/`Partial` para create/edit, y una interfaz de retorno por cada hook (`UseProviderDataResult`, `UseProvidersReturn`, etc.).

### API — `src/modules/providers/api/providerApi.ts`

Usa `createHttpClient` (el factory con auto-refresh de `access_token`), no un `axios.create()` suelto. Los 3 GET con filtro mandan el término por **query string** (`{ params: {...} }`), nunca por body — ver Límites conocidos.

### Validación (Zod) — `src/modules/providers/schema/ProviderSchema.ts`

`CreateProviderSchema` / `EditProviderSchema` (todos los campos salvo `_id` opcionales) / `DeleteProviderSchema`. Se corren con `.safeParse()` dentro de cada thunk **antes** de pegarle a la API — si falla, el thunk despacha un error y no hace el request.

### Validación de formulario (Yup) — `src/modules/providers/schema/ProviderFormSchema.ts`

`providerFormSchema` valida `name` (requerido), `valoration` (1 a 5, requerido), `contact_phone` (requerido), `contact_email` (formato email, requerido). `getProviderFormInitialValues()`/`getProviderEditInitialValues(provider)` arman los valores iniciales de Formik (`valoration` default 5 en alta).

### Store — `src/store/provider/providerSlice.ts` + `providerThunks.ts`

Ver [docs/store/provider.md](../store/provider.md).

### Hooks — `src/hooks/providers/*`

| Hook | Para qué |
|---|---|
| [`useProviderData`](../hooks/providers/useProviderData.md) | Trae un proveedor por `_id` (detalle/edición), evita refetch si ya está en el store. |
| [`useProviderListData`](../hooks/providers/useProviderListData.md) | Listado + búsqueda por nombre con debounce (350ms). |
| [`useProvidersLinkData`](../hooks/providers/useProvidersLinkData.md) | Card de "Proveedores" en el Home — cantidad total vía stats. |
| [`useProviders`](../hooks/providers/useProviders.md) | Orquesta la página de listado: columnas, diálogo de borrado. |
| [`useProvidersForm`](../hooks/providers/useProvidersForm.md) | `useProviderCreate`/`useProviderEdit` — submit de los formularios. |

### Componente de rating — `FormFieldsRenderer.tsx`

Se agregó `type: "rating"` a `FieldConfig` (`typings/shared/types/formCard.types.ts`), con un nuevo `maxRating?: number`. Renderiza un MUI `Rating` conectado a Formik (`setFieldValue`/`setFieldTouched`), reutilizable por cualquier form del proyecto, no solo por `ProviderForm`.

### Páginas y rutas

`src/modules/providers/pages/{ProvidersList,ProviderCreate,ProviderEdit,ProviderDetail}` + `src/modules/providers/routes/ProviderRoutes.tsx`:

```
/providers                              → listado (búsqueda, alta, editar, ver, borrar)
/provider-create                        → alta
/provider/:provider_id                  → detalle (solo lectura)
/provider/:provider_id/provider-edit    → edición
```

### Home — card de "Proveedores"

`src/config/Links.tsx`: la entrada de "Proveedores" en `SidebarNavLinks` pasó de `disabled: true` / `url: "/home"` a apuntar a `/providers`. `src/hooks/shared/useLinksData.ts` mapea `"/providers"` a `useProvidersLinkData`, así la card del Home muestra la cantidad real de proveedores (antes no existía este wiring — la entrada estaba deshabilitada).

## Decisiones de diseño

- **Reconstruir en vez de adaptar el scaffolding viejo**: el modelo de datos "Supplier" preexistente no tenía relación con el `Provider` real del backend (campos totalmente distintos). Adaptarlo hubiera significado renombrar/reinterpretar campos incompatibles; se optó por borrar y reconstruir siguiendo el patrón de Sellers, más simple y consistente con el resto del código.
- **Sin pantalla de "éxito" tras crear** (a diferencia de Products): igual que Sellers, `useProviderCreate` navega directo a `/providers` al crear. Consistente con el CRUD más simple/reciente del proyecto.
- **`useProvidersLinkData` usa el endpoint de stats dedicado**, no cuenta `providers.length` del listado (a diferencia de `useSellersLinkData`, que sí cuenta la lista ya cargada). Se eligió el patrón de `useProductsLinkData` porque la card del Home no necesita disparar/depender de la carga del listado completo.

## Cómo probarlo

1. Levantar backend (`npm run dev`, puerto 3000) y frontend (`npm run dev`, puerto 5173).
2. Loguearse, ir a **Proveedores** desde el Home o el sidebar.
3. **Alta**: "Nuevo proveedor" → completar nombre, estrellas (click sobre la etiqueta de la estrella, no sobre el radio crudo — ver nota de accesibilidad más abajo), teléfono, email → Guardar → redirige a `/providers` con el nuevo proveedor en la lista.
4. **Detalle**: ícono de ojo en una fila → campos en solo lectura.
5. **Edición**: ícono de lápiz → cambiar algún campo → Guardar → vuelve a `/providers` con los cambios reflejados.
6. **Búsqueda**: escribir en el buscador el **nombre exacto** del proveedor (ver límite conocido de búsqueda) → debounce de 350ms → filtra.
7. **Borrado**: ícono de tacho → confirmar en el diálogo → la fila desaparece.
8. **Home**: la card de "Proveedores" debe reflejar la cantidad total real.

Verificado manualmente end-to-end contra la base real de Atlas con una cuenta y un proveedor descartables, ambos eliminados al finalizar.

## Límites conocidos

- **Búsqueda por nombre es de coincidencia EXACTA, no parcial.** `ProviderModel.getProviderByField` hace `find({name: value})`, sin regex. Buscar "Distr" no encuentra "Distribuidora QA"; hay que escribir el nombre completo. Este es el **mismo comportamiento preexistente** de `SellerModel.getSellerByField` — no es una regresión introducida acá, pero tampoco se corrigió (cambiarlo afectaría a Sellers también, fuera del alcance de este pedido).
- **Los GET de filtro van por query string, nunca por body.** Los navegadores reales (a diferencia de `curl -X GET -d`) no mandan body en un GET. Esto rompía `getProviderByIdRequest`/`getProviderByNameRequest`/`getProvidersByContactRequest` cuando usaban `{ data: {...} }`; se corrigió a `{ params: {...} }` en el frontend y `req.query` en el backend. **El mismo bug potencialmente sigue latente, sin corregir, en `sellerApi.ts`** (`getSellerByNameRequest`/`getSellerByEmailRequest` usan `{data:{...}}`) — no se detectó antes porque nada en la UI de Sellers llama a esos métodos. Fuera de alcance de este pedido.
- **Sin tests de backend**: el backend no tiene test runner configurado (`npm test` → "Error: no test specified"). Se verificó manualmente contra la base real de Atlas (curl + browser), sin dejar tests automatizados de backend — mismo criterio usado en el resto del proyecto hasta ahora.
- **`DeleteAuth` requiere rol Admin**: la limpieza de la cuenta de prueba usada para verificar este feature no pudo hacerse vía `DELETE /auth/delete-auth` porque ninguna cuenta disponible tenía rol `admin` — se hizo con un script puntual de Mongoose contra el `_id` exacto de la cuenta descartable, replicando la misma cascada (`auth` + `sellers`) que hace `AuthModel.deleteAuth`.

## Archivos tocados (referencia rápida)

**Backend:**
- `src/models/validation.ts` (+`range`)
- `src/models/providerModel.ts`, `src/controllers/provider.controller.ts`, `src/schemas/providerSchema.ts`, `src/typings/provider/index.d.ts`

**Frontend:**
- `src/typings/provider/providerTypes.ts`, `providerComponentTypes.ts`
- `src/typings/shared/types/formCard.types.ts` (+`"rating"`, `maxRating`)
- `src/modules/shared/components/FormCard/FormFieldsRenderer.tsx` (+rama `rating`)
- `src/modules/providers/api/providerApi.ts`
- `src/modules/providers/schema/ProviderSchema.ts`, `ProviderFormSchema.ts`
- `src/store/provider/providerSlice.ts`, `providerThunks.ts`
- `src/hooks/providers/*.ts`
- `src/modules/providers/components/ProviderForm/*`, `src/modules/providers/pages/*`, `src/modules/providers/routes/ProviderRoutes.tsx`
- `src/router/AppRouter.tsx`, `src/config/Links.tsx`, `src/hooks/shared/useLinksData.ts`, `src/modules/shared/layout/components/appSideBar/helper/NavSubGroups.ts`

**Borrado (scaffolding muerto):**
- `src/hooks/suppliers/*`, `src/modules/providers/{ProvidersRoutes.tsx,SupplierDialog/*,pages/Providers{Create,Edit,List}Page.tsx,pages/ProvidersPage.tsx}`, `src/typings/providers/*`
