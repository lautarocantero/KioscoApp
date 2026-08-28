# `SidebarSectionHeader`

Título + subtítulo de la sección activa, arriba del panel del sidebar.

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `link` | `OptionLink` | El link de la sección activa (`activeLink` de `useAppSidebar`). |

## Comportamiento

Reusa `useLinkCard` (`src/modules/shared/components/OptionsItems/hooks/useLinkCard.ts`, el mismo hook que usa `LinkCard`) para resolver el subtítulo: si `link.useData` existe, muestra el subtítulo con dato real (con skeleton mientras carga); si no, cae al `link.subtitle` estático de `Links.tsx`.

**Importante:** debe montarse con `key={link.url}` desde el padre (`SidebarPanel`). `useLinkCard` llama a un hook distinto según `link.useData` — si esta instancia sobreviviera a un cambio de sección activa sin remontar, rompería las reglas de hooks.

## Ejemplo

```tsx
{activeLink && <SidebarSectionHeader key={activeLink.url} link={activeLink} />}
```
