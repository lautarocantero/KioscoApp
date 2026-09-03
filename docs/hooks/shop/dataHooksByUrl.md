# 🧩 `dataHooksByUrl`

> Registro compartido url → hook de datos reales. No es un hook de React (no lleva `use` porque no se llama como uno) — es una tabla que `useSidebarNavLinks` consulta para saber qué hook invocar según el link.

## 🎯 ¿Para qué sirve?

Antes lo consumían tanto `useShopStatLinks` (fila de stats de `/shop`, removida en el rediseño a "resumen del día", ver [docs/features/shopDashboard.md](../../features/shopDashboard.md)) como el sidebar. Al quedar un solo consumidor real, se dejó como la fuente de verdad standalone.

## 📦 Firma

```ts
dataHooksByUrl: Record<string, () => LinkDataResult>
```

## 💡 Ejemplo

```ts
// modules/shared/layout/components/appSideBar/hooks/useSidebarNavLinks.ts
import { dataHooksByUrl } from "../../../../../../hooks/shop/dataHooksByUrl";

const useData = dataHooksByUrl[link.url]; // undefined si el link no tiene dato real
```

## ✨ Beneficios

- 🔁 **Una sola fuente de verdad** url → hook de datos reales (`useSellsLinkData`, `useProductsLinkData`, `useProvidersLinkData`, `useSellersLinkData`) — evita que el sidebar y futuras pantallas dupliquen el mapeo.
