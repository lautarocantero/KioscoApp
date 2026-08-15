# 🗄️ `seller`

> Documentación del slice de vendedores (listado, selección, edición y borrado).

## 🎯 ¿Para qué sirve?

Gestiona el estado de la lista de vendedores del panel de administración:
carga, búsqueda, selección de un vendedor para ver/editar, y las
mutaciones (editar, borrar) reflejadas en el store sin necesidad de
refetchear toda la lista.

> ⚠️ Esto **no** es el carrito de venta ni el vendedor logueado — ese
> estado vive en `store/cart/` y `store/auth/` respectivamente. Un
> refactor anterior movió toda la lógica de carrito fuera de este slice
> (ver git log: "movida toda la logica de sellers a cart").

## 📦 Archivos

- `src/store/seller/sellerSlice.ts`
- `src/store/seller/sellerThunks.ts`

## 💡 Contenido

### `sellerSlice.ts`

- Estado inicial (`SellerSliceState`):
  - `sellers: Seller[]`
  - `isLoading: boolean`
  - `selectedSeller: Seller | null`
  - `errorMessage: string | null`
- Reducers:
  - `startLoadingSellers`
  - `setSellers({ sellers })`
  - `resetSellers()`
  - `setSelectedSeller({ seller })`
  - `clearSelectedSeller()`
  - `addSellerToList({ seller })`
  - `updateSellerInList({ seller })` — reemplaza por `_id`, y si es el
    seleccionado también actualiza `selectedSeller`
  - `removeSellerFromList({ _id })` — también limpia `selectedSeller` si
    era el borrado
  - `setSellerError({ errorMessage })`

### `sellerThunks.ts`

- `fetchSellersThunk()` — `GET /seller/get-sellers`, resuelve `role`+`email`
  vía join contra `Auth` en el backend (devuelve `SellerWithRole[]`).
- `fetchSellerByIdThunk(_id)` — `GET /seller/get-seller-by-id`, mismo join
  (`SellerWithRole[]`). Lo usa `useSellerData` para el form de edición.
- `fetchSellerByNameThunk(name)` / `fetchSellerByEmailThunk(email)` —
  búsquedas puntuales, no hacen el join de rol.
- `editSellerThunk(payload)` — valida con `EditSellerSchema` (zod) y pega
  a `PUT /seller/edit-seller`. **Solo** persiste `name` (y opcionalmente
  `profilePhoto`/`user_status`) — el backend ignora cualquier otro campo,
  `rol` incluido (vive en `Auth`, ver
  [docs/features/sellerRoleAndAccountDeletion.md](../features/sellerRoleAndAccountDeletion.md)).
- `selectSellerThunk(seller)` / `clearSelectedSellerThunk()` — setean/
  limpian `selectedSeller` sin pegarle al backend.
- `deleteSellerThunk(_id)` — pega a `authDeleteAccountRequest` (**no** a
  `sellerApi`, a pesar del nombre): borra `Auth` + `Seller` en cascada vía
  `DELETE /auth/delete-auth`. El nombre del thunk no cambió para no romper
  a `useSellers.ts`, que ya lo consumía.

## ✨ Beneficios

- 🗂️ **Un solo lugar para la lista de vendedores** — evita refetch después
  de cada edición/borrado (`updateSellerInList`/`removeSellerFromList`
  actualizan el store in-memory).
- 🔗 **`role`/`email` disponibles en la UI** sin que `Seller` (el tipo que
  espeja el backend real) tenga que cargar con campos que no le
  pertenecen — eso lo resuelve `SellerWithRole`.
- 🧹 **Errores centralizados** en `errorMessage`, consistente entre fetch,
  edit y delete.
