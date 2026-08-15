# `sortSellersOnlineFirst` — Documentación

## ¿Para qué sirve?

Función pura que ordena un array de vendedores dejando primero a los que tienen `user_status: "online"`. Es la lógica que le da al listado de vendedores el orden "online primero" — ver [docs/features/sellerOnlineStatus.md](../features/sellerOnlineStatus.md).

## Firma

```ts
sortSellersOnlineFirst<T extends { user_status: SellerStatus }>(sellers: T[]): T[]
```

- Genérico sobre cualquier objeto con `user_status` (`Seller`, `SellerWithRole`).
- No muta el array recibido — devuelve uno nuevo.
- `Array.prototype.sort` es estable desde ES2019, así que dentro de cada grupo (online / offline) se conserva el orden que traía la lista original.

## Dónde se usa

`useSellersListData` (`hooks/sellers/useSellerListData.ts`) — se aplica antes de devolver `sellers`, así que **toda la UI que consume ese hook** (tabla de vendedores, card del Home) ya recibe la lista ordenada, sin tener que ordenar de nuevo en cada lugar.

## Ejemplo de uso

```ts
const sorted = sortSellersOnlineFirst(sellers);
// [online1, online2, offline1, offline2, ...]
```

## Tests

`src/modules/sellers/test/helpers/sortSellersOnlineFirst.test.ts`
