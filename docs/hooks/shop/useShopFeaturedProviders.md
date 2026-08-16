# 🪝 `useShopFeaturedProviders`

> Hook de React que recorta el listado real de proveedores a los primeros 5 para la tarjeta "Proveedores destacados" de `/shop`.

## 🎯 ¿Para qué sirve?

Reusa `useProvidersListData` (ya resuelto para `/providers`) y expone solo los primeros N junto con el total real. `Provider` solo tiene `name`, `valoration` (1 a 5) y contacto — no hay campo de "cantidad de productos" ni "estado" (Activo/Principal/etc.) en el backend, así que la card de `/shop` no los muestra (ver [docs/features/shopDashboard.md](../features/shopDashboard.md)).

## 📦 Firma

```ts
useShopFeaturedProviders(): {
  featured: Provider[];
  total: number;
  isLoading: boolean;
  error: string | null;
}
```

## 💡 Ejemplo

```tsx
const { featured, total, isLoading, error } = useShopFeaturedProviders();
<ShopTopProviders featured={featured} total={total} isLoading={isLoading} error={error} />
```

## ✨ Beneficios

- 🔁 **Reusa `useProvidersListData`** en vez de otro fetch — mismo dato que ve `/providers`.
- 🧩 El recorte a "top 5" vive en el hook (con `useMemo`), no en el `.tsx`.
