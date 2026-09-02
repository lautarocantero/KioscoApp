# 🪝 `useInitialPageLoading`

> Hook de React que decide si una pantalla debe mostrar el `LoadingScreen` global durante su carga inicial.

## 🎯 ¿Para qué sirve?

Traduce el/los flag(s) `isLoading` de los hooks de datos existentes en un único boolean pensado para gatear el primer render de una página completa: arranca en `true`, pasa a `false` en cuanto el fetch inicial resuelve, y a partir de ahí **queda latcheado en `false` para siempre**, sin importar cuántas veces `isLoading` vuelva a `true` después (cambio de kiosco, guardar-y-refetch, refrescar una lista, etc.). Ninguno de los hooks de datos existentes necesita cambios — este hook envuelve su `isLoading` desde afuera.

## 📦 Firma

```ts
useInitialPageLoading(isLoading: boolean, resetKey?: string | number | null): boolean
```

- `isLoading`: el flag (o el resultado de `combineLoadingFlags(...)` si la página combina varios widgets) que indica si el fetch inicial sigue en curso.
- `resetKey` (opcional): identifica la "entidad" que se está cargando. Se usa en páginas de detalle/edición con ruta param (`/product/:product_id`, `/sell/:sell_id`, etc.) donde el componente **no se desmonta** al navegar de una entidad a otra — pasando `productId`/`sellId`/etc. como `resetKey`, el hook se re-arma a `true` cada vez que cambia, mostrando de nuevo el `LoadingScreen` para la nueva entidad, sin volver a mostrarlo si esa misma entidad se refetchea (por ejemplo tras guardar).
- Devuelve `true` mientras la pantalla debe seguir tapada por `<LoadingScreen/>`.

## ⏱️ Por qué el primer chequeo se difiere

La mayoría de los slices de Redux de este proyecto arrancan con `isLoading: false` y recién lo cambian a `true` un commit después, dentro del propio `useEffect` del hook de datos (ver `useProductData`, `useKioscoSelector`, etc.). Si este hook resolviera apenas ve `isLoading=false` en el primer render, el `LoadingScreen` se cerraría antes de que el fetch real hubiera arrancado — y como el resultado queda latcheado, ese cierre sería permanente para toda la vida del componente. Por eso el primer chequeo se difiere un tick (via `setTimeout`): si en ese tick `isLoading` pasó a `true`, el hook espera a que vuelva a `false` (mediante un segundo `useEffect` que observa `isLoading` directamente); si nada se disparó (dato ya cacheado, nada para cargar), resuelve igual, así la pantalla no se queda esperando para siempre.

⚠️ **A propósito de por qué son dos `useEffect` separados y no uno fusionado**: cada efecto es autocontenido (no decide su comportamiento comparando/mutando una ref compartida entre ambos), así que son naturalmente idempotentes ante el doble-invoke de `<StrictMode>` en dev (React monta cada componente dos veces — `setup→cleanup→setup` — para detectar efectos impuros). Una versión intermedia de este hook fusionaba ambas responsabilidades en un solo efecto que detectaba "cambió `resetKey`" comparando contra una ref mutada dentro del propio efecto; bajo `StrictMode` esa ref quedaba mutada por la pasada de montaje que React descarta, así que la pasada real veía "sin cambios" y se saltaba el chequeo diferido — el `LoadingScreen` se cerraba antes de que el fetch arrancara y se veía el skeleton de siempre en su lugar (bug real, reportado en `/new-sell`). El test `useInitialPageLoading.test.ts` monta explícitamente dentro de `<StrictMode>` para que esta clase de regresión se detecte ahí, no en el navegador.

## 💡 Ejemplo

```tsx
import { useInitialPageLoading } from "@hooks/ui/useInitialPageLoading";
import LoadingScreen from "modules/shared/components/LoadingScreen/LoadingScreen";

const ProductDetailForm = ({ productId }: ProductDetailFormProps) => {
    const { productData, isLoading: isLoadingEntity } = useProductData(productId);
    const isPageLoading = useInitialPageLoading(isLoadingEntity, productId);

    if (isPageLoading) return <LoadingScreen label="Cargando producto..." />;
    if (!productData) return <EmptyProduct />;

    return <ProductDetailView product={productData} />;
};
```

## ✨ Beneficios

- 🚪 **Un solo punto de decisión** para "¿muestro el LoadingScreen o no?", reutilizable en toda página con fetch.
- 🔁 **No reaparece en refetches** de una pantalla ya visible (requisito explícito del feature de LoadingScreen global).
- 🔑 **`resetKey` cubre rutas param-driven** sin tener que tocar los hooks de datos existentes.
- 🧯 **Evita el parpadeo** de contenido vacío que hoy sufren los early-return de skeleton (`if (isLoading) return <Skeleton/>`) por el mismo motivo del "primer chequeo diferido".

## Tests

`src/hooks/ui/test/useInitialPageLoading.test.ts`

## Ver también

- [`combineLoadingFlags`](../../helpers/combineLoadingFlags.md)
- [`LoadingScreen`](../../components/LoadingScreen.md)
