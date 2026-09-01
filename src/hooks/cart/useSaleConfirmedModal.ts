import { useCallback, useEffect, useRef, useState } from "react";
import type { UseSaleConfirmedModalReturn } from "@typings/cart/cartTypes";

const TICK_MS = 50;

export const useSaleConfirmedModal = (autoCloseMs: number): UseSaleConfirmedModalReturn => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [remaining, setRemaining] = useState<number>(autoCloseMs);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const clear = useCallback((): void => {
        if (!intervalRef.current) return;
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }, []);

    const close = useCallback((): void => {
        clear();
        setIsOpen(false);
        setIsPaused(false);
    }, [clear]);

    const open = useCallback((): void => {
        clear();
        setRemaining(autoCloseMs);
        setIsPaused(false);
        setIsOpen(true);
    }, [autoCloseMs, clear]);

    const pause = useCallback((): void => setIsPaused(true), []);

    const resume = useCallback((): void => setIsPaused(false), []);

    useEffect(() => {
        if (!isOpen || isPaused) return clear;

        intervalRef.current = setInterval(() => {
            setRemaining((previous: number) => {
                const next = previous - TICK_MS;
                if (next > 0) return next;

                clear();
                setIsOpen(false);
                return 0;
            });
        }, TICK_MS);

        return clear;
    }, [isOpen, isPaused, clear]);

    useEffect(() => clear, [clear]);

    return {
        isOpen,
        progress: (remaining / autoCloseMs) * 100,
        remainingSeconds: Math.max(0, Math.ceil(remaining / 1000)),
        isPaused,
        open,
        close,
        pause,
        resume,
    };
};
