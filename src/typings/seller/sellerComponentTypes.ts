import type { NavigateFunction } from "react-router-dom";
import type { GridColDef } from "@mui/x-data-grid";
import type { DeleteDialogState } from "@typings/ui/dialog.types";
import type { Seller } from "@typings/seller/sellerTypes";

export interface BuildSellerColumnsArgs {
    onDeleteRequest: (id: string, name: string) => void;
    onEditRequest: (seller: Seller) => void;
    navigate: NavigateFunction;
}

export interface UseSellersListDataReturn {
    sellers: Seller[];
    loading: boolean;
    error: string | null;
    clearError: () => void;
}

export interface UseSellersReturn {
    sellers: Seller[];
    loading: boolean;
    error: string | null;
    clearError: () => void;
    deleteDialog: DeleteDialogState;
    handleDeleteRequest: (id: string, name: string) => void;
    handleDeleteCancel: () => void;
    handleDeleteConfirm: () => Promise<void>;
    columns: GridColDef<Seller>[];
}