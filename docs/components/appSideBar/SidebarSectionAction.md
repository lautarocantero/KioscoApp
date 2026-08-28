# `SidebarSectionAction`

CTA único de la sección activa (ex sublink "Crear", ej. "Nuevo producto"). Reemplaza al par `Listado / Crear` del viejo acordeón.

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `action` | `{ label: string; url: string }` | `link.action` del `OptionLink` activo (`src/config/Links.tsx`). |
| `onNavigate` | `(url: string) => void` | Normalmente `navigate` de `useAppSidebar`. |

## Ejemplo

```tsx
{activeLink?.action && <SidebarSectionAction action={activeLink.action} onNavigate={navigate} />}
```
