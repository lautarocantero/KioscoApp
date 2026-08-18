# 🗄️ `kiosco`

> Documentación del slice de kioscos (multi-tenant) y los thunks asociados.

## 🎯 ¿Para qué sirve?

Gestiona la lista de kioscos a los que pertenece el usuario logueado (`myKioscos`) y cuál está activo ahora mismo (`activeKioscoId`) — la base de todo el scoping multi-tenant de la app. Ver [docs/features/multiKiosco.md](../features/multiKiosco.md) para el feature completo.

## 📦 Archivos

- `src/store/kiosco/kioscoSlice.ts`
- `src/store/kiosco/kioscoThunks.ts`

## 💡 Contenido

### `kioscoSlice.ts`

- Estado inicial (`KioscoSliceState`): `myKioscos: KioscoWithStats[]`, `activeKioscoId: string | null`, `loading`, `errorMessage`.
- `activeKioscoId` se hidrata **sincrónicamente** desde `localStorage` (`ACTIVE_KIOSCO_STORAGE_KEY`) al definir `initialState` — mismo patrón que `CURRENCY_STORAGE_KEY`/`FONT_SIZE_STORAGE_KEY`. Así una recarga de página no vuelve a mostrar `/select-kiosco` si ya había un kiosco activo.
- Reducers:
  - `startLoadingKioscos()`
  - `setMyKioscos({ kioscos })`
  - `setKioscoError({ errorMessage })`
  - `clearKioscoError()`
  - `setActiveKioscoId({ kioscoId })`
  - `resetKioscoState()` — vuelve al `initialState` completo (incluye releer `localStorage`, que en ese punto ya se limpió — ver `startLogout`).

### `kioscoThunks.ts`

- `fetchMyKioscosThunk()` — `GET /kiosco/my-kioscos`, guarda el resultado en `setMyKioscos`.
- `createKioscoThunk(payload)` — `POST /kiosco/create`. No toca el slice directamente (`useCreateKiosco` encadena `fetchMyKioscosThunk` + `selectKioscoThunk` después).
- `joinKioscoThunk(payload)` — `POST /kiosco/join`. Mismo patrón: no toca el slice, el hook que lo llama encadena el refresh.
- `selectKioscoThunk(kioscoId)` — marca el kiosco como activo **optimista** (`setActiveKioscoId` + `localStorage.setItem` antes de esperar la respuesta) y notifica al backend (`POST /kiosco/:id/select`, que bumpea `last_accessed_at` de la membership). Si el backend falla, no revierte el estado local — el error solo se loguea (`handleError`), porque el usuario ya está navegando a `/shop` y no tiene sentido bloquearlo por un fallo de analytics de "último acceso".
- `clearActiveKioscoThunk()` — limpia `activeKioscoId` (state + localStorage) sin pegarle al backend.
- `updateKioscoMemberRoleThunk(kioscoId, userId, role)` — valida con `UpdateKioscoMemberRoleSchema` (zod) y pega a `PUT /kiosco/:id/member/:userId/role`. Reemplaza al viejo `startEditAuthRole` (rol ya no es global sobre `Auth`, ver [docs/store/auth.md](auth.md)).

> **Nota:** sacar a un vendedor del kiosco **no** tiene thunk acá — vive en `deleteSellerThunk` (`store/seller/sellerThunks.ts`), porque ese flujo también necesita actualizar `sellerSlice` (`removeSellerFromList`) además de cualquier estado de kiosco. Ver [docs/store/seller.md](seller.md).

## 🔌 Integración con `authThunks.ts`

`startLoginWithEmailPassword`, `startGoogleLogin` y `startCheckAuth` despachan `setMyKioscos({ kioscos })` con la lista `myKioscos` que el backend ya adjunta en su respuesta — así la app no necesita un segundo roundtrip a `/kiosco/my-kioscos` solo para saber si mostrar `/select-kiosco` o entrar directo. `startLogout` despacha `resetKioscoState()` + `setActiveKioscoId({ kioscoId: null })` + limpia `localStorage`, para que la próxima cuenta que se loguee en ese navegador no herede el kiosco activo de la anterior.

## 🌉 Scoping por header — `useKioscoHttpBridge`

El `activeKioscoId` de este slice es lo que [`initKioscoHttpBridge`](../hooks/kiosco/useKioscoHttpBridge.md) lee para adjuntar `x-kiosco-id` a cada request — así ningún módulo (productos, presentaciones, proveedores, ventas, vendedores) tuvo que cambiar su API para quedar scoped por kiosco.

## ✨ Beneficios

- 🔐 **Un solo lugar para "en qué kiosco estoy"** — el resto de la app ni sabe que existe multi-tenancy, solo consume `useActiveKiosco()`.
- ⚡ **Hidratación sincrónica**: evita el parpadeo de `/select-kiosco` en cada recarga de página para un usuario que ya eligió su kiosco.
- 🧹 **Logout limpio**: ningún residuo de "kiosco activo" cruza entre cuentas distintas en el mismo navegador.

## Tests

No hay tests dedicados de slice/thunks — no existe ese patrón en ningún otro dominio del repo (`product`, `provider`, `seller`, etc. tampoco los tienen). La cobertura es indirecta, vía los hooks que los consumen: `src/hooks/kiosco/test/*.test.ts`.
