# CategoriesListPage — Documentación

## ⚠️ Estado: placeholder / en construcción

Este componente **todavía no implementa funcionalidad real**. Es un cartel fijo para la ruta `/categories-list`; no muestra ninguna tabla ni consume datos. Este documento describe únicamente lo que existe hoy.

## ¿Para qué sirve?

Ocupar el lugar de la futura página de listado de categorías mientras esa funcionalidad no está desarrollada.

## Props

Ninguna.

## Ejemplo de uso

```tsx
// src/modules/categories/CategoriesRoutes.tsx
<Route path="/categories-list" element={<CategoriesListPage />} />
```

## Qué renderiza hoy

```tsx
<main>
  <p>CategoriesListPage</p>
</main>
```

Un texto fijo dentro de un `<main>` (landmark de accesibilidad agregado para que la página tenga una región principal identificable, ya que este stub no pasa por `AppLayout`).

## Pendiente

Según los comentarios del propio archivo fuente, a futuro debería incluir una tabla o listado dinámico de categorías. Ninguna pieza de esa funcionalidad existe todavía, y la ruta que la aloja no está montada en el router (ver [docs/components/CategoriesRoutes.md](./CategoriesRoutes.md)).

## Tests

`src/modules/categories/test/CategoriesListPage.test.tsx` — smoke test que confirma que el componente renderiza sin errores.
