import type { Dispatch, SetStateAction } from "react";
import type { confirmColorEnum } from "./uiEnums";

//─────────────────────────────── 🪧 Dialog 🪧 ───────────────────────────────//

export interface DialogContextType {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

export interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    description: React.ReactNode;
    warningText?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmColor?: confirmColorEnum;
    icon?: React.ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
}

// Campos que ConfirmDialog resuelve con default antes de pasarlos a los hijos,
// por eso dejan de ser opcionales en los subcomponentes.
export type ConfirmDialogHeaderProps = Required<Pick<ConfirmDialogProps, "title" | "confirmColor">> &
    Pick<ConfirmDialogProps, "icon" | "onCancel">;

export type ConfirmDialogContentProps = Pick<ConfirmDialogProps, "description"> & {
    hasWarning: boolean;
};

export type ConfirmDialogActionsProps = Required<Pick<ConfirmDialogProps, "confirmColor" | "confirmLabel" | "cancelLabel">> &
    Pick<ConfirmDialogProps, "warningText" | "onConfirm" | "onCancel">;