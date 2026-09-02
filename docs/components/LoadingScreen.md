# `LoadingScreen` — Documentación

## ¿Para qué sirve?

Pantalla de carga a pantalla completa que reemplaza (no superpone) el contenido de una página mientras su/sus fetch(es) inicial(es) siguen en curso. Es la herramienta principal de carga de la app: los skeletons existentes (`ProductSkeleton`, `SellDetailSkeleton`, etc.) siguen en el código, pero quedan reservados para refetches en pantallas que ya se mostraron (cambiar de kiosco, guardar y refrescar, filtrar una lista) — nunca para el primer render. Ver [`useInitialPageLoading`](../hooks/ui/useInitialPageLoading.md), que es quien decide *cuándo* mostrarlo.

## Props (`LoadingScreenProps`)

```ts
export interface LoadingScreenProps {
    label?: string;
}
```

- `label` (opcional): texto mostrado y usado como `aria-label` (por ejemplo `"Cargando productos..."`). Si no se pasa, usa `"Cargando..."`.
- `fullViewport` (opcional, default `true`): controla si ocupa el viewport completo como `<main>` (páginas que gatean reemplazando toda su `AppLayout`, ej. `/shop`, `/products`, `AppRouter`) o si ocupa solo el alto disponible de su contenedor como `<div>` (`fullViewport={false}`, usado dentro de los 5 dominios "form" — `ProductForm`, `SellForm`, `ProviderForm`, `SellerForm`, `PresentationForm` — donde el early return vive anidado dentro de un `<AppLayout>` que la página ya renderizó; forzar `<main>`+`100vh` ahí duplicaría el `<main>` semántico de `AppLayout`).

## Comportamiento

- No es un `Modal`/`Backdrop`: se usa como reemplazo de subtree vía early return (`if (isPageLoading) return <LoadingScreen/>;`), así que nunca queda montado encima de contenido interactivo — no necesita manejo de foco.
- Animación de relleno **determinada, de una sola pasada**: la bolsa se "llena" de violeta de abajo hacia arriba a la velocidad real de [`useLoadingScreenProgress`](../hooks/ui/useLoadingScreenProgress.md) (no es un loop CSS que se repite cada tantos segundos sin relación con cuánto tarda el fetch). El bobbing del ícono y los tres puntos siguen siendo loops CSS ambientales — no representan progreso, solo dan sensación de "vivo".
- Colores tomados del theme (`theme.custom.background`, `theme.palette.primary.main`, `theme.custom.darkWhite`) — nada de hex hardcodeado, así que se ve correcto en modo claro y oscuro sin cambios.
- La imagen usada es `images/logo/Stocko-mascotCircle.png` (vía [`getPublicAssetUrl`](../helpers/getPublicAssetUrl.md)): la mascota saludando, ya compuesta dentro de una insignia circular a pantalla completa (a diferencia de `stocko-mascot.png`, que es la mascota "suelta" sin fondo circular, o de `StocoLogoCircle.png`, la variante estática con el `$` sin saludo) — es lo que hace que el efecto de relleno con `clip-path` se vea como una bolsa "llenándose" dentro del círculo en vez de un recorte arbitrario sobre una silueta libre.
- Ambas capas de imagen son decorativas (`alt=""` + `aria-hidden="true"`); el mensaje accesible lo da `role="progressbar"` + `aria-valuenow`/`aria-valuemin`/`aria-valuemax` + `aria-label` del contenedor raíz (sin `aria-live`: el rol `progressbar` ya tiene semántica propia para que un lector de pantalla sondee el valor, y anunciar cada actualización sería spam).

## Ejemplo de uso

```tsx
import LoadingScreen from "modules/shared/components/LoadingScreen/LoadingScreen";
import { useInitialPageLoading } from "@hooks/ui/useInitialPageLoading";

const ProductDetailForm = ({ productId }: ProductDetailFormProps) => {
    const { productData, isLoading } = useProductData(productId);
    const isPageLoading = useInitialPageLoading(isLoading, productId);

    if (isPageLoading) return <LoadingScreen label="Cargando producto..." />;
    if (!productData) return <EmptyProduct />;

    return <ProductDetailView product={productData} />;
};
```

## Ver también

- [`useInitialPageLoading`](../hooks/ui/useInitialPageLoading.md)
- [`useLoadingScreenProgress`](../hooks/ui/useLoadingScreenProgress.md)
- [`combineLoadingFlags`](../helpers/combineLoadingFlags.md)
- [`getPublicAssetUrl`](../helpers/getPublicAssetUrl.md)

## Tests

`src/modules/shared/test/LoadingScreen/LoadingScreen.test.tsx`
