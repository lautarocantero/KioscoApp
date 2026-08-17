# 🪝 `useFontSizeOption`

> Hook de React para leer/cambiar el tamaño de letra global de la app.

## 🎯 ¿Para qué sirve?

Expone el `fontSize` actual (número, en px) y un setter, respaldados por
`FontSizeContext`/`FontSizeProvider` (`src/theme/`). Se usa en el slider de
"Tamaño del texto" del modal de Ajustes (`AppearanceFontSizeSection`).

## ⚙️ Cómo escala la app

La tipografía del theme (`src/theme/mainTheme.ts`) está expresada en
`rem`, que el navegador calcula relativo al `font-size` del `<html>`. En
vez de reconstruir el `theme` de MUI dinámicamente, `FontSizeProvider`
simplemente hace:

```ts
document.documentElement.style.fontSize = `${fontSize}px`;
```

Eso reescala **toda** la tipografía de la app de una — nada más necesita
saber que el tamaño de letra cambió.

## 📦 Firma

```ts
useFontSizeOption(): { fontSize: number; setFontSize: (fontSize: number) => void }
```

- No recibe parámetros. Requiere estar bajo `FontSizeProvider` (montado en
  `StokoApp.tsx`) para que los cambios se reflejen; sin provider, usa el
  valor default del contexto (lee `localStorage` una sola vez).
- Rango configurado en `src/config/constants.ts`: `FONT_SIZE_MIN` (12),
  `FONT_SIZE_MAX` (24), `FONT_SIZE_DEFAULT` (16).
- Persiste en `localStorage` bajo `FONT_SIZE_STORAGE_KEY` ("appFontSize").

## 💡 Ejemplo

```tsx
import { useFontSizeOption } from "../../hooks/ui/useFontSizeOption";

function FontSizeSlider() {
  const { fontSize, setFontSize } = useFontSizeOption();

  return (
    <Slider
      value={fontSize}
      min={FONT_SIZE_MIN}
      max={FONT_SIZE_MAX}
      onChange={(_e, value) => setFontSize(Array.isArray(value) ? value[0] : value)}
    />
  );
}
```

## Tests

- `src/hooks/ui/test/useFontSizeOption.test.ts`
- `src/modules/shared/test/SettingsModal/AppearanceFontSizeSection.test.tsx`
