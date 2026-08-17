# 🪝 `useLanguageOption`

> Hook de React que expone y cambia el idioma actual de la app vía `react-i18next`.

## 🎯 ¿Para qué sirve?

Wrapper fino sobre `useTranslation().i18n` para el `<Select>` de Idioma
dentro de Apariencia: expone el idioma resuelto (`LanguageEnum`) y un
setter que cambia el idioma real de i18next y lo persiste en
`localStorage` (`LANGUAGE_STORAGE_KEY`, exportada desde `src/i18n/i18n.ts`).

⚠️ Ver [docs/features/i18n.md](../../features/i18n.md) para el alcance real
de la traducción: solo el modal de Ajustes y un puñado de diccionarios de
labels están traducidos hoy — el resto de la app no cambia de idioma.

## 📦 Firma

```ts
useLanguageOption(): { language: LanguageEnum; setLanguage: (language: LanguageEnum) => void }
```

- No recibe parámetros.
- `language` se deriva de `i18n.resolvedLanguage`.

## 💡 Ejemplo

```tsx
import { useLanguageOption } from "../../hooks/ui/useLanguageOption";
import { LanguageEnum } from "@typings/settings/settingsEnums";

function LanguageSelect() {
  const { language, setLanguage } = useLanguageOption();

  return (
    <Select value={language} onChange={(e) => setLanguage(e.target.value as LanguageEnum)}>
      <MenuItem value={LanguageEnum.Spanish}>Español</MenuItem>
      <MenuItem value={LanguageEnum.English}>English</MenuItem>
    </Select>
  );
}
```

## Tests

`src/hooks/ui/test/useLanguageOption.test.ts` — usa la instancia real de
i18next (no mockeada) y verifica el cambio con `waitFor`, ya que
`i18n.changeLanguage` dispara un evento asíncrono.
