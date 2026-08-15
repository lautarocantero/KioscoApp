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
- `subtitle`: `"N en línea"` — **mockeado a 0** hasta que exista tracking real de conexión (`TODO(online-status)` en el código).

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

## 🚧 Pendiente

El conteo de "en línea" está hardcodeado en 0 — falta implementar el tracking real de conexión de vendedores.
