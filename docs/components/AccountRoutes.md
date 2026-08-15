# AccountRoutes — Documentación

## ¿Para qué sirve?

Declara las rutas del módulo de Cuenta y las conecta con sus páginas. Se invoca como función (no como componente JSX) dentro del `<Routes>` principal de la app, junto con el resto de los `*Routes()` de cada módulo.

## Dónde se usa

`src/router/AppRouter.tsx`, dentro del `<Route element={<AppShell />}>` (rutas autenticadas):

```tsx
<Routes>
  <Route element={<AppShell />}>
    {/* ... */}
    {AccountRoutes()}
    {/* ... */}
  </Route>
</Routes>
```

## Props

Ninguna — no recibe parámetros ni props.

## Rutas que declara

| Ruta | Página |
|---|---|
| `/account` | `AccountPage` |
| `/account-edit` | `AccountEditPage` |
| `/account-subscription` | `AccountSubscriptionPage` |

## Ejemplo de uso

```tsx
import AccountRoutes from "../modules/account/AccountRoutes";

<Routes>
  {AccountRoutes()}
</Routes>
```

## Detalles de implementación

- Se llama como función (`AccountRoutes()`), no como componente (`<AccountRoutes />`), porque debe devolver `<Route>` "planos" para que `react-router-dom` los registre dentro del `<Routes>` padre — este es el mismo patrón que usan el resto de los módulos (`SellerRoutes()`, `ProviderRoutes()`, etc.).
- Actualmente renderiza las páginas del módulo sin lógica de guardas ni permisos adicionales — la protección de las rutas autenticadas ya la resuelve el `<Route element={<AppShell />}>` padre en `AppRouter.tsx`.

## Tests

`src/modules/account/test/AccountRoutes.test.tsx`
