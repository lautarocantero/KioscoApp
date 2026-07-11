import { useCallback, useMemo, useRef, useState } from "react";
import type { CardCarouselItem, UseCardCarouselParams } from "@typings/ui/cardCarousel";
import { DRAG_THRESHOLD_PX } from "../../config/constants";


export const useCardCarousel = ({
    items,
    defaultCardWidth = 620,
    gap = 24,
    activeIndex: controlledIndex,
    onIndexChange,
    hintText,
}: UseCardCarouselParams) => {
    const [internalIndex, setInternalIndex] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const dragRef = useRef({ startX: 0, dragging: false, deltaPx: 0 });

    const isControlled = controlledIndex !== undefined;
    const activeIndex = isControlled ? controlledIndex : internalIndex;
    const total = items.length;

    const widths = useMemo(
        () => items.map((item: CardCarouselItem) => item.width ?? defaultCardWidth),
        [items, defaultCardWidth]
    );

    // offsets[i] = distancia acumulada desde x=0 hasta el borde izquierdo de la card i.
    const offsets = useMemo(() => {
        const acc: number[] = [];
        let running = 0;
        widths.forEach((w) => {
            acc.push(running);
            running += w + gap;
        });
        return acc;
    }, [widths, gap]);

    const goTo = useCallback(
        (index: number) => {
            const clamped = Math.max(0, Math.min(total - 1, index));
            if (!isControlled) setInternalIndex(clamped);
            onIndexChange?.(clamped);
        },
        [isControlled, onIndexChange, total]
    );

    const handlePointerDown = useCallback(
        (e: React.PointerEvent) => {
            if (total <= 1) return;
            dragRef.current = { startX: e.clientX, dragging: true, deltaPx: 0 };
        },
        [total]
    );

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!dragRef.current.dragging) return;
        const delta = e.clientX - dragRef.current.startX;
        dragRef.current.deltaPx = delta;
        setDragOffset(delta);
    }, []);

    const handlePointerUp = useCallback(() => {
        if (!dragRef.current.dragging) return;
        const delta = dragRef.current.deltaPx;

        if (delta < -DRAG_THRESHOLD_PX && activeIndex < total - 1) goTo(activeIndex + 1);
        else if (delta > DRAG_THRESHOLD_PX && activeIndex > 0) goTo(activeIndex - 1);

        dragRef.current.dragging = false;
        dragRef.current.deltaPx = 0;
        setDragOffset(0);
    }, [activeIndex, total, goTo]);

    // La card activa siempre arranca en x=0 del viewport (su offset acumulado se resta del track).
    const translateX = -offsets[activeIndex] + dragOffset;
    const activeWidth = widths[activeIndex];
    const isDragging = dragRef.current.dragging;

    const resolvedHint = typeof hintText === "function" ? hintText(activeIndex, total) : hintText;

    return {
        activeIndex,
        total,
        widths,
        translateX,
        activeWidth,
        isDragging,
        resolvedHint,
        goTo,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
    };
};