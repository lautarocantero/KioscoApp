# LanguageToggle — Documentación

## ¿Para qué sirve?

Toggle de dos estados (ES/EN) para cambiar el idioma de la app, theme-aware (usa tokens `theme.custom.*`, no colores fijos). Mismo nivel y patrón visual que `LightMode` — pensado para vivir en cualquier pantalla que soporte tema claro/oscuro, a diferencia de `LandingLanguageSelect` que está hardcodeado a los colores oscuros del navbar del landing.

## Props

Ninguna — se resuelve solo con `useLanguageOption` (`src/hooks/ui/useLanguageOption.ts`), igual que `LightMode` con `useThemeModeOption`.

## Comportamiento

- Alterna entre `LanguageEnum.Spanish` y `LanguageEnum.English` en cada click (no es un `<select>`, es un switch de dos estados).
- `role="switch"` + `aria-checked` (`true` cuando el idioma activo es español) para accesibilidad.
- Persiste la elección vía `useLanguageOption` (localStorage + `i18n.changeLanguage`).

## Ejemplo de uso

```tsx
<LanguageToggle />
```

## Dónde se usa

- `KioscoSelectorHeaderBar` (barra superior de `/select-kiosco`).

## Tests

`src/modules/shared/test/LanguageToggle/LanguageToggle.test.tsx`
