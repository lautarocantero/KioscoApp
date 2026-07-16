import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CardCarouselItem, DetailCarouselLayout, UseCardCarouselParams } from "@typings/ui/cardCarousel";
import { DRAG_THRESHOLD_PX, MIN_MOBILE_CARD_WIDTH, MOBILE_SIDE_PADDING } from "../../config/constants";
import { useBreakpoint } from "./useBreakpoint";


export const useCardCarousel = ({
    items,
    defaultCardWidth = 620,
    gap = 24,
    activeIndex: controlledIndex,
    onIndexChange,
    hintText,
    showArrows = true,
}: UseCardCarouselParams) => {
    const [internalIndex, setInternalIndex] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const dragRef = useRef({ startX: 0, dragging: false, deltaPx: 0 });

    const bp = useBreakpoint();
    const isMobile = bp === "xs";

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

    // En xs el swipe es la interacción principal (ver resolvedHint). Las flechas
    // se posicionan con left: -20 / activeWidth - 20, y con la card ocupando
    // casi todo el viewport quedan a medias afuera de la pantalla. Se ocultan
    // en mobile independientemente de lo que pida el prop showArrows.
    const arrowsVisible = showArrows && !isMobile;

    return {
        activeIndex,
        total,
        widths,
        translateX,
        activeWidth,
        isDragging,
        resolvedHint,
        isMobile,
        arrowsVisible,
        goTo,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
    };
};

// ────────────────────────────────────────────────────────────────────────
// useDetailCarouselLayout — layout responsivo para páginas de detalle
// (ProductDetailPage, PresentationDetailPage) que usan CardCarousel con
// una card de "detalle" y una de "analíticas".
// ────────────────────────────────────────────────────────────────────────



/**
 * Ancho de la ventana actual, actualizado en cada resize.
 * Se usa para que en xs las cards ocupen el ancho real disponible
 * en vez de un ancho fijo pensado para desktop.
 */
export const useViewportWidth = (): number => {
    const [width, setWidth] = useState(() =>
        typeof window !== "undefined" ? window.innerWidth : 1200
    );

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
};

/**
 * En xs las cards ocupan el ancho real del viewport (menos el padding
 * lateral) en vez de los anchos fijos pensados para desktop.
 */
export const useDetailCarouselLayout = (
    detailDesktopWidth: number,
    analyticsDesktopWidth: number,
): DetailCarouselLayout => {
    const bp = useBreakpoint();
    const isMobile = bp === "xs";
    const viewportWidth = useViewportWidth();

    const mobileCardWidth = Math.max(viewportWidth - MOBILE_SIDE_PADDING, MIN_MOBILE_CARD_WIDTH);

    return {
        isMobile,
        gap: isMobile ? 12 : 24,
        boxPaddingX: isMobile ? 2 : 0,
        detailWidth: isMobile ? mobileCardWidth : detailDesktopWidth,
        analyticsWidth: isMobile ? mobileCardWidth : analyticsDesktopWidth,
        hintText: (index, total) =>
            index < total - 1
                ? isMobile
                    ? "Desliza para ver las estadísticas"
                    : "Desliza hacia la derecha para ver las estadísticas de venta"
                : undefined,
    };
};