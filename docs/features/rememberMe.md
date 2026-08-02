# 🔐 Remember Me + Refresh Token — Documentación técnica

## Índice

1. [Resumen](#resumen)
2. [Modelo mental](#modelo-mental)
3. [Flujo completo](#flujo-completo)
4. [Backend](#backend)
5. [Frontend](#frontend)
6. [Decisiones de diseño](#decisiones-de-diseño)
7. [Cómo probarlo](#cómo-probarlo)
8. [Pendientes](#pendientes)

---

## Resumen

El checkbox "Recordarme" del login controla **cuánto dura la sesión** sin
que el usuario tenga que volver a loguearse. Para que eso funcione de
verdad, además se implementó un **refresh automático** del token de acceso:
sin esto, la sesión "larga" no servía de nada porque el usuario se quedaba
sin acceso funcional a los 5 minutos igual.

Dos tokens, dos responsabilidades:

| Token | Dura | Para qué sirve |
|---|---|---|
| `access_token` | 5 min | Autoriza cada request a rutas protegidas |
| `refresh_token` | 1 día (sin Recordarme) / 30 días (con Recordarme) | Permite pedir un `access_token` nuevo sin volver a loguearse |

---

## Modelo mental

```
┌─────────────┐     access_token vence (5 min)      ┌──────────────┐
│   Usuario    │ ───────────────────────────────────▶│  401 en algún │
│   navegando  │                                      │   request     │
└─────────────┘                                      └──────┬───────┘
                                                              │
                                          ┌───────────────────┴───────────────────┐
                                          │  Interceptor de axios (httpClient.ts)  │
                                          │  POST /auth/refresh (usa refresh_token)│
                                          └───────────────────┬───────────────────┘
                                                              │
                              ┌───────────────────────────────┴───────────────────────────────┐
                              │                                                                 │
                    refresh_token válido                                          refresh_token vencido/ausente
                              │                                                                 │
                              ▼                                                                 ▼
                  access_token nuevo                                              logout global automático
                  reintenta el request original                                   (dispatch(logout()) → AppRouter
                  usuario no nota nada                                             redirige solo al login)
```

---

## Flujo completo

### 1. Login con "Recordarme"

```
Checkbox (LoginForm.tsx)
  → Formik values.rememberMe
    → useLoginForm.handleSubmit
      → startLoginWithEmailPassword({ email, password, rememberMe })
        → authLoginRequest({ email, password, rememberMe })
          → POST /auth/login  { email, password, rememberMe }
            → backend: firma refresh_token con expiresIn 30d o 1d
            → backend: cookie refresh_token con o sin maxAge según rememberMe
```

### 2. Uso normal (access_token vigente)

Cada request protegida viaja con la cookie `access_token` (httpOnly).
Mientras esté vigente (< 5 min desde el login/refresh), todo funciona
normal, sin intervención del interceptor.

### 3. access_token vencido → refresh automático

```
Request protegida (product, sell, presentation, auth)
  → 401 (access_token vencido o inválido)
    → httpClient.ts intercepta la respuesta
      → ¿ya se reintentó esta request? → no reintentar de nuevo (evita loop)
      → ¿es la propia llamada a /refresh la que falló? → no reintentar (evita loop)
      → ¿hay un refresh en curso ya? → esperar en cola, no disparar otro
      → POST /auth/refresh (usa refresh_token de la cookie)
        → éxito: cookie access_token renovada → reintenta el request original
        → falla: refresh_token vencido/inválido → logoutHandler()
```

### 4. Sesión realmente terminada (refresh también falla)

```
httpClient.ts: refresh falló
  → logoutHandlerRef.current() (inyectado por authHttpBridge.ts)
    → dispatch(logout({ errorMessage: null }))
      → authSlice: status = AuthStatus.NotAuthenticated
        → AppRouter se re-renderiza (useSelector reactivo)
          → status !== Authenticated → renderiza AuthRoutes()
            → usuario ve el login, sin necesidad de navigate() manual
```

---

## Backend

### `auth.controller.ts`

**`login`** — recibe `rememberMe` del body y lo usa para dos cosas:

```ts
const refreshExpiresIn = rememberMe ? '30d' : '1d';

const refreshToken = jwt.sign(
  { id: user._id, email: user.email },
  REFRESH_SECRET,
  { expiresIn: refreshExpiresIn }
);

const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: (process.env.NODE_ENV === 'production' ? 'none' : 'lax') as 'none' | 'lax',
    // Si rememberMe es false, no seteamos maxAge → cookie de sesión,
    // se borra sola al cerrar el navegador.
    ...(rememberMe && { maxAge: 1000 * 60 * 60 * 24 * 30 }),
};
```

Importante: hay **dos mecanismos de expiración independientes**:
- El `expiresIn` del JWT en sí (válido aunque la cookie siga viva).
- El `maxAge` de la cookie (controla si el navegador la borra al cerrarse).

Con `rememberMe: false`, la cookie es de sesión (se borra al cerrar el
navegador) *y además* el JWT vence en 1 día como red de seguridad, por si
el navegador queda abierto mucho tiempo.

**`checkAuth`** — valida sesión con el `refresh_token`, usado al montar la
app. Devuelve 401 explícito si no hay cookie, en vez de dejar que
`jwt.verify(undefined, ...)` tire `"jwt must be provided"` como excepción
no controlada (bug original que motivó todo este trabajo — ver
[Decisiones de diseño](#decisiones-de-diseño)).

**`refresh`** (nuevo endpoint) — emite un `access_token` nuevo a partir de
un `refresh_token` válido:

```ts
export async function refresh(req: AuthRefreshRequest, res: Response): Promise<void> {
  const refreshToken = req.cookies?.refresh_token;

  if (!refreshToken) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  try {
    const payload = jwt.verify(refreshToken, REFRESH_SECRET) as { id: string; email: string };

    // Confirma que el refresh token siga vigente en DB (permite invalidar
    // sesiones desde el server, ej. logout global futuro).
    const user: AuthPublicSchema = await AuthModel.checkAuth({ _id: payload.id });
    if (!user) throw new Error('No se encuentra ese usuario');

    const newAccessToken = jwt.sign(
      { id: payload.id, email: payload.email },
      ACCESS_SECRET,
      { expiresIn: '5m' }
    );

    res
      .cookie('access_token', newAccessToken, { /* mismas opciones que login */ })
      .status(200)
      .json({ message: 'Token refreshed' });
  } catch (error: unknown) {
    handleControllerError(res, error);
  }
}
```

### `auth.routes.ts`

```ts
router.post('/refresh', refresh);
```

### Tipos (`@typings/auth`)

```ts
export type AuthRefreshRequest = Request<AuthParams, unknown, unknown>;

export type AuthLoginPayload = Pick<Auth, 'email' | 'password'> & {
    rememberMe: boolean;
};
```

---

## Frontend

### Tipos — `authTypes.ts`

Un solo tipo base para no repetir `{ email, password, rememberMe }` en
tres capas distintas:

```ts
export type AuthCredentialsPayload = Pick<Auth, 'email' | 'password'> & {
    rememberMe: boolean;
};

export type AuthLoginRequestPayload = AuthCredentialsPayload; // thunk
export type AuthLoginApiPayload     = AuthCredentialsPayload; // api
export type AuthLoginFormValues     = AuthCredentialsPayload; // form
```

`AuthPublic` (el usuario que devuelve el backend) **no** lleva
`rememberMe` — es un dato del request de login, no del usuario.

### Formulario — `LoginForm.tsx` + `authFormSchema.ts`

```tsx
<Checkbox
    checked={values.rememberMe}
    onChange={(e) => setFieldValue("rememberMe", e.target.checked)}
/>
```

```ts
export const getLoginInitialValues = (): AuthLoginFormValues => ({
    email: "",
    password: "",
    rememberMe: true, // arranca tildado
});
```

### `useAuthForm.ts` → `authThunks.ts` → `authApi.ts`

El flag viaja sin transformación por las tres capas:

```ts
// useAuthForm.ts
const { email, password, rememberMe } = values;
dispatch(startLoginWithEmailPassword({ email, password, rememberMe }));

// authThunks.ts
const { user } = await authLoginRequest({ email, password, rememberMe });

// authApi.ts
export const authLoginRequest = async (data: AuthLoginApiPayload) => {
  const response = await baseUrl.post('/login', data);
  return response.data;
};
```

### `httpClient.ts` — cliente HTTP compartido con refresh automático

Vive en `shared/api/httpClient.ts`. Factory usado por **todos** los
módulos (`auth`, `product`, `sell`, `presentation`) para no duplicar el
interceptor en cada `*Api.ts`:

```ts
export const createHttpClient = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  return attachRefreshInterceptor(instance);
};
```

Uso en cada módulo:

```ts
// authApi.ts
const baseUrl = createHttpClient(`${API_URL}/auth`);

// productApi.ts
const baseUrl = createHttpClient(`${API_URL}/product`);

// sellApi.ts
const baseUrl = createHttpClient(`${API_URL}/sell`);

// presentationApi.ts
const baseUrl = createHttpClient(`${API_URL}/presentation`);
```

**Estado de refresh compartido a nivel de módulo** (no por instancia):
si dos módulos distintos reciben 401 al mismo tiempo, solo se dispara
**un** `POST /refresh`, y ambos esperan el mismo resultado en vez de
disparar llamadas duplicadas.

```ts
const refreshState = { isRefreshing: false };
const refreshQueue: Array<() => void> = [];
```

**Salvaguardas contra loops infinitos**:
- Si la request que falló en 401 es la propia `/refresh`, no se reintenta.
- Cada request solo se reintenta una vez (`originalRequest._retry`).

### `authHttpBridge.ts` — puente httpClient ↔ Redux

`httpClient.ts` no puede importar el store directamente (dependencia
circular: `store → thunks → api → httpClient → store`). Este archivo es
el único punto donde ambos mundos se conocen:

```ts
export const initAuthHttpBridge = (dispatch: AppDispatch): void => {
  setLogoutHandler(() => {
    dispatch(logout({ errorMessage: null }));
  });
};
```

Se llama una sola vez, en `store.ts`, apenas se crea el store:

```ts
export const store = configureStore({ reducer: rootReducer, /* ... */ });

initAuthHttpBridge(store.dispatch);
```

### Redirección automática al login — `AppRouter.tsx`

No hace falta un `ProtectedRoute` adicional: `AppRouter` ya lee
`auth.status` vía `useSelector`, así que se re-renderiza solo cuando el
logout automático cambia el estado global:

```tsx
const { status } = useSelector((state: RootState) => state.auth);

// ...

{status === AuthStatus.Authenticated ? (
  <Route element={<AppShell />}>{/* rutas protegidas */}</Route>
) : (
  <>{AuthRoutes()}</>
)}
```

### `startCheckAuth` no contamina el error de login

Antes: cualquier fallo del chequeo de sesión al montar la app (por
ejemplo, primera visita sin sesión previa) usaba `handleErrorWithAction`,
que escribía el error crudo del backend (`"jwt must be provided"`) en
`state.auth.errorMessage` — el mismo campo que lee el formulario de
login. Resultado: el error aparecía en el login sin que el usuario
tocara nada.

Fix — un chequeo pasivo nunca debe mostrar error de UI:

```ts
export const startCheckAuth = (): ThunkAction<...> => {
  return async (dispatch: Dispatch) => {
    try {
      // ...
    } catch(error: unknown) {
        dispatch(logout({ errorMessage: null })); // sin mensaje
    } 
  }
}
```

---

## Decisiones de diseño

### ¿Por qué el backend valida "no hay cookie" antes de `jwt.verify`?

`jwt.verify(undefined, SECRET)` lanza `"jwt must be provided"` como
excepción. Tratar la *ausencia* de sesión como una excepción mezcla dos
cosas distintas: "no hay sesión" (estado válido, esperable en cualquier
visita sin login previo) y "error real" (token corrupto, secret
incorrecto, etc.). Por eso `checkAuth`, `logout` y `refresh` cortan antes
con un 401 explícito si no hay `refresh_token` en absoluto.

### ¿Por qué inyección tardía (`setLogoutHandler`) en vez de importar el store?

`httpClient.ts` vive en `shared/`, fuera del árbol de Redux. Si
importara `store` directamente se generaría una dependencia circular
(`store → auth thunks → authApi → httpClient → store`). El patrón de
inyección (`setLogoutHandler`, llamado una sola vez desde `store.ts`)
rompe el ciclo: `httpClient` nunca necesita saber qué es Redux, solo
invoca una función que le dieron.

### ¿Por qué `AuthCredentialsPayload` como tipo único?

`{ email, password, rememberMe }` viajaba sin cambios de forma por tres
capas (form → thunk → API). Definirlo una sola vez y alias-earlo evita
que las tres definiciones diverjan con el tiempo por error de copy-paste.

### ¿Por qué `refresh` vuelve a validar contra la DB (`AuthModel.checkAuth`) en vez de confiar solo en la firma del JWT?

Deja la puerta abierta a invalidar sesiones desde el server (por ejemplo,
un futuro "cerrar sesión en todos los dispositivos" que borre el
`refreshToken` guardado). Sin esta validación, un JWT de refresh
técnicamente no vencido pero ya revocado en DB seguiría generando
`access_token`s nuevos indefinidamente.

---

## Cómo probarlo

### Caso `rememberMe: true`

1. Login con el checkbox tildado.
2. DevTools → Application → Cookies → `refresh_token`.
3. Esperado: columna `Expires / Max-Age` muestra una fecha ~30 días en el
   futuro. ✅ Confirmado en captura de pantalla (expira 30 días después
   del login).

### Caso `rememberMe: false`

1. Login con el checkbox destildado.
2. Misma tabla de cookies.
3. Esperado: `refresh_token` aparece como `Session` (sin fecha fija).
4. **Estado: pendiente de verificar.**

### Refresh automático exitoso

1. Bajar temporalmente `expiresIn` del `access_token` a `'10s'` en
   `login` (backend).
2. Loguearse, esperar 10s, disparar cualquier request protegida.
3. Esperado en Network: 401 en la request original → `POST /refresh` →
   200 → la request original se reintenta y tiene éxito, sin que el
   usuario note nada.
4. **Estado: pendiente de verificar.**

### Logout automático por sesión vencida

1. Loguearse.
2. Borrar la cookie `refresh_token` manualmente desde DevTools.
3. Disparar cualquier request protegida (o esperar al próximo
   `startCheckAuth`).
4. Esperado: 401 → intento de refresh → también 401 → `dispatch(logout())`
   → `AppRouter` redirige solo al login.
5. **Estado: ✅ confirmado manualmente.**

---

## Pendientes

- [ ] 🔴 Verificar refresh automático exitoso end-to-end (ver sección
      arriba).
- [ ] 🟡 Verificar caso `rememberMe: false` en DevTools.
- [ ] 🟡 Confirmar que el `exp` del JWT interno (jwt.io) coincide con
      `1d`/`30d` según el flag, no solo el `Max-Age` de la cookie.
- [ ] 🟢 Excluir `/login`, `/register`, `/check-auth` del interceptor de
      refresh (hoy un login con credenciales inválidas dispara un
      `/refresh` innecesario antes de fallar).
- [ ] 🟢 Actualizar la tabla de endpoints en el header de
      `auth.controller.ts` (falta la fila de `/refresh`).
- [ ] 🟢 Revisar si `AuthCheckAutResponse` (con `password`/`refreshToken`
      en el `Pick`) es un tipo viejo sin uso real.
- [ ] 🟢 Tests automatizados (Jest/Supertest):
      - `POST /login` → `Max-Age` presente/ausente según `rememberMe`.
      - `POST /refresh` → 200 con token válido, 401 sin cookie, 401 con
        token vencido.
- [ ] 🔵 Feature futura: "cerrar sesión en todos los dispositivos" —
      ya existe `AuthModel.deleteRefreshToken`, falta exponerlo como
      acción de usuario.

---

## Archivos tocados (referencia rápida)

**Backend**
- `controllers/auth.controller.ts` — `login`, `checkAuth`, `logout`, `refresh`
- `routes/auth.routes.ts` — ruta `/refresh`
- `typings/auth/*` — `AuthRefreshRequest`, `AuthLoginPayload.rememberMe`

**Frontend**
- `typings/auth/authTypes.ts` — `AuthCredentialsPayload` y alias
- `modules/auth/schema/authFormSchema.ts` — `rememberMe` en initial values + schema
- `modules/auth/.../LoginForm.tsx` — checkbox controlado
- `hooks/auth/useAuthForm.ts` — pasa `rememberMe` al thunk
- `store/auth/authThunks.ts` — `startLoginWithEmailPassword`, `startCheckAuth`
- `store/auth/authHttpBridge.ts` — puente httpClient ↔ Redux (nuevo)
- `store/store.ts` — `initAuthHttpBridge(store.dispatch)`
- `shared/api/httpClient.ts` — cliente HTTP + interceptor de refresh (nuevo)
- `modules/auth/api/authApi.ts`, `modules/products/.../productApi.ts`,
  `modules/sells/.../sellApi.ts`, `modules/presentations/.../presentationApi.ts`
  — todos migrados a `createHttpClient`
- `router/AppRouter.tsx` — sin cambios de código, pero es la pieza que
  hace visible el logout automático (re-render reactivo por `useSelector`)