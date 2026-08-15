# AccountPage — Documentación

## ¿Para qué sirve?

Página principal del módulo de Cuenta (`/account`). Muestra el menú de opciones ("Editar cuenta" y "Plan de suscripción") reutilizando el mismo sistema de tarjetas que el resto de los menús de la app (ver [docs/components/OptionsList.md](./OptionsList.md)).

## Props

Ninguna — no recibe parámetros. Es el punto de entrada de la ruta `/account`.

## Ejemplo de uso

```tsx
// src/modules/account/AccountRoutes.tsx
<Route path="/account" element={<AccountPage />} />
```

Internamente:

```tsx
const links = useAccountLinks();

<DisplayOptions title="Cuenta" icon={<PersonIcon />} links={links} />
```

## Detalles de implementación

- Toda la lógica de armado de links vive en el hook `useAccountLinks` (`src/hooks/account/useLinksData.ts` — ver [docs/hooks/account/useLinksData.md](../hooks/account/useLinksData.md)); el componente en sí es puramente presentacional.
- Delega el layout completo (header, ícono, grilla de tarjetas, botón volver) a `DisplayOptions`, que a su vez usa `AppLayout` (landmark `<main>` incluido).
- El ícono (`PersonIcon` de MUI) es decorativo y se maneja como `aria-hidden` dentro de `LinkCardIcon`/`OptionsHeader`, sin necesidad de accesibilidad adicional en este archivo.

## Tests

`src/modules/account/test/AccountPage.test.tsx`
