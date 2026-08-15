# SellerStatusIndicator — Documentación

## ¿Para qué sirve?

Componente presentacional (punto de color + texto) que muestra si un vendedor está online u offline. Es la columna "Estado" de la tabla de vendedores.

## Props (`SellerStatusIndicatorProps`)

| Prop | Tipo | Descripción |
|---|---|---|
| `status` | `SellerStatus` | `"online"` o `"offline"` |

## Ejemplo de uso

```tsx
<SellerStatusIndicator status={seller.user_status} />
```

## Detalles de implementación

- El punto de color usa `theme.custom.accents.green` (online) / `theme.custom.lightGray` (offline) — ningún color hardcodeado.
- El punto es `aria-hidden` (decorativo); el texto (`STATUS_LABELS`) ya transmite el estado.
- El contenedor tiene `role="status"` para que un lector de pantalla lo anuncie como información de estado.

## Tests

`src/modules/sellers/test/SellersList/SellerStatusIndicator.test.tsx`
