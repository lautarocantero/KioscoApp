# 🎨 Theme (`src/theme/mainTheme.ts`) — Documentación

## ¿Para qué sirve?

Define `darkTheme`/`lightTheme` (MUI `createTheme`) y extiende el tipo `Theme` de MUI con un objeto `custom` — el único lugar permitido para colores/tokens del proyecto (regla del proyecto: prohibido inventar hex ad-hoc fuera del theme).

## Tipografía compartida

`typography` se define **una sola vez** y se reusa en ambos `createTheme` — antes `lightTheme`/`darkTheme` tenían tamaños distintos en `h5`/`body1`/`body2`, lo que hacía que el layout se corriera al cambiar de tema. `fontFamily: 'Montserrat'`.

## `theme.custom` — grupos de tokens

| Grupo | Tokens | Uso típico |
|---|---|---|
| main | `lightMain`, `darkMain` | acento primario alternativo |
| secondary | `lightSecondary`, `darkSecondary` | acento secundario alternativo |
| error | `errorLight`, `errorDark` | variantes de error fuera de `palette.error` |
| background | `lightBackground`, `background`, `darkBackground` | superficies (page, card, card elevada) |
| fonts | `fontColor`, `translucidFontColor` | texto principal y texto atenuado |
| white | `white`, `darkWhite`, `translucidWhite` | texto/íconos sobre fondos oscuros; `darkWhite` = texto secundario |
| gray | `lightGray`, `darkGray` | botones secundarios / bordes |
| black | `black`, `darkblack`, `blackTranslucid` | superficies oscuras / overlays |
| `accents` | `violet`, `pink`, `green`, `blue`, `orange`, `gold` | metadata categórica (sku/model_type/model_size en presentations, rotación de color en [KioscoCard](../components/KioscoCard.md) vía [`getKioscoAccentColor`](../helpers/getKioscoAccentColor.md)) |
| `adminBadge` | `gradientStart/Mid/End`, `textColor`, `shadowRing`, `shadowGlow` | gradiente + sombras del badge de admin |

`palette.warning.main` y `palette.error.main` comparten el mismo valor hex en ambos temas (son indistinguibles visualmente) — donde hace falta diferenciar severidad se usa `theme.custom.accents.gold` en su lugar (ver nota en [docs/features/shopDashboard.md](shopDashboard.md)).

## Ejemplo de uso

```tsx
sx={(theme: Theme) => ({
  backgroundColor: theme.custom.blackTranslucid,
  borderColor: theme.custom.darkGray,
  color: theme.custom.fontColor,
})}
```

## Ver también

- [useThemeModeOption](../hooks/ui/useThemeModeOption.md) — toggle claro/oscuro.
- [getKioscoAccentColor](../helpers/getKioscoAccentColor.md) — ejemplo de consumo de `theme.custom.accents`.
