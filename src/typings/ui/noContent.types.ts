import type { ReactNode } from "react";
import type { SxProps, Theme, SvgIconProps } from "@mui/material";

export interface NoContentLoadedProps {
  message?: string;
  icon?: React.ComponentType<SvgIconProps>;
  action?: ReactNode;
  sx?: SxProps<Theme>;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║    EmptyStateCard                                                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface EmptyStateCardProps {
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: React.ReactNode;
    buttonText: string;
    onButtonClick: () => void;
    height?: string;
}