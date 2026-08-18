import type { ReactNode } from "react";
import type { KioscoWithStats } from "./kioscoTypes";

export interface KioscoCardProps {
    kiosco: KioscoWithStats;
    colorIndex: number;
    entering: boolean;
    onEnter: () => void;
}

export interface InviteSellerModalProps {
    open: boolean;
    onClose: () => void;
}

export interface KioscoSelectorActionRowProps {
    icon: ReactNode;
    endIcon: ReactNode;
    title: string;
    subtitle: string;
    accent: "lightMain" | "lightSecondary";
    onClick: () => void;
}
