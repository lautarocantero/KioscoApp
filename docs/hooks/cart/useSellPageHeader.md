# 🪝 `useSellPageHeader`

> Datos de contexto para el header de `/new-sell`.

## 🎯 ¿Para qué sirve?

Arma los tres datos que muestra `SellPageHeader` (título "Nueva venta" con subtítulo):

- `kioscoName` — nombre del kiosco activo (`useActiveKiosco`).
- `sellerName` — nombre del usuario logueado (`state.auth.name`).
- `dateLabel` — fecha/hora actual formateada (`formatSellHeaderDate`), refrescada cada 60s.

## 📦 Firma

```ts
useSellPageHeader(): { kioscoName: string; sellerName: string; dateLabel: string }
```

## 💡 Ejemplo

```tsx
const CatalogHeader = () => {
  const pageHeader = useSellPageHeader();
  return <SellPageHeader {...pageHeader} />;
};
```
