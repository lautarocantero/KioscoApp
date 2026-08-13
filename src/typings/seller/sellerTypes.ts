import type { NavigateFunction } from 'react-router-dom';
import type { SellerRol, SellerStatus } from './sellerEnums';
import type { DeleteDialogState } from '@typings/ui/dialog.types';
import type { GridColDef } from '@mui/x-data-grid';

export interface Seller {
  _id: string;
  name: string;
  email: string;
  password: string;
  rol: SellerRol;
  created_at: string;
  user_status: SellerStatus;
  __v?: number;
}

export interface SellerSliceState {
  sellers: Seller[];
  isLoading: boolean;
  errorMessage: string | null;
}

export type CreateSellerPayload = Omit<Seller, '_id' | '__v'>;
export type EditSellerPayload = Omit<Seller, '__v'>;

export interface DeleteSellerPayload {
  _id: string;
}

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