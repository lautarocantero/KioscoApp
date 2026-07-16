# 🗄️ `user`

> Documentación del slice de usuario.

## 🎯 ¿Para qué sirve?

Gestiona el estado del usuario actual en la aplicación.

## 📦 Archivos

- `src/store/user/userSlice.ts`

## 💡 Contenido

### `userSlice.ts`
- Define el estado del usuario y los reducers para actualizarlo.
- Tipos derivados: `RootState` y `AppDispatch`.

## ✨ Beneficios

- 📌 **Centraliza el estado de usuario**.
- ♻️ **Facilita el acceso tipado al usuario** desde el store.
- 🔨 **Separado de `auth` para mayor claridad**.
