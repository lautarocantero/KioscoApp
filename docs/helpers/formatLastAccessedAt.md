# `formatLastAccessedAt` — Documentación

## ¿Para qué sirve?

Función pura que formatea el "último acceso" de una membership de kiosco (`KioscoWithStats.last_accessed_at`) como texto relativo corto, vía `i18next`.

## Firma

```ts
formatLastAccessedAt(lastAccessedAt: string | null, t: TFunction): string
```

- `null` o fecha inválida → `kiosco.selector.card.never`
- Hoy → `kiosco.selector.card.today` (con `{{time}}`)
- Ayer → `kiosco.selector.card.yesterday` (con `{{time}}`)
- Cualquier otro día → `date.toLocaleDateString()` (fecha corta, sin key de i18n)

## Dónde se usa

- `KioscoCard.tsx` — fila "Último acceso" de la card.

## Tests

`src/modules/kiosco/test/helpers/formatLastAccessedAt.test.ts`
