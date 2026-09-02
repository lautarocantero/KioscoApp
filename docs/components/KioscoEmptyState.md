# KioscoEmptyState — Documentación

## ¿Para qué sirve?

Estado vacío real de `/select-kiosco`: se muestra cuando el usuario todavía no tiene ningún kiosco (`isEmpty` de `useKioscoSelector`), reemplazando por completo al buscador y a la grilla — no conviven. Envuelve `EmptyStateCard` (mismo patrón que `EmptyProduct`, `EmptySeller`, etc.) con la mascota de Stocko, y agrega un link secundario para el camino de "unirme con código" dentro de la descripción.

## Props

Ninguna — se resuelve solo, mismo patrón que `EmptyProduct.tsx` (llama `useNavigate` directo en el `.tsx`, precedente ya aceptado en el proyecto para estos wrappers).

## Comportamiento

- Botón primario ("Crear kiosco") → `navigate("/create-kiosco")`.
- Link secundario dentro de la descripción ("Tengo un código de invitación") → `navigate("/join-kiosco")`, accesible por teclado (`role="button"`, `tabIndex`, `Enter`/`Espacio`).

## Ejemplo de uso

```tsx
{isEmpty ? <KioscoEmptyState /> : <KioscoGrid {...gridProps} />}
```

## Ver también

- [EmptyStateCard](../../src/modules/shared/components/EmptyStateCard/EmptyStateCard.tsx) (patrón reutilizado)
- [KioscoGrid](KioscoGrid.md)

## Tests

`src/modules/kiosco/test/components/KioscoEmptyState.test.tsx`
