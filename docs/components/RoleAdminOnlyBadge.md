# RoleAdminOnlyBadge — Documentación

## ¿Para qué sirve?

Chip informativo que se muestra arriba del select de "Rol" en el form de edición de vendedor, aclarando que solo un admin puede tocar ese campo. Es puramente presentacional — no recibe props, no tiene lógica.

## Dónde se usa

`SellerFormFirstStep.tsx`, vía `renderBeforeField` de `FormFieldsRenderer`, condicionado por `useSellerFormPermissions(isDetail).showRoleBadge` (se oculta en modo Detalle, se muestra en modo Editar).

## Props

Ninguna — el componente no recibe parámetros.

## Ejemplo de uso

```tsx
import RoleAdminOnlyBadge from "./RoleAdminOnlyBadge";

<FormFieldsRenderer
  // ...
  renderBeforeField={{ rol: <RoleAdminOnlyBadge /> }}
/>
```

## Detalles de implementación

- Usa `Chip` de MUI con `theme.custom.accents.blue` (ningún color hardcodeado).
- El ícono (`InfoOutlinedIcon`) es decorativo; el texto del `Chip` ya transmite toda la información.

## Tests

`src/modules/sellers/test/SellerForm/RoleAdminOnlyBadge.test.tsx` — verifica que el texto se renderiza.
