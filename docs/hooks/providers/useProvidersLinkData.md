# 🪝 `useProvidersLinkData`

> Hook de React que adapta las stats de proveedores al formato que espera la card de "Proveedores" del Home.

## 🎯 ¿Para qué sirve?

Mismo patrón que `useProductsLinkData` (`hooks/products/useProductData.ts`): expone `{ value, isLoading, error }` para que la card de `/providers` en el Home muestre la cantidad total de proveedores. A diferencia de `useSellersLinkData` (que cuenta `sellers.length` del listado ya cargado), este hook usa el endpoint de **stats dedicado** — no depende de que el listado completo esté cargado.

## 📦 Firma

```ts
useProvidersLinkData(): LinkDataResult
```

- No recibe parámetros.
- `value`: `stats.totalProviders`, o `null` mientras no haya stats en el store.
- Si `store.provider.stats` ya tiene datos, no vuelve a pedirlos.

## 💡 Ejemplo

```ts
// hooks/shared/useLinksData.ts
import { useProvidersLinkData } from "../providers/useProvidersLinkData";

const dataHooksByUrl: Record<string, () => LinkDataResult> = {
  "/providers": useProvidersLinkData,
  // ...
};
```

## Tests

`src/hooks/providers/test/useProvidersLinkData.test.ts`
