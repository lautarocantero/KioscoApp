# 🪝 `useProviderData`

> Hook de React que trae un proveedor por `_id`, evitando refetch si ya está en el store.

## 🎯 ¿Para qué sirve?

Lo consumen las páginas de **detalle** y **edición** de un proveedor. Mismo patrón que `useSellerData` (`hooks/sellers/useSellerData.ts`).

## 📦 Firma

```ts
useProviderData(providerId: string | undefined): UseProviderDataResult
// { providerData: Provider | null; isLoading: boolean; error: string | null }
```

- Si `providerId` es `undefined`, no dispara nada.
- Si `store.provider.currentProvider._id === providerId`, no vuelve a pedirlo — lo lee directo del store.
- Si no está, despacha `fetchProviderByIdThunk(providerId)` y, si trae resultado, lo guarda con `setCurrentProvider`.

## 💡 Ejemplo

```ts
const { providerData, isLoading, error } = useProviderData(provider_id);
if (isLoading) return <ProviderSkeleton />;
if (!providerData) return <EmptyProvider />;
```

## Tests

`src/hooks/providers/test/useProviderData.test.ts`
