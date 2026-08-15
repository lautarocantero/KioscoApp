# 🪝 `useAccountLinks`

> Hook de React que arma el array de `OptionLink` para el menú de Cuenta (`/account`).

## 🎯 ¿Para qué sirve?

Toma `AccountNavLinks` (`src/config/Links.tsx`) y le agrega a cada link el hook de datos (`useData`) que le corresponde según su `url`, para que `DisplayOptions`/`LinkCard` puedan mostrar `value`/`subtitle` dinámicos. Mismo patrón que `useHomePageLinks` (`hooks/shared/useLinksData.ts`) y `useSidebarLinks`, pero acotado a las dos rutas de cuenta.

## 📦 Firma

```ts
useAccountLinks(): OptionLink[]
```

- No recibe parámetros.
- Por cada elemento de `AccountNavLinks`, devuelve `{ ...link, useData }`, donde `useData` sale de un diccionario interno (`dataHooksByUrl`) que mapea:
  - `/account-edit` → `useAccountEditLinkData`
  - `/account-subscription` → `useAccountSubscriptionLinkData`
- Si en el futuro se agrega un link a `AccountNavLinks` sin entrada en `dataHooksByUrl`, ese link queda con `useData: undefined` (la card se renderiza igual, solo sin `value`/`subtitle` dinámico).

## 💡 Ejemplo

```tsx
// modules/account/pages/AccountPage.tsx
const links = useAccountLinks();

<DisplayOptions title="Cuenta" icon={<PersonIcon />} links={links} />
```

## Tests

`src/hooks/account/test/useLinksData.test.ts`
