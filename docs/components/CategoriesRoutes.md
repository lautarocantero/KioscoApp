# CategoriesRoutes — Documentación

## ¿Para qué sirve?

Declara las rutas del módulo de Categorías y las conecta con sus páginas. Sigue el mismo patrón que `AccountRoutes()`, `SellerRoutes()`, etc.: se invoca como función (no como componente JSX) dentro del `<Routes>` principal.

## ⚠️ Estado actual: no montado en el router

A diferencia del resto de los `*Routes()` del proyecto, **`CategoriesRoutes` todavía no está importado ni invocado en `src/router/AppRouter.tsx`**. Esto significa que las rutas `/categories`, `/categories-list`, `/categories-create` y `/categories-edit` **no son alcanzables** desde la navegación real de la app hoy — el componente y sus páginas existen y funcionan (están cubiertos por tests), pero nada las monta.

Se documenta y testea igual porque el código existe y debe mantenerse correcto, pero si el módulo de Categorías está pensado para estar disponible, falta el paso de agregar `{CategoriesRoutes()}` en `AppRouter.tsx` (fuera del alcance de esta pasada de tests/docs — es una decisión de producto/feature, no una corrección de accesibilidad o cobertura).

## Props

Ninguna — no recibe parámetros ni props.

## Rutas que declara

| Ruta | Página |
|---|---|
| `/categories` | `CategoriesPage` |
| `/categories-list` | `CategoriesListPage` |
| `/categories-create` | `CategoriesCreatePage` |
| `/categories-edit` | `CategoriesEditPage` |

## Ejemplo de uso (previsto)

```tsx
import CategoriesRoutes from "../modules/categories/CategoriesRoutes";

<Routes>
  {CategoriesRoutes()}
</Routes>
```

## Detalles de implementación

- Se llama como función (`CategoriesRoutes()`), no como componente (`<CategoriesRoutes />`), por el mismo motivo que el resto de los `*Routes()` del proyecto: debe devolver `<Route>` "planos" para que `react-router-dom` los registre dentro del `<Routes>` padre.
- El componente exportado se llamaba internamente `ProductsRoutes` (copiado del archivo de rutas de productos) — se corrigió a `CategoriesRoutes` para que coincida con el archivo y su responsabilidad real.

## Tests

`src/modules/categories/test/CategoriesRoutes.test.tsx`
