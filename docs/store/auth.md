# 🗄️ `auth`

> Documentación del slice de autenticación y los thunks asociados.
>
> **Actualización (multi-kiosco):** el rol de sesión (`role`) dejó de vivir
> acá — ver [Cambios del multi-kiosco](#cambios-del-multi-kiosco-role-y-mykioscos)
> más abajo y [docs/features/multiKiosco.md](../features/multiKiosco.md).

## 🎯 ¿Para qué sirve?

Gestiona el estado de autenticación del usuario logueado (identidad, no rol):
login, registro, logout, verificación de credenciales y reset de
contraseña.

## 📦 Archivos

- `src/store/auth/authSlice.ts`
- `src/store/auth/authThunks.ts`

## 💡 Contenido

### `authSlice.ts`
- Estado inicial (`AuthSliceState`): `_id`, `name`, `email`, `status`,
  `isLoading`, `isAuthenticated`, `profilePhoto`, `errorMessage`,
  `isVerified`. **No** tiene `role` — ver actualización abajo.
- Reducers:
  - `login(payload)` — setea el estado autenticado a partir de la
    respuesta del backend (login, google, checkAuth).
  - `logout(payload)` — limpia el estado de auth.
  - `checkingCredentials()`
  - `clearAuthError()`
- Exporta `RootState`, `AppDispatch` y el reducer por defecto.

### `authThunks.ts`
- `startLoginWithEmailPassword({ email, password, rememberMe })`
- `startRegister({ sanitizedData })`
- `startGoogleLogin({ accessToken })`
- `startLogout()` — además de limpiar auth, limpia todo el estado de
  kiosco (`resetKioscoState`, `setActiveKioscoId(null)`, borra
  `ACTIVE_KIOSCO_STORAGE_KEY`) para que la próxima cuenta que se loguee en
  ese navegador no herede el kiosco activo de la anterior.
- `startCheckAuth()` — valida sesión al montar la app (ver
  [docs/features/rememberMe.md](../features/rememberMe.md))
- `startRequestPasswordReset({ email })`
- `startResetPassword({ token, newPassword, repeatNewPassword })`
- Usa `authApi` para requests y maneja errores con `handleErrorWithAction`
  (login/register/google) o devolviendo un resultado `{ success,
  errorMessage }` sin tocar el slice (reset password).

## Cambios del multi-kiosco: `role` y `myKioscos`

Antes de multi-kiosco, `role` (`AuthRoleEnum.Admin`/`Seller`) vivía como
campo global en `Auth`/`AuthSliceState`, y `useIsAdmin`
(`hooks/auth/useIsAdmin.ts`) lo leía directo del store. Con multi-kiosco
un mismo usuario puede ser admin en un kiosco y vendedor en otro, así que
**el rol se movió a `KioscoMembership`** (backend) / `KioscoWithStats.role`
(frontend) — ya no es un campo de `Auth`.

Consecuencias:
- `AuthSliceState` ya no tiene `role`. `hooks/auth/useIsAdmin.ts` y
  `startEditAuthRole` (junto con `EditAuthRoleSchema` en
  `authAccountSchema.ts`) se **eliminaron** — reemplazados por
  [`useIsActiveKioscoAdmin`](../hooks/kiosco/useIsActiveKioscoAdmin.md) y
  `updateKioscoMemberRoleThunk` (`store/kiosco/kioscoThunks.ts`).
- `startLoginWithEmailPassword`, `startGoogleLogin` y `startCheckAuth`
  ahora también reciben `myKioscos: KioscoWithStats[]` en la respuesta del
  backend y lo despachan a `setMyKioscos` (`store/kiosco/kioscoSlice.ts`)
  — así la app sabe de entrada si el usuario tiene 0, 1 o varios kioscos,
  sin un segundo roundtrip.
- `DELETE /delete-auth` (borrar la propia cuenta, `authDeleteAccountRequest`
  en `modules/auth/api/authApi.ts`) pasó a ser **estrictamente
  self-service**: ya no acepta un `_id` en el body, el backend siempre
  borra la sesión que hace la request (Auth + Seller + membresías de
  kiosco, en cascada). Antes un admin podía usarlo para borrar la cuenta
  de **otro** vendedor; ese caso de uso ahora se resuelve con
  `removeKioscoMemberRequest` (saca del kiosco, sin borrar la cuenta —
  ver [docs/store/seller.md](seller.md)). Con el `_id` fuera del body,
  `authAccountSchema.ts` (que solo validaba `_id`/`role`) quedó sin
  ningún caso de uso y se eliminó junto con `EditAuthRoleSchema` y
  `DeleteAuthAccountSchema`.

## ✨ Beneficios

- 🔐 **Centraliza la lógica de auth (identidad)**.
- 🧠 **Separa reducers de efectos secundarios**.
- 📌 **Maneja errores de forma consistente**.
- 🏪 **Separa "quién soy" de "en qué kiosco estoy y con qué rol"** — esa
  segunda pregunta ahora vive enteramente en [`store/kiosco`](kiosco.md).
