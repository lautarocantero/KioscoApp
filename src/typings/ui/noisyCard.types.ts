import { type SxProps, type Theme } from "@mui/material";

export interface NoisyCardProps {
    children: React.ReactNode;
    maxWidth?: number | string;
    borderRadius?: number | string;
    noiseOpacity?: number;
    sx?: SxProps<Theme>;
}

export type NoisyBackgroundOptions = {
    theme: Theme;
    noiseOpacity?: number;
    backgroundColor?: string;
};
