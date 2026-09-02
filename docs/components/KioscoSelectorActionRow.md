# KioscoSelectorActionRow — Documentación

## ¿Para qué sirve?

Fila de acción reusable para las dos opciones de sumar un kiosco: "Crear un nuevo kiosco" y "Unirme a kiosco existente". Puramente presentacional. Vive dentro de [AddKioscoCard](AddKioscoCard.md), la primera tarjeta de la grilla de `/select-kiosco` (antes vivía como dos filas sueltas al pie de la página).

## Props (`KioscoSelectorActionRowProps`)

```ts
interface KioscoSelectorActionRowProps {
  icon: ReactNode;
  endIcon: ReactNode;
  title: string;
  subtitle: string;
  accent: "lightMain" | "lightSecondary";
  onClick: () => void;
}
```

- `accent` selecciona el token de color (`theme.custom[accent]`) para el ícono, el título y el borde del ícono — así "Crear" y "Unirme" pueden tener acentos distintos sin hardcodear ningún hex.

## Comportamiento visual

- Hover: `transform: scale(1.02)` + el borde pasa a `theme.custom[accent]` — mismo mecanismo de "crecer un poco" en ambas filas.
- `ButtonBase` de MUI como raíz, para accesibilidad de teclado/foco gratis.

## Ejemplo de uso

```tsx
<KioscoSelectorActionRow
  icon={<AddCircleOutlineIcon />}
  endIcon={<ArrowForwardIcon />}
  title={t("kiosco.selector.create.title")}
  subtitle={t("kiosco.selector.create.subtitle")}
  accent="lightMain"
  onClick={() => navigate("/create-kiosco")}
/>
```

## Tests

`src/modules/kiosco/test/components/KioscoSelectorActionRow.test.tsx`
