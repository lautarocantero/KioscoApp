import { type SxProps, type Theme } from "@mui/material";
import type { ElementType } from "react";

export interface NoisyCardProps {
    children: React.ReactNode;
    maxWidth?: number | string;
    borderRadius?: number | string;
    noiseOpacity?: number;
    sx?: SxProps<Theme>;
    component?: ElementType;
}

export type NoisyBackgroundOptions = {
    theme: Theme;
    noiseOpacity?: number;
    backgroundColor?: string;
};
