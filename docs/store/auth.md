# 🗄️ `auth`

> Documentación del slice de autenticación y los thunks asociados.

## 🎯 ¿Para qué sirve?

Gestiona el estado de autenticación del usuario logueado (identidad + rol
de sesión): login, registro, logout, verificación de credenciales, reset
de contraseña y edición administrativa de rol.

## 📦 Archivos

- `src/store/auth/authSlice.ts`
- `src/store/auth/authThunks.ts`

## 💡 Contenido

### `authSlice.ts`
- Estado inicial (`AuthSliceState`): `_id`, `name`, `email`, `status`,
  `isLoading`, `isAuthenticated`, `profilePhoto`, `errorMessage`, `role`
  (default `AuthRoleEnum.Seller`), `isVerified`.
- Reducers:
  - `login(payload)` — setea todo el estado autenticado a partir de la
    respuesta del backend (login, google, checkAuth).
  - `logout(payload)` — limpia el estado, `role` vuelve al default.
  - `checkingCredentials()`
  - `clearAuthError()`
- Exporta `RootState`, `AppDispatch` y el reducer por defecto.

### `authThunks.ts`
- `startLoginWithEmailPassword({ email, password, rememberMe })`
- `startRegister({ sanitizedData })`
- `startGoogleLogin({ accessToken })`
- `startLogout()`
- `startCheckAuth()` — valida sesión al montar la app (ver
  [docs/features/rememberMe.md](../features/rememberMe.md))
- `startRequestPasswordReset({ email })`
- `startResetPassword({ token, newPassword, repeatNewPassword })`
- `startEditAuthRole({ _id, role })` — edición administrativa de rol de
  **otro** usuario (no toca el slice: quien dispara esto normalmente no
  es el usuario logueado). El backend devuelve 403 si quien llama no es
  admin — ver
  [docs/features/sellerRoleAndAccountDeletion.md](../features/sellerRoleAndAccountDeletion.md).
- Usa `authApi` para requests y maneja errores con `handleErrorWithAction`
  (login/register/google) o devolviendo un resultado `{ success,
  errorMessage }` sin tocar el slice (reset password, edit role).

## ✨ Beneficios

- 🔐 **Centraliza la lógica de auth**.
- 🧠 **Separa reducers de efectos secundarios**.
- 📌 **Maneja errores de forma consistente**.
- 🎭 **Separa "mi sesión" de "editar a otro usuario"**: `login`/`logout`
  tocan el slice porque son sobre quien está logueado; `startEditAuthRole`
  no, porque casi siempre es un admin editando a alguien más.
