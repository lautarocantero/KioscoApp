import { Box, Typography, type Theme } from "@mui/material";
import type { LoadingScreenProps } from "@typings/ui/loadingScreen.types";
import { useLoadingScreenProgress } from "@hooks/ui/useLoadingScreenProgress";
import { getPublicAssetUrl } from "../../helpers/getPublicAssetUrl";

const MASCOT_SRC = getPublicAssetUrl("images/logo/Stocko-mascotCircle.png");
const DEFAULT_LABEL = "Cargando...";
const DOT_INDEXES = [0, 1, 2] as const;

// Reemplaza el subtree de una página (early return), no es un overlay: si
// se está mostrando, nada de lo que taparía queda montado debajo, así que
// no hace falta manejo de foco tipo Dialog/Backdrop.
//
// La bolsa se "llena" de violeta de abajo hacia arriba en una sola pasada,
// a la velocidad real de useLoadingScreenProgress (no es un loop CSS que
// se repite cada tantos segundos sin relación con cuánto tarda el fetch).
const LoadingScreen = ({ label, fullViewport = true }: LoadingScreenProps): React.ReactNode => {
    const accessibleLabel = label ?? DEFAULT_LABEL;
    const progress = useLoadingScreenProgress();
    const roundedProgress = Math.round(progress);

    return (
        <Box
            component={fullViewport ? "main" : "div"}
            role="progressbar"
            aria-valuenow={roundedProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={accessibleLabel}
            sx={(theme: Theme) => ({
                minHeight: fullViewport ? "100vh" : "400px",
                width: "100%",
                flex: fullViewport ? undefined : 1,
                backgroundColor: theme.custom.background,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1.5em",
            })}
        >
            <Box
                sx={{
                    position: "relative",
                    width: { xs: "96px", sm: "120px" },
                    height: { xs: "96px", sm: "120px" },
                    overflow: "hidden",
                    animation: "loading-screen-bob 1.8s ease-in-out infinite",
                    "@keyframes loading-screen-bob": {
                        "0%, 100%": { transform: "translateY(0)" },
                        "50%": { transform: "translateY(-6px)" },
                    },
                }}
            >
                <Box
                    component="img"
                    src={MASCOT_SRC}
                    alt=""
                    aria-hidden="true"
                    sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        filter: "grayscale(1) contrast(0.9)",
                        opacity: 0.22,
                    }}
                />
                <Box
                    component="img"
                    src={MASCOT_SRC}
                    alt=""
                    aria-hidden="true"
                    sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        clipPath: `inset(${100 - progress}% 0 0 0)`,
                        transition: "clip-path 0.2s ease-out",
                    }}
                />
                <Box
                    aria-hidden="true"
                    sx={(theme: Theme) => ({
                        position: "absolute",
                        left: 0,
                        right: 0,
                        height: "2px",
                        backgroundColor: theme.palette.primary.main,
                        bottom: `${progress}%`,
                        opacity: progress > 1 ? 1 : 0,
                        transition: "bottom 0.2s ease-out, opacity 0.2s ease-out",
                    })}
                />
            </Box>

            <Box aria-hidden="true" sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Typography
                    variant="caption"
                    sx={(theme: Theme) => ({
                        color: theme.custom.darkWhite,
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                    })}
                >
                    {label ?? "Cargando"}
                </Typography>
                {DOT_INDEXES.map((dotIndex) => (
                    <Box
                        key={dotIndex}
                        component="span"
                        sx={(theme: Theme) => ({
                            color: theme.custom.darkWhite,
                            fontWeight: 700,
                            animation: "loading-screen-dots 1.2s infinite",
                            animationDelay: `${dotIndex * 200}ms`,
                            "@keyframes loading-screen-dots": {
                                "0%, 100%": { opacity: 0.2 },
                                "50%": { opacity: 1 },
                            },
                        })}
                    >
                        .
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default LoadingScreen;
