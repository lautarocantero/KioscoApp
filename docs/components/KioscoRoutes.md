# KioscoRoutes — Documentación

## ¿Para qué sirve?

Declara las rutas standalone del módulo de kioscos y las conecta con sus páginas. Mismo patrón que el resto de los `*Routes()` del proyecto: se invoca como función (no como componente JSX) dentro del `<Routes>` principal.

## Rutas que declara

| Ruta | Página |
|---|---|
| `/select-kiosco` | `KioscoSelectorPage` |
| `/create-kiosco` | `CreateKioscoPage` |

`/join-kiosco` **no** está acá — vive registrada aparte, directamente en `AppRouter.tsx`, porque a diferencia de estas dos debe ser alcanzable tanto logueado como deslogueado (ver [useJoinKioscoAccess](../hooks/kiosco/useJoinKioscoAccess.md)).

## Dónde se monta

`src/router/AppRouter.tsx`, dentro de la rama `status === AuthStatus.Authenticated`, **fuera** de `<AppShell>` (sin sidebar) — mismo criterio que el resto de las pantallas de onboarding.

```tsx
{status === AuthStatus.Authenticated ? (
  <>
    {KioscoRoutes()}
    {hasActiveKiosco ? (
      <Route element={<AppShell />}>{/* ...resto de rutas... */}</Route>
    ) : (
      <Route path="*" element={<Navigate to="/select-kiosco" />} />
    )}
  </>
) : (
  <>{AuthRoutes()}</>
)}
```

## Ejemplo de uso

```tsx
import KioscoRoutes from "../modules/kiosco/routes/KioscoRoutes";

<Routes>
  {KioscoRoutes()}
</Routes>
```

## Tests

`src/modules/kiosco/test/routes/KioscoRoutes.test.tsx`
