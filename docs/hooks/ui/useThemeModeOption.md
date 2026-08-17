# 🪝 `useThemeModeOption`

> Hook de React que traduce el `ThemeContext` (boolean) a un `ThemeModeEnum` explícito para UI de selección.

## 🎯 ¿Para qué sirve?

`ThemeContext` (`src/theme/ThemeContext.ts`) guarda un boolean (`appTheme: true` = claro) por compatibilidad con `AppTheme.tsx`. Este hook lo expone como `ThemeModeEnum.Light` / `ThemeModeEnum.Dark`, para que componentes de selección (el `<Select>` de Apariencia en el modal de Ajustes, y el switch `LightMode`) trabajen con un valor con nombre en vez de un boolean.

También centraliza el `localStorage.setItem("appTheme", ...)` que antes vivía duplicado dentro de `LightMode.tsx`.

## 📦 Firma

```ts
useThemeModeOption(): { mode: ThemeModeEnum; setMode: (mode: ThemeModeEnum) => void }
```

- No recibe parámetros.
- `mode` se deriva de `useContext(ThemeContext).appTheme`.
- `setMode` actualiza el contexto y persiste la elección en `localStorage` bajo la key `"appTheme"`.

## 💡 Ejemplo

```tsx
import { useThemeModeOption } from "../../hooks/ui/useThemeModeOption";
import { ThemeModeEnum } from "@typings/settings/settingsEnums";

function ModeSelect() {
  const { mode, setMode } = useThemeModeOption();

  return (
    <Select value={mode} onChange={(e) => setMode(e.target.value as ThemeModeEnum)}>
      <MenuItem value={ThemeModeEnum.Light}>Claro</MenuItem>
      <MenuItem value={ThemeModeEnum.Dark}>Oscuro</MenuItem>
    </Select>
  );
}
```

## ✨ Beneficios

- ♻️ **Una sola fuente de verdad** para leer/escribir el modo de tema (usado por `LightMode` y por `AppearanceModeSection`).
- 🧵 **Requiere estar bajo `LightDarkThemeProvider`** para reflejar cambios reales; sin provider usa el valor default del contexto (lee `localStorage` una sola vez).

## Tests

`src/hooks/ui/test/useThemeModeOption.test.ts`
