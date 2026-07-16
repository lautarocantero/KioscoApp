# 🗄️ `auth`

> Documentación del slice de autenticación y los thunks asociados.

## 🎯 ¿Para qué sirve?

Gestiona el estado de autenticación del usuario: login, logout, verificación de credenciales y manejo de errores.

## 📦 Archivos

- `src/store/auth/authSlice.ts`
- `src/store/auth/thunks.ts`

## 💡 Contenido

### `authSlice.ts`
- Define el slice `auth` con el estado inicial de usuario y auth.
- Reducers:
  - `login`
  - `logout`
  - `checkingCredentials`
  - `clearAuthError`
- Exporta `RootState`, `AppDispatch` y el reducer por defecto.

### `thunks.ts`
- Define thunks para acciones asíncronas de auth:
  - `startLoginWithEmailPassword`
  - `startRegister`
  - `startLogout`
  - `startCheckAuth`
- Usa `authApi` para requests y maneja errores con `handleErrorWithAction`.

## ✨ Beneficios

- 🔐 **Centraliza la lógica de auth**.
- 🧠 **Separa reducers de efectos secundarios**.
- 📌 **Maneja errores de forma consistente**.
