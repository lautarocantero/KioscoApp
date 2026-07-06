import { useCallback, useMemo, useRef, useState } from "react";
import { Box, IconButton, Typography, type SxProps, type Theme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SwipeOutlinedIcon from "@mui/icons-material/SwipeOutlined";

export interface CardCarouselItem {
    id: string;
    content: React.ReactNode;
    /** Ancho en px de esta card en particular. Si se omite, usa `defaultCardWidth`. */
    width?: number;
}

export interface CardCarouselProps {
    /** Cards a renderizar, en orden. Cada una puede declarar su propio `width`. */
    items: CardCarouselItem[];
    /** Ancho usado para los items que no declaran `width` propio. */
    defaultCardWidth?: number;
    gap?: number;
    /** Ancho máximo del viewport completo (contiene la card activa + el peek de la siguiente). */
    maxViewportWidth?: number | string;
    /** Index controlado (opcional). Si no se pasa, el componente maneja su propio estado. */
    activeIndex?: number;
    onIndexChange?: (index: number) => void;
    hintText?: string | ((index: number, total: number) => string | undefined);
    showDots?: boolean;
    showArrows?: boolean;
    sx?: SxProps<Theme>;
}

const CardCarousel = ({
    items,
    defaultCardWidth = 620,
    gap = 24,
    maxViewportWidth = 1300,
    activeIndex: controlledIndex,
    onIndexChange,
    hintText,
    showDots = true,
    showArrows = true,
    sx,
}: CardCarouselProps): React.ReactNode => {
    const [internalIndex, setInternalIndex] = useState(0);
    const isControlled = controlledIndex !== undefined;
    const activeIndex = isControlled ? controlledIndex! : internalIndex;
    const total = items.length;

    const widths = useMemo(() => items.map((item) => item.width ?? defaultCardWidth), [items, defaultCardWidth]);

    // offsets[i] = distancia acumulada desde x=0 hasta el borde izquierdo de la card i.
    const offsets = useMemo(() => {
        const acc: number[] = [];
        let running = 0;
        widths.forEach((w, i) => {
            acc.push(running);
            running += w + gap;
        });
        return acc;
    }, [widths, gap]);

    const dragRef = useRef({ startX: 0, dragging: false, deltaPx: 0 });
    const [dragOffset, setDragOffset] = useState(0);

    const goTo = useCallback(
        (index: number) => {
            const clamped = Math.max(0, Math.min(total - 1, index));
            if (!isControlled) setInternalIndex(clamped);
            onIndexChange?.(clamped);
        },
        [isControlled, onIndexChange, total]
    );

    const handlePointerDown = (e: React.PointerEvent) => {
        if (total <= 1) return;
        dragRef.current = { startX: e.clientX, dragging: true, deltaPx: 0 };
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!dragRef.current.dragging) return;
        const delta = e.clientX - dragRef.current.startX;
        dragRef.current.deltaPx = delta;
        setDragOffset(delta);
    };

    const handlePointerUp = () => {
        if (!dragRef.current.dragging) return;
        const delta = dragRef.current.deltaPx;
        const threshold = 80;

        if (delta < -threshold && activeIndex < total - 1) goTo(activeIndex + 1);
        else if (delta > threshold && activeIndex > 0) goTo(activeIndex - 1);

        dragRef.current.dragging = false;
        dragRef.current.deltaPx = 0;
        setDragOffset(0);
    };

    // La card activa siempre arranca en x=0 del viewport (su offset acumulado se resta del track).
    const baseOffset = -offsets[activeIndex];
    const translateX = baseOffset + dragOffset;

    const activeWidth = widths[activeIndex];

    const resolvedHint = typeof hintText === "function" ? hintText(activeIndex, total) : hintText;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", ...sx }}>
            <Box sx={{ position: "relative", width: "100%", maxWidth: maxViewportWidth }}>
                <Box
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    sx={{
                        width: "100%",
                        overflow: "hidden",
                        touchAction: "pan-y",
                        cursor: total > 1 ? "grab" : "default",
                        userSelect: "none",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: `${gap}px`,
                            width: "max-content",
                            transform: `translateX(${translateX}px)`,
                            transition: dragRef.current.dragging ? "none" : "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                    >
                        {items.map((item, i) => (
                            <Box key={item.id} sx={{ width: widths[i], minWidth: widths[i], flexShrink: 0 }}>
                                {item.content}
                            </Box>
                        ))}
                    </Box>
                </Box>

                {showArrows && activeIndex < total - 1 && (
                    <IconButton
                        onClick={() => goTo(activeIndex + 1)}
                        aria-label="Ver siguiente"
                        sx={(theme: Theme) => ({
                            position: "absolute",
                            top: "50%",
                            left: activeWidth - 20,
                            transform: "translateY(-50%)",
                            width: 40,
                            height: 40,
                            zIndex: 2,
                            bgcolor: theme.custom?.posSurface ?? "rgba(139,92,246,0.12)",
                            border: `1.5px solid ${theme.custom?.posAccent ?? "#8B5CF6"}`,
                            color: theme.custom?.posAccent ?? "#8B5CF6",
                            "&:hover": {
                                bgcolor: theme.custom?.posAccent ?? "#8B5CF6",
                                color: "#fff",
                            },
                        })}
                    >
                        <ArrowForwardIcon fontSize="small" />
                    </IconButton>
                )}

                {showArrows && activeIndex > 0 && (
                    <IconButton
                        onClick={() => goTo(activeIndex - 1)}
                        aria-label="Ver anterior"
                        sx={(theme: Theme) => ({
                            position: "absolute",
                            top: "50%",
                            left: -20,
                            transform: "translateY(-50%)",
                            width: 40,
                            height: 40,
                            zIndex: 2,
                            bgcolor: theme.custom?.posSurface ?? "rgba(139,92,246,0.12)",
                            border: `1.5px solid ${theme.custom?.posAccent ?? "#8B5CF6"}`,
                            color: theme.custom?.posAccent ?? "#8B5CF6",
                            "&:hover": {
                                bgcolor: theme.custom?.posAccent ?? "#8B5CF6",
                                color: "#fff",
                            },
                        })}
                    >
                        <ArrowBackIcon fontSize="small" />
                    </IconButton>
                )}
            </Box>

            {showDots && total > 1 && (
                <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
                    {items.map((item, i) => (
                        <Box
                            key={item.id}
                            component="button"
                            onClick={() => goTo(i)}
                            aria-label={`Ir a la card ${i + 1}`}
                            sx={(theme: Theme) => ({
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                border: "none",
                                p: 0,
                                cursor: "pointer",
                                bgcolor: i === activeIndex ? theme.custom?.posAccent ?? "#8B5CF6" : "rgba(255,255,255,0.2)",
                                transition: "background-color 0.2s",
                            })}
                        />
                    ))}
                </Box>
            )}

            {resolvedHint && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {resolvedHint}
                    </Typography>
                    <SwipeOutlinedIcon sx={{ fontSize: "1rem", color: "text.secondary" }} />
                </Box>
            )}
        </Box>
    );
};

export default CardCarousel;