import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CartBagAnimationPhase } from "@typings/cart/cartEnums";
import type { UseCartClearAnimationReturn } from "@typings/cart/cartTypes";

const GRAB_DURATION_MS = 380;
const LIFT_DURATION_MS = 520;
const BACK_SNAP_DELAY_MS = 20;
const BACK_DURATION_MS = 500;

const HAND_HIDDEN_TRANSFORM = "translate(220px, -310px) rotate(14deg)";
const HAND_VISIBLE_TRANSFORM = "translate(0px, 0px) rotate(0deg)";
const HANDLES_SQUEEZE_TRANSFORM = "scaleY(0.9) scaleX(0.97)";
const BAG_LIFT_TRANSFORM = "translate(210px, -880px) rotate(9deg)";
const BAG_DROP_START_TRANSFORM = "translate(40px, -700px) rotate(6deg)";

// Anima "la mano agarra la bolsa" al vaciar el carrito o al confirmar una
// venta: la mano aparece y las asas se aprietan (grab), la bolsa sale de
// cuadro junto con la mano (lift) — recién ahí dispara el vaciado real
// (onCleared) —, y vuelve a caer ya vacía (back) antes de volver a reposo.
export const useCartClearAnimation = (): UseCartClearAnimationReturn => {
    const [phase, setPhase] = useState<CartBagAnimationPhase>(CartBagAnimationPhase.Idle);
    const [isBackSnapped, setIsBackSnapped] = useState<boolean>(false);
    const phaseRef = useRef<CartBagAnimationPhase>(CartBagAnimationPhase.Idle);
    const timeoutIdsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    const clearPendingTimeouts = useCallback((): void => {
        timeoutIdsRef.current.forEach(clearTimeout);
        timeoutIdsRef.current = [];
    }, []);

    useEffect(() => clearPendingTimeouts, [clearPendingTimeouts]);

    const after = useCallback((ms: number, fn: () => void): void => {
        timeoutIdsRef.current.push(setTimeout(fn, ms));
    }, []);

    const runBagAnimation = useCallback((onCleared: () => void): void => {
        if (phaseRef.current !== CartBagAnimationPhase.Idle) return;

        phaseRef.current = CartBagAnimationPhase.Grab;
        setPhase(CartBagAnimationPhase.Grab);

        after(GRAB_DURATION_MS, () => {
            phaseRef.current = CartBagAnimationPhase.Lift;
            setPhase(CartBagAnimationPhase.Lift);

            after(LIFT_DURATION_MS, () => {
                onCleared();
                phaseRef.current = CartBagAnimationPhase.Back;
                setPhase(CartBagAnimationPhase.Back);
                setIsBackSnapped(true);

                after(BACK_SNAP_DELAY_MS, () => {
                    setIsBackSnapped(false);

                    after(BACK_DURATION_MS, () => {
                        phaseRef.current = CartBagAnimationPhase.Idle;
                        setPhase(CartBagAnimationPhase.Idle);
                    });
                });
            });
        });
    }, [after]);

    const bagStyle = useMemo((): UseCartClearAnimationReturn['bagStyle'] => {
        if (phase === CartBagAnimationPhase.Lift) {
            return { transform: BAG_LIFT_TRANSFORM, opacity: 0.25, transitionDuration: `${LIFT_DURATION_MS}ms` };
        }
        if (phase === CartBagAnimationPhase.Back && isBackSnapped) {
            return { transform: BAG_DROP_START_TRANSFORM, opacity: 0, transitionDuration: "0s" };
        }
        if (phase === CartBagAnimationPhase.Back) {
            return { transform: "none", opacity: 1, transitionDuration: `${BACK_DURATION_MS}ms` };
        }
        return { transform: "none", opacity: 1, transitionDuration: "0s" };
    }, [phase, isBackSnapped]);

    const handStyle = useMemo((): UseCartClearAnimationReturn['handStyle'] => {
        const isVisible = phase === CartBagAnimationPhase.Grab || phase === CartBagAnimationPhase.Lift;
        return isVisible
            ? { transform: HAND_VISIBLE_TRANSFORM, opacity: 1 }
            : { transform: HAND_HIDDEN_TRANSFORM, opacity: 0 };
    }, [phase]);

    const handlesStyle = useMemo((): UseCartClearAnimationReturn['handlesStyle'] => {
        const isSqueezed = phase === CartBagAnimationPhase.Grab || phase === CartBagAnimationPhase.Lift;
        return { transform: isSqueezed ? HANDLES_SQUEEZE_TRANSFORM : "none" };
    }, [phase]);

    return {
        phase,
        bagStyle,
        handStyle,
        handlesStyle,
        runBagAnimation,
    };
};

export default useCartClearAnimation;
