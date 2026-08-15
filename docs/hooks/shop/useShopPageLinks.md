# 🪝 `useShopPageLinks`

> Hook de React que arma las tarjetas de sección de `/shop` (el nuevo punto de entrada de la app) con datos reales de cada dominio.

## 🎯 ¿Para qué sirve?

`/shop` reemplazó a `/home` como pantalla de inicio: en vez de una lista de links planos, muestra una tarjeta por cada sección existente (Ventas, Productos, Boletas, Vendedores, Proveedores) con un resumen real y el link para navegar ahí.

Este hook parte de `SidebarNavLinks` (`src/config/Links.tsx`) — la misma fuente de verdad que usa el sidebar — y le agrega `useData` a cada link que tiene un hook de estadísticas real.

## 📦 Firma

```ts
useShopPageLinks(): OptionLink[]
```

- No recibe parámetros.
- Excluye "Catalogo" (acceso directo al POS, ya está siempre visible en el sidebar) y "Tienda" (es la propia página en la que estamos).
- Secciones sin fuente de datos real (ej. "Boletas") quedan sin `useData` — la card muestra el `subtitle` estático en vez de inventar un número.

## 💡 Ejemplo

```tsx
// modules/shop/pages/Shop/ShopPage.tsx
import { useShopPageLinks } from "../../../../hooks/shop/useShopPageLinks";
import DisplayOptions from "../../../shared/components/OptionsItems/DisplayOptions";

const ShopPage = () => {
  const links = useShopPageLinks();
  return <DisplayOptions title="Tienda" links={links} disconnect />;
};
```

## ✨ Beneficios

- 🔁 **Reusa los hooks de datos que ya existían** para el viejo Home (`useSellsLinkData`, `useProductsLinkData`, `useProvidersLinkData`, `useSellersLinkData`) — cero mocks nuevos.
- 🧩 **Sigue el mismo contrato `LinkDataResult`/`OptionLink`** que el resto de las cards de la app, así `DisplayOptions`/`LinkCard` no necesitan casos especiales.
- 🗺️ **Una sola fuente de verdad** (`SidebarNavLinks`) entre el sidebar y el dashboard de `/shop`.
