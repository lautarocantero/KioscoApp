# KioscoCard — Documentación

## ¿Para qué sirve?

Card de un kiosco en la grilla de `/select-kiosco`: ícono + nombre + dirección, franja con vendedores/ventas de hoy, último acceso, y botón "Ingresar al kiosco". Puramente presentacional — toda la lógica (fetch, entrar al kiosco, color por índice, formateo de fecha) llega resuelta por props/hooks/helpers (regla del proyecto: los `.tsx` no calculan).

## Props (`KioscoCardProps`)

```ts
interface KioscoCardProps {
  kiosco: KioscoWithStats;
  colorIndex: number;
  entering: boolean;
  onEnter: () => void;
}
```

- `colorIndex` — se pasa a `getKioscoAccentColor` para rotar el color del ícono/badges.
- `entering` — deshabilita el botón y cambia su texto mientras se procesa el ingreso a *este* kiosco puntual (viene de `useKioscoSelector`).

## Comportamiento visual

- Hover: el fondo pasa a `theme.palette.primary.main` (color sólido) y todo el resto de los elementos (texto, íconos, badges, divisor, borde del botón) recalcula su color para mantener contraste — no hay dos paletas fijas, se resuelve todo en base al estado `isHovered` interno del componente.
- Si `kiosco.address` viene vacío, la fila de dirección no se renderiza (condicional de render permitido en `.tsx` por la excepción de la regla 5 del proyecto).
- Usa `getNoisyBackgroundSx` (mismo patrón que `NoisyCard`) para la textura de fondo.

## Ejemplo de uso

```tsx
<KioscoCard
  kiosco={kiosco}
  colorIndex={index}
  entering={entering === kiosco._id}
  onEnter={() => handleEnterKiosco(kiosco)}
/>
```

## Ver también

- [KioscoCardSkeleton](../hooks/kiosco/useKioscoSelector.md) — se muestra en `KioscoSelectorPage` mientras `loading && kioscos.length === 0`.
- [docs/helpers/getKioscoAccentColor.md](../helpers/getKioscoAccentColor.md)
- [docs/helpers/formatLastAccessedAt.md](../helpers/formatLastAccessedAt.md)

## Tests

`src/modules/kiosco/test/components/KioscoCard.test.tsx`
