import type { NoisyCardProps } from "@typings/ui/noisyCard.types";
import { getNoisyBackgroundSx } from "../NoisyBackground/NoisyBackground";
import { Card, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";


const NoisyCard = ({
    children,
    maxWidth,
    borderRadius = "16px",
    sx,
}: NoisyCardProps): React.ReactNode => (
    <Card
        sx={[
            (theme: Theme) => ({
                width: "100%",
                ...(maxWidth ? { maxWidth } : {}),
                border: "0.5px solid",
                borderColor: alpha(theme.custom.white, 0.08),
                borderRadius,
                boxShadow: `
                    0 1px 3px ${alpha(theme.custom.black, 0.06)},
                    4px 8px 16px ${alpha(theme.custom.black, 0.10)},
                    8px 16px 28px ${alpha(theme.custom.black, 0.08)}
                `,
                ...getNoisyBackgroundSx({theme}),
            }),
            ...(Array.isArray(sx) ? sx : [sx]),
        ]}
    >
        {children}
    </Card>
);

export default NoisyCard;