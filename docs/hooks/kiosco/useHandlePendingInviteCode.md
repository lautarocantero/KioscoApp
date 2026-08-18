# 🪝 `useHandlePendingInviteCode`

> Hook de React (sin retorno) que retoma un join de kiosco pendiente apenas el usuario se autentica.

## 🎯 ¿Para qué sirve?

Cierra el círculo que abre [useJoinKioscoAccess](useJoinKioscoAccess.md): si alguien abrió un link de invitación deslogueado, el código quedó guardado en `localStorage` y fue mandado a `/register`. Apenas esa sesión pasa a `Authenticated` (registro o login), este hook dispara el join automáticamente — el usuario no tiene que volver a pegar el código a mano.

Se monta una sola vez en `AppRouter.tsx`, a nivel global (no depende de estar en `/join-kiosco`).

## 📦 Firma

```ts
useHandlePendingInviteCode(): void
```

- No recibe parámetros ni devuelve nada — es puro efecto secundario.
- Usa un `useRef` (`handledRef`) para garantizar que corre **una sola vez** por sesión de la pestaña, incluso si `status` vuelve a disparar el `useEffect`.

## ⚙️ Comportamiento

```
status pasa a Authenticated (y no se manejó todavía):
  1. lee PENDING_INVITE_CODE_STORAGE_KEY de localStorage
  2. si no hay código → no hace nada
  3. si hay código:
     a. lo borra de localStorage (evita reintentar en cada render)
     b. dispatch(joinKioscoThunk({ invite_code: pendingCode }))
     c. dispatch(fetchMyKioscosThunk())   → refresca la lista para que el nuevo kiosco aparezca
```

El código se borra **antes** de que la request resuelva (no hay reintento automático si `joinKioscoThunk` falla — por ejemplo, código ya vencido). Es una decisión deliberada: evita loops de reintento silenciosos; si falla, el usuario simplemente no ve el kiosco nuevo y puede volver a pedir el link.

## 💡 Ejemplo

```tsx
// AppRouter.tsx
const AppRouter = () => {
  useHandlePendingInviteCode();
  // ...resto del router
};
```

## Tests

`src/hooks/kiosco/test/useHandlePendingInviteCode.test.ts`
