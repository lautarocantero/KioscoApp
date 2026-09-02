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

export interface AddKioscoCardProps {
    onCreate: () => void;
    onJoin: () => void;
}

export interface KioscoGridProps {
    kioscos: KioscoWithStats[];
    loading: boolean;
    noResults: boolean;
    entering: string | null;
    onEnter: (kiosco: KioscoWithStats) => void;
    onCreate: () => void;
    onJoin: () => void;
}
