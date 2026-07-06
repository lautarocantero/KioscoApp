import { Card, type SxProps, type Theme } from "@mui/material";
import { getNoisyBackgroundSx } from "../NoisyBackground/NoisyBackground";

export interface NoisyCardProps {
    children: React.ReactNode;
    maxWidth?: number | string;
    borderRadius?: number | string;
    noiseOpacity?: number;
    sx?: SxProps<Theme>;
}

const NoisyCard = ({
    children,
    maxWidth,
    borderRadius = "16px",
    noiseOpacity = 0.06,
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
                ...getNoisyBackgroundSx(theme, noiseOpacity),
            }),
            ...(Array.isArray(sx) ? sx : [sx]),
        ]}
    >
        {children}
    </Card>
);

export default NoisyCard;