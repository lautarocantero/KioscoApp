# 🪝 `useJoinKioscoAccess`

> Hook de React que decide qué hacer cuando alguien abre `/join-kiosco` **sin sesión iniciada**.

## 🎯 ¿Para qué sirve?

Sin cuenta no hay forma de unirse a un kiosco. Si `JoinKioscoPage` se abre deslogueado (típicamente desde un link de invitación compartido), este hook guarda el código en `localStorage` y redirige a `/register`. `useHandlePendingInviteCode` retoma el join apenas la sesión pasa a `Authenticated`.

## 📦 Firma

```ts
useJoinKioscoAccess(): { isChecking: boolean }
```

- No recibe parámetros — lee el status de auth del store y el query param `?code=` de la URL actual.
- `isChecking` es `true` mientras `startCheckAuth()` todavía no resolvió (evita redirigir de más mientras se valida una sesión existente).

## ⚙️ Comportamiento

```
status === NotAuthenticated:
  1. si hay ?code= en la URL → localStorage.setItem(PENDING_INVITE_CODE_STORAGE_KEY, code)
  2. navigate("/register")

status === Authenticated:
  no hace nada (JoinKioscoPage usa useJoinKiosco directamente en ese caso)
```

## 💡 Ejemplo

```tsx
function JoinKioscoPage() {
  const { isChecking } = useJoinKioscoAccess();
  const { status } = useSelector((s: RootState) => s.auth);

  if (isChecking) return <LoadingSpinnerComponent />;
  if (status !== AuthStatus.Authenticated) return null; // ya está redirigiendo

  return <JoinKioscoForm />; // usa useJoinKiosco
}
```

## 📚 Ver también

[useHandlePendingInviteCode](useHandlePendingInviteCode.md) — retoma el join guardado acá, apenas el usuario termina de loguearse/registrarse.

## Tests

`src/hooks/kiosco/test/useJoinKioscoAccess.test.ts`
