# 🗄️ `shared`

> Documentación de utilidades compartidas del store.

## 🎯 ¿Para qué sirve?

Contiene funciones auxiliares para el manejo consistente de errores en thunks y acciones de Redux.

## 📦 Archivos

- `src/store/shared/handlerStoreError.ts`

## 💡 Contenido

### `handlerStoreError.ts`
- `handleError(error: unknown)` — lanza un `Error` con un mensaje claro.
- `handleErrorWithAction({ error, dispatch, action })` — despacha una acción de error y relanza el error.
- Usa `axios.isAxiosError` para extraer mensajes del servidor cuando aplica.

## ✨ Beneficios

- 🧹 **Centraliza el manejo de errores**.
- ✅ **Evita lógica duplicada** en thunks.
- 📌 **Hace consistente la actualización del estado de error**.
