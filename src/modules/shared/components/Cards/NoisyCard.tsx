import type { NoisyCardProps } from "@typings/ui/noisyCard.types";
import { getNoisyBackgroundSx } from "../NoisyBackground/NoisyBackground";
import { Card, type Theme, type SxProps } from "@mui/material";
import { alpha } from "@mui/material/styles";


const NoisyCard = ({
    children,
    maxWidth,
    borderRadius = "16px",
    component,
    sx,
}: NoisyCardProps): React.ReactNode => {

    const baseSx: SxProps<Theme> = [
        (theme: Theme) => ({
            width: "100%",
            ...(maxWidth ? { maxWidth } : {}),
            border: "0.5px solid",
            borderColor: alpha(theme?.custom?.white, 0.08),
            borderRadius,
            boxShadow: `
                0 1px 3px ${alpha(theme?.custom?.black, 0.06)},
                4px 8px 16px ${alpha(theme?.custom?.black, 0.10)},
                8px 16px 28px ${alpha(theme?.custom?.black, 0.08)}
            `,
            ...getNoisyBackgroundSx({ theme }),
        }),
    ];

    const mergedSx: SxProps<Theme> = (Array.isArray(baseSx) ? baseSx : [baseSx])
        .concat(Array.isArray(sx) ? sx : sx ? [sx] : []) as SxProps<Theme>;

    return (
        <Card
            {...(component ? { component } : {})}
            sx={mergedSx}
        >
            {children}
        </Card>
    );
};

export default NoisyCard;