# 🪝 `useAccountEditLinkData` / `useAccountSubscriptionLinkData`

> Hooks de React que exponen el `value`/`subtitle` de cada tarjeta del menú de Cuenta (`/account`).

## 🎯 ¿Para qué sirve?

Mismo patrón que `useProvidersLinkData` (`hooks/providers/useProvidersLinkData.ts`): cada hook adapta datos a la forma `LinkDataResult` que consumen las `LinkCard` del menú de opciones. Hoy ambos devuelven datos **estáticos** (no hay fetch ni store involucrados) porque el backend de cuenta/suscripción todavía no existe.

- `useAccountEditLinkData` — subtitle fijo para la tarjeta "Editar cuenta".
- `useAccountSubscriptionLinkData` — `value` ("Free") y subtitle fijo para la tarjeta "Plan de suscripción".

## 📦 Firma

```ts
useAccountEditLinkData(): LinkDataResult
// { subtitle: "Datos personales y contraseña" }

useAccountSubscriptionLinkData(): LinkDataResult
// { value: "Free", subtitle: "Actualizá tu plan cuando quieras" }
```

- Ninguno de los dos recibe parámetros.
- Ninguno depende de Redux ni hace fetch — son placeholders hasta que exista el backend correspondiente (ver `TODO` en el archivo fuente).

## 💡 Ejemplo

```ts
// hooks/account/useLinksData.ts
import {
  useAccountEditLinkData,
  useAccountSubscriptionLinkData,
} from "./useAccountLinksData";

const dataHooksByUrl: Record<string, () => LinkDataResult> = {
  "/account-edit": useAccountEditLinkData,
  "/account-subscription": useAccountSubscriptionLinkData,
};
```

## Detalles de implementación

- Archivo: `src/hooks/account/useAccountLinksData.ts`.
- Hay un comentario `// TODO: reemplazar por fetch real cuando el backend esté listo` en el archivo — al implementar el fetch real, estos hooks deberían pasar a manejar `isLoading`/`error` como `useProvidersLinkData` o `useSellersLinkData`.

## Tests

`src/hooks/account/test/useAccountLinksData.test.ts`
