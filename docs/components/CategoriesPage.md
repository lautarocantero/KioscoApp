# CategoriesPage — Documentación

## ¿Para qué sirve?

Página principal del módulo de Categorías (`/categories`). Muestra el menú de opciones ("Ver Categorías", "Crear Categoría", "Editar Categoría") reutilizando el mismo sistema de tarjetas que el resto de los menús de la app (ver [docs/components/OptionsList.md](./OptionsList.md)).

## Props

Ninguna — no recibe parámetros.

## Ejemplo de uso

```tsx
// src/modules/categories/CategoriesRoutes.tsx
<Route path="/categories" element={<CategoriesPage />} />
```

Internamente:

```tsx
const links = useCategoriesLinks();

<DisplayOptions title="Categorías" icon={<BookmarksIcon />} links={links} />
```

## Detalles de implementación

- Toda la lógica de armado de links vive en el hook `useCategoriesLinks` (`src/hooks/categories/useLinksData.ts` — ver [docs/hooks/categories/useLinksData.md](../hooks/categories/useLinksData.md)); el componente en sí es puramente presentacional.
- Delega el layout completo (header, ícono, grilla de tarjetas) a `DisplayOptions`, que a su vez usa `AppLayout` (landmark `<main>` incluido).
- ⚠️ Ver nota en [docs/components/CategoriesRoutes.md](./CategoriesRoutes.md): las rutas de categorías todavía no están montadas en el router principal, por lo que esta página no es alcanzable desde la navegación real de la app.

## Tests

`src/modules/categories/test/CategoriesPage.test.tsx`
