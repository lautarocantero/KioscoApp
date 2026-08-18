# `getKioscoAccentColor` — Documentación

## ¿Para qué sirve?

Función pura que rota entre los accent colors del theme activo (`theme.custom.accents.*`) según el índice de la card en la grilla del selector, para que las cards de `/select-kiosco` se distingan a simple vista sin inventar colores ad-hoc (regla del theme del proyecto).

## Firma

```ts
getKioscoAccentColor(theme: Theme, index: number): string
```

- Rotación de 6 colores: `violet, green, blue, orange, pink, gold`.
- `index % 6` — si hay más de 6 kioscos, los colores se repiten.
- Recibe el `theme` por parámetro (no un import estático) para respetar el modo claro/oscuro vigente.

## Dónde se usa

- `KioscoCard.tsx` — color del ícono/badges de la card.

## Tests

`src/modules/kiosco/test/helpers/getKioscoAccentColor.test.ts`
