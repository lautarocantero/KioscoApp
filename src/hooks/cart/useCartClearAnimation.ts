import { useCallback, useEffect, useRef, useState } from "react";
import type { UseCartClearAnimationReturn } from "@typings/cart/cartTypes";

const OUT_TRANSITION = "0.34s";
const OUT_DURATION_MS = 340;
const IN_TRANSITION = "0.42s";
const IN_DURATION_MS = 420;
const OFFSCREEN_TRANSLATE_PX = 480;

// Anima la "bolsa" al vaciar el carrito: sale deslizándose hacia la derecha,
// recién ahí dispara el vaciado real (onClear), y vuelve a entrar vacía
// desde el mismo lado — como si la hubieran reemplazado.
export const useCartClearAnimation = (onClear: () => void): UseCartClearAnimationReturn => {
    const [translateX, setTranslateX] = useState<number>(0);
    const [opacity, setOpacity] = useState<number>(1);
    const [transitionDuration, setTransitionDuration] = useState<string>("0s");
    const isAnimatingRef = useRef<boolean>(false);
    const timeoutIdsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    const clearPendingTimeouts = useCallback((): void => {
        timeoutIdsRef.current.forEach(clearTimeout);
        timeoutIdsRef.current = [];
    }, []);

    useEffect(() => clearPendingTimeouts, [clearPendingTimeouts]);

    const triggerClear = useCallback((): void => {
        if (isAnimatingRef.current) return;
        isAnimatingRef.current = true;

        setTransitionDuration(OUT_TRANSITION);
        setTranslateX(OFFSCREEN_TRANSLATE_PX);
        setOpacity(0);

        const outTimeoutId = setTimeout(() => {
            onClear();
            setTransitionDuration(IN_TRANSITION);
            setTranslateX(0);
            setOpacity(1);

            const inTimeoutId = setTimeout(() => {
                setTransitionDuration("0s");
                isAnimatingRef.current = false;
            }, IN_DURATION_MS);
            timeoutIdsRef.current.push(inTimeoutId);
        }, OUT_DURATION_MS);
        timeoutIdsRef.current.push(outTimeoutId);
    }, [onClear]);

    return {
        bagStyle: {
            transform: `translateX(${translateX}px)`,
            opacity,
            transitionDuration,
        },
        triggerClear,
    };
};

export default useCartClearAnimation;
