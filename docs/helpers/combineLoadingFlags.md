# `combineLoadingFlags` — Documentación

## ¿Para qué sirve?

Pliega varios flags de carga booleanos e independientes (uno por widget/hook de una página tipo dashboard) en un único boolean. Se usa para alimentar `useInitialPageLoading` cuando una pantalla necesita esperar a que *todos* sus fetches iniciales resuelvan antes de revelarse (por ejemplo `/shop`, con varios widgets que cargan datos por separado).

## Firma

```ts
combineLoadingFlags(...flags: boolean[]): boolean
```

Devuelve `true` si al menos uno de los flags recibidos es `true` (equivalente a un OR de todos ellos). Con cero flags devuelve `false`.

## Ejemplo de uso

```ts
import { combineLoadingFlags } from "modules/shared/helpers/combineLoadingFlags";
import { useInitialPageLoading } from "@hooks/ui/useInitialPageLoading";

const { isLoading: sellsLoading } = useShopSalesSummary();
const { isLoading: inventoryLoading } = useShopInventorySummary();

const isPageLoading = useInitialPageLoading(combineLoadingFlags(sellsLoading, inventoryLoading));
```

## Tests

`src/modules/shared/test/helpers/combineLoadingFlags.test.ts`

## Ver también

- [`useInitialPageLoading`](../hooks/ui/useInitialPageLoading.md)
- [`LoadingScreen`](../components/LoadingScreen.md)
