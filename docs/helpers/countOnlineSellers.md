# `countOnlineSellers` — Documentación

## ¿Para qué sirve?

Función pura que cuenta cuántos vendedores de una lista tienen `user_status: "online"`. Usada para el subtítulo "N en línea" de la card de Vendedores en el Home.

## Firma

```ts
countOnlineSellers<T extends { user_status: SellerStatus }>(sellers: T[]): number
```

## Dónde se usa

`useSellersLinkData` (`hooks/sellers/useSellersLinkData.ts`).

## Ejemplo de uso

```ts
countOnlineSellers([
  { user_status: SellerStatus.Online },
  { user_status: SellerStatus.Offline },
]); // 1
```

## Tests

`src/modules/sellers/test/helpers/countOnlineSellers.test.ts`
