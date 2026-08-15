# `getRoleLabel` — Documentación

## ¿Para qué sirve?

Función pura que traduce el valor interno de un rol (`"admin"` / `"seller"`) al label en español que ve el usuario (`"Administrador"` / `"Vendedor"`), usando el mapa `ROLE_LABELS` (`typings/seller/sellerLabels.ts`).

## Firma

```ts
getRoleLabel(role: string): string
```

Si `role` no está en `ROLE_LABELS`, devuelve el valor recibido tal cual (no rompe, es defensivo — el string puede venir directo del backend).

## Dónde se usa

- `SidebarUserInfo.tsx` — label del badge de rol en el sidebar.
- `SellerColumns.tsx` — `valueFormatter` de la columna "Rol" en el listado de vendedores.

## Ejemplo de uso

```ts
import { getRoleLabel } from "modules/shared/helpers/getRoleLabel";

getRoleLabel("admin");  // "Administrador"
getRoleLabel("seller"); // "Vendedor"
getRoleLabel("x");      // "x" (fallback)
```

## Tests

`src/modules/shared/test/helpers/getRoleLabel.test.ts`
