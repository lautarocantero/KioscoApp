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

export interface DeleteDialogState {
    open: boolean;
    id: string;
    name: string;
}

export interface DeleteDialogProps {
    deleteDialog: DeleteDialogState;
    onConfirm: () => void;
    onCancel: () => void;
}

//─────────────────────────────── 📦 Restock 📦 ───────────────────────────────//

export interface RestockDialogState {
    open: boolean;
    id: string;
    name: string;
    stock: number;
    minStock: number;
}

export interface RestockDialogProps {
    restockDialog: RestockDialogState;
    stockValue: number;
    isSubmitting: boolean;
    errorMessage: string | null;
    onStockChange: (value: number) => void;
    onConfirm: () => void;
    onCancel: () => void;
}

//─────────────────────────────── 💰 Saldar deuda 💰 ───────────────────────────────//

export interface SettleDebtDialogState {
    open: boolean;
    sellId: string;
    debtorName: string | null;
    currency: string;
    pendingBalance: number;
}

export interface SettleDebtDialogProps {
    settleDebtDialog: SettleDebtDialogState;
    isSubmitting: boolean;
    errorMessage: string | null;
    onConfirm: () => void;
    onCancel: () => void;
}