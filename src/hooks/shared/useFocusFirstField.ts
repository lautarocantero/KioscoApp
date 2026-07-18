import { useEffect, useRef } from "react";

export function useFocusFirstField<T extends HTMLElement = HTMLInputElement>(
    firstFieldKey: string | number | undefined,
    disabled = false,
) {
    const firstFieldRef = useRef<T>(null);

    useEffect(() => {
        if (disabled) return;

        // pequeño delay para asegurar que el DOM del nuevo step ya montó
        const timeoutId = setTimeout(() => {
            firstFieldRef.current?.focus();
        }, 0);

        return () => clearTimeout(timeoutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstFieldKey, disabled]);

    return firstFieldRef;
}