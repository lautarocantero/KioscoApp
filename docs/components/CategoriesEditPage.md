# CategoriesEditPage — Documentación

## ⚠️ Estado: placeholder / en construcción

Este componente **todavía no implementa funcionalidad real**. Es un cartel fijo para la ruta `/categories-edit`; no tiene formulario, no valida datos y no llama a ningún servicio. Este documento describe únicamente lo que existe hoy.

## ¿Para qué sirve?

Ocupar el lugar de la futura página de edición de categorías mientras esa funcionalidad no está desarrollada.

## Props

Ninguna.

## Ejemplo de uso

```tsx
// src/modules/categories/CategoriesRoutes.tsx
<Route path="/categories-edit" element={<CategoriesEditPage />} />
```

## Qué renderiza hoy

```tsx
<main>
  <p>CategoriesEditPage</p>
</main>
```

Un texto fijo dentro de un `<main>` (landmark de accesibilidad agregado para que la página tenga una región principal identificable, ya que este stub no pasa por `AppLayout`).

## Pendiente

Según los comentarios del propio archivo fuente, a futuro debería incluir un formulario de edición de categoría. Ninguna pieza de esa funcionalidad existe todavía, y la ruta que la aloja no está montada en el router (ver [docs/components/CategoriesRoutes.md](./CategoriesRoutes.md)).

## Tests

`src/modules/categories/test/CategoriesEditPage.test.tsx` — smoke test que confirma que el componente renderiza sin errores.
