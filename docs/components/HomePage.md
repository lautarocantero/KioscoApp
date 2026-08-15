# HomePage — Documentación

## ¿Para qué sirve?

Página de inicio de la app (`/`). Saluda al usuario y muestra el menú principal de opciones (vender, productos, presentaciones, etc.), reutilizando el mismo sistema de tarjetas que el resto de los menús (ver [docs/components/OptionsList.md](./OptionsList.md)).

## Props

Ninguna — no recibe parámetros. Es el punto de entrada de la ruta `/`.

## Ejemplo de uso

```tsx
// src/router/AppRouter.tsx
<Route path="/" element={<HomePage />} />
```

Internamente:

```tsx
const links = useHomePageLinks();

<DisplayOptions title="¿Qué deseas hacer?" links={links} disconnect greetings="¡Hola! 👋" />
```

## Detalles de implementación

- Toda la lógica de armado de links vive en el hook `useHomePageLinks` (`src/hooks/shared/useLinksData.ts`); el componente en sí es puramente presentacional.
- `disconnect` habilita el botón de cerrar sesión dentro de `DisplayOptions`/`AppLayout`.
- Delega el layout completo (header, saludo, grilla de tarjetas) a `DisplayOptions`, que a su vez usa `AppLayout` (landmark `<main>` incluido).

## Tests

`src/modules/app/test/HomePage.test.tsx`
