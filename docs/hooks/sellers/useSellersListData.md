# 🪝 `useSellersListData`

> Hook de React que trae la lista de vendedores y la devuelve ordenada con los online primero.

## 🎯 ¿Para qué sirve?

Carga los vendedores (`fetchSellersThunk`) y expone la lista lista para pintar en la tabla — ya ordenada, ya con el error del store sincronizado. Es la fuente de datos tanto de la tabla de vendedores (`useSellers`) como de la card del Home (`useSellersLinkData`).

## 📦 Firma

```ts
useSellersListData(): UseSellersListDataReturn
```

```ts
interface UseSellersListDataReturn {
  sellers: Seller[]; // ordenados: online primero
  loading: boolean;
  error: string | null;
  clearError: () => void;
}
```

## 💡 Ejemplo

```ts
import useSellersListData from "../../hooks/sellers/useSellerListData";

const { sellers, loading, error } = useSellersListData();
// sellers ya viene con los online arriba — no hay que ordenar de nuevo
```

## ⚙️ Orden de la lista

```ts
const sortedSellers = useMemo(() => sortSellersOnlineFirst(sellers), [sellers]);
```

Ver [docs/helpers/sortSellersOnlineFirst.md](../../helpers/sortSellersOnlineFirst.md) y
[docs/features/sellerOnlineStatus.md](../../features/sellerOnlineStatus.md) para el detalle
completo de cómo se determina "online" (login/logout en el backend).

## ✨ Beneficios

- 📶 **Un solo lugar resuelve el orden** — ni la tabla ni la card del Home necesitan ordenar por su cuenta.
- 🧠 **`useMemo`** evita reordenar en cada render si `sellers` no cambió.
