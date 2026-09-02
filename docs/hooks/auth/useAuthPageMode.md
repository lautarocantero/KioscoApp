# 🪝 `useAuthPageMode`

> Hook de React que resuelve si `LoginPage` debe mostrar el formulario de login o el de registro, leyendo el query param `?mode=register` de la URL actual.

## 🎯 ¿Para qué sirve?

Login y registro son la misma página/ruta (`/login`) en vez de dos rutas distintas (`/login` y `/register`). Este hook es lo que le dice a `LoginPage` cuál de los dos formularios renderizar, sin que la página tenga que leer `useSearchParams` ni conocer la forma del query param directamente.

**Por qué una sola página**: antes, `/login` y `/register` eran rutas separadas, cada una montando su propio `AuthLayout`. Cada vez que el usuario iba de una a la otra (o volvía), React desmontaba y volvía a montar `AuthBrandPanel`, lo que reiniciaba desde cero el video de intro (ver [`useAuthBrandVideo`](./useAuthBrandVideo.md)). Al ser una sola ruta con el modo resuelto por query param, `AuthLayout`/`AuthBrandPanel` nunca se desmontan al alternar entre login y registro — solo cambia qué formulario se renderiza adentro.

## 📦 Firma

```ts
useAuthPageMode(): UseAuthPageModeReturn

interface UseAuthPageModeReturn {
  mode: AuthPageModeEnum; // "login" | "register"
}
```

- No recibe parámetros.
- Lee `searchParams.get("mode")`: si es exactamente `"register"` devuelve `AuthPageModeEnum.Register`; cualquier otro valor (ausente, vacío, inválido) devuelve `AuthPageModeEnum.Login` — el login es el modo por defecto/seguro.

## 💡 Ejemplo

```tsx
const { mode } = useAuthPageMode();
const isRegisterMode = mode === AuthPageModeEnum.Register;

{isRegisterMode ? <RegisterForm /> : <LoginForm />}
```

## Cómo se cambia de modo

No se navega a otra ruta: `useLoginForm().handleGoToRegister` y `useRegisterForm().handleGoToLogin` (en `hooks/auth/useAuthForm.ts`) usan `navigate("/login?mode=register")` y `navigate("/login")` respectivamente — mismo pathname, solo cambia el query param, así React Router no remonta la ruta.

`/register` como URL directa (bookmarks, links externos desde landing, `useJoinKioscoAccess`, etc.) se sigue soportando: `AuthRoutes` la redirige a `/login?mode=register` con `<Navigate replace />`.

## Tests

`src/hooks/auth/test/useAuthPageMode.test.tsx`
