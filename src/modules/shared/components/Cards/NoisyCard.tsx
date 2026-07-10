import type { NoisyCardProps } from "@typings/ui/noisyCard.types";
import { getNoisyBackgroundSx } from "../NoisyBackground/NoisyBackground";
import { Card, type Theme } from "@mui/material";


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
                borderColor: "rgba(255,255,255,0.08)",
                borderRadius,
                boxShadow: `
                    0 1px 3px rgba(0,0,0,0.06),
                    4px 8px 16px rgba(0,0,0,0.10),
                    8px 16px 28px rgba(0,0,0,0.08)
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