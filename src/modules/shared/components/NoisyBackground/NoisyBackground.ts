import type { NoisyBackgroundOptions } from "@typings/ui/noisyCard.types";


export const getNoisyBackgroundSx = ({
    theme,
    noiseOpacity = 0.06,
    backgroundColor = theme.palette.mode === "light"
        ? theme?.custom?.lightBackground
        : theme?.custom?.darkBackground,
}: NoisyBackgroundOptions) => ({
    position: "relative" as const,
    backgroundColor,
    overflow: "hidden" as const,
    "&::before": {
        content: '""',
        position: "absolute" as const,
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat" as const,
        backgroundSize: "180px 180px",
        opacity: noiseOpacity,
        mixBlendMode: "screen" as const,
        pointerEvents: "none" as const,
        zIndex: 0,
    },
});