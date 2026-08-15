# 🪝 `useShopStatLinks`

> Hook de React que arma las 4 tarjetas de stats de la fila superior de `/shop`: Ventas, Productos, Vendedores y Proveedores.

## 🎯 ¿Para qué sirve?

Parte de `SidebarNavLinks` (`src/config/Links.tsx`) — misma fuente de verdad que usa el sidebar — y le agrega `useData` a cada link con el hook de stats real ya resuelto para esa sección (mismo patrón que usaba el viejo `HomePage`).

Excluye "Catalogo" (acceso directo al POS), "Tienda" (ya estamos ahí) y "Boletas" (no tiene un número real que mostrar — su acceso vive como botón "Cargar boleta" junto al gráfico de ventas, ver `ShopSalesChart`).

## 📦 Firma

```ts
useShopStatLinks(): OptionLink[]
```

## 💡 Ejemplo

```tsx
// modules/shop/pages/Shop/ShopPage.tsx
const statLinks = useShopStatLinks();
<ShopStatsRow links={statLinks} />
```

## ✨ Beneficios

- 🔁 **Reusa los hooks de datos reales** que ya existían (`useSellsLinkData`, `useProductsLinkData`, `useSellersLinkData`, `useProvidersLinkData`) — cero mocks nuevos.
- 🧩 **Sigue el contrato `OptionLink`/`LinkDataResult`**, así `ShopStatsRow`/`LinkCard` no necesitan casos especiales por dominio.
