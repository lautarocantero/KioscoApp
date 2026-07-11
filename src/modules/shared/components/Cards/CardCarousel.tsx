import { Box, IconButton, Typography, type Theme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SwipeOutlinedIcon from "@mui/icons-material/SwipeOutlined";
import type { CardCarouselProps } from "@typings/ui/cardCarousel";
import { useCardCarousel } from "../../../../hooks/ui/useCardCarousel";

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
    const {
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
    } = useCardCarousel({ items, defaultCardWidth, gap, activeIndex: controlledIndex, onIndexChange, hintText });

    if (total === 0) return null;

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
                            transition: isDragging ? "none" : "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
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
                            bgcolor: theme.custom.darkBackground,
                            border: `1.5px solid ${theme.palette.primary.main}`,
                            color: theme.palette.primary.main,
                            "&:hover": {
                                bgcolor: theme.palette.primary.main,
                                color: theme.custom.white,
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
                            bgcolor: theme.custom.darkBackground,
                            border: `1.5px solid ${theme.palette.primary.main}`,
                            color: theme.palette.primary.main,
                            "&:hover": {
                                bgcolor: theme.palette.primary.main,
                                color: theme.custom.white,
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
                                bgcolor: i === activeIndex ? theme.palette.primary.main : theme.custom.lightGray,
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
