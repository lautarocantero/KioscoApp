import { useEffect, useRef, useState } from "react";

// La mayoría de los slices arrancan con isLoading=false y recién lo pasan
// a true un commit después, dentro del propio useEffect del hook de datos
// (ver ProductForm.tsx/useProductData). Si este hook resolviera apenas ve
// isLoading=false, el LoadingScreen se cerraría antes de que el fetch real
// hubiera arrancado — y como el resultado queda latcheado (no vuelve a
// mostrarse en refetches posteriores), ese cierre prematuro sería
// permanente. Por eso, cada vez que se "arma" (al montar o al cambiar
// resetKey), el primer chequeo se difiere un tick: le da tiempo al fetch a
// arrancar antes de confiar en el valor de isLoading. Si nada se dispara en
// ese tick (dato ya cacheado, nada para cargar), resuelve igual — no se
// queda esperando para siempre.
const FIRST_CHECK_DELAY_MS = 0;

export const useInitialPageLoading = (
    isLoading: boolean,
    resetKey: string | number | null = null
): boolean => {
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    // Ref "latest value" asignada directo en el render (no en un efecto):
    // es el patrón estándar para que un callback async (el setTimeout de
    // abajo) pueda leer el isLoading más reciente sin depender de closures
    // viejas. Asignar en cada render es idempotente, así que es inmune al
    // doble-render de StrictMode en dev.
    const isLoadingRef = useRef(isLoading);
    isLoadingRef.current = isLoading;

    // Dos efectos separados, CADA UNO con su propia lógica autocontenida
    // (ninguno decide su comportamiento comparando/mutando una ref
    // compartida) — así ambos son naturalmente idempotentes ante el
    // doble-invoke de StrictMode en dev (setup→cleanup→setup no cambia
    // el resultado final, cada instancia hace lo mismo sin importar
    // cuántas veces se la invoque). Una versión anterior usaba una ref
    // "armedKeyRef" comparada-y-mutada dentro del efecto para detectar
    // el cambio de resetKey; bajo StrictMode esa ref quedaba mutada por
    // la pasada de montaje descartada, así que la pasada real veía
    // "resetKey sin cambios" y resolvía de inmediato sin el chequeo
    // diferido — el LoadingScreen desaparecía antes de que el fetch
    // arrancara y se veía el skeleton en su lugar. Ver
    // useInitialPageLoading.test.tsx (caso StrictMode) para el repro.
    //
    // Declarado ANTES que el efecto de `resetKey` a propósito: dentro del
    // mismo commit (montaje o cambio de resetKey), React corre los efectos
    // en orden de declaración y aplica los setState de ese flush en orden
    // — el de resetKey corre después y su setIsInitialLoading(true) es el
    // que gana esa tanda, pisando un eventual `false` prematuro de este.
    useEffect(() => {
        if (isLoading) return;
        setIsInitialLoading(false);
    }, [isLoading]);

    useEffect(() => {
        setIsInitialLoading(true);

        const timeoutId = setTimeout(() => {
            if (isLoadingRef.current) return;
            setIsInitialLoading(false);
        }, FIRST_CHECK_DELAY_MS);

        return () => clearTimeout(timeoutId);
    }, [resetKey]);

    return isInitialLoading;
};
