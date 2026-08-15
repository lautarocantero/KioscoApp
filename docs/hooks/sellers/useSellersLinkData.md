# 🪝 `useSellersLinkData`

> Hook de React que adapta los datos de vendedores al formato que espera la card de "Vendedores" del Home.

## 🎯 ¿Para qué sirve?

Mismo patrón que `useProductsLinkData` (`hooks/products/useProductData.ts`): expone `{ value, subtitle, isLoading, error }` para que la card de `/sellers` en el Home muestre la cantidad de vendedores y una sub-info.

## 📦 Firma

```ts
useSellersLinkData(): LinkDataResult
```

- No recibe parámetros.
- `value`: cantidad total de vendedores (`sellers.length`).
- `subtitle`: `"N en línea"` — `N` es real, viene de `countOnlineSellers(sellers)` sobre el `user_status` que persiste el backend (login → online, logout → offline). Ver [docs/features/sellerOnlineStatus.md](../../features/sellerOnlineStatus.md).

## 💡 Ejemplo

```ts
// hooks/shared/useLinksData.ts
import { useSellersLinkData } from "../sellers/useSellersLinkData";

const dataHooksByUrl: Record<string, () => LinkDataResult> = {
  "/sellers": useSellersLinkData,
  // ...
};
```

## ✨ Beneficios

- 🔁 **Reusa `useSellersListData`** en vez de disparar un fetch propio.
- 🧩 **Sigue el mismo contrato** (`LinkDataResult`) que el resto de las cards del Home, así `useLinksData`/`DisplayOptions` no necesitan casos especiales por dominio.
- 🧮 **Reusa `countOnlineSellers`**, el mismo helper que usaría cualquier otro lugar que necesite ese conteo — no hay lógica de "es online" duplicada.

## 🚧 Pendiente

"Online" hoy significa "tiene una sesión activa" (logueado y no deslogueado explícitamente) — no hay heartbeat ni detección de sesión expirada/pestaña cerrada sin logout. Ver la sección de límites conocidos en [docs/features/sellerOnlineStatus.md](../../features/sellerOnlineStatus.md).
