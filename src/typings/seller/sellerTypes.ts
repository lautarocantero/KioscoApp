import type { NavigateFunction } from 'react-router-dom';
import type { SellerRol, SellerStatus } from './sellerEnums';
import type { DeleteDialogState } from '@typings/ui/dialog.types';
import type { GridColDef } from '@mui/x-data-grid';

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔒 BASE PRINCIPAL 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

interface SellerEntity {
    _id:          string;
    name:         string;
    email:        string;
    rol:          SellerRol;
    created_at:   string;
    user_status:  SellerStatus;
    __v?:         number;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🧩 DERIVADOS 🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩                ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// Derivado principal — evita exponer SellerEntity directamente
export type Seller = SellerEntity;

// Solo los campos públicos (sin _id)
export type SellerPublic = Omit<SellerEntity, "_id">;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📋 API 📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋               ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type CreateSellerPayload = Omit<SellerEntity, '_id' | '__v'>;
export type EditSellerPayload = Omit<SellerEntity, '__v'>;

export interface DeleteSellerPayload {
  _id: string;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🍕 SLICE  🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface SellerSliceState {
    sellers:         Seller[];
    isLoading:  boolean;
    selectedSeller:  Seller | null;
    errorMessage:    string | null;
}

export type SellerSliceError = Pick<SellerSliceState, "errorMessage">;

export interface SetSellersPayload { sellers: Seller[] }
export interface SetSelectedSellerPayload { seller: Seller | null }
export interface AddSellerToListPayload { seller: Seller }
export interface UpdateSellerInListPayload { seller: Seller }
export interface RemoveSellerFromListPayload { _id: string }

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🪝 HOOKS  🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface UseSellersListDataReturn {
    sellers:     Seller[];
    loading:     boolean;
    error:       string | null;
    clearError:  () => void;
}

export interface UseSellersReturn {
    sellers:              Seller[];
    loading:              boolean;
    error:                string | null;
    clearError:           () => void;
    deleteDialog:         DeleteDialogState;
    handleDeleteRequest:  (id: string, name: string) => void;
    handleDeleteCancel:   () => void;
    handleDeleteConfirm:  () => Promise<void>;
    columns:              GridColDef<Seller>[];
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🗂️ COLUMNAS  🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️           ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface BuildSellerColumnsArgs {
    onDeleteRequest:  (id: string, name: string) => void;
    onEditRequest:    (seller: Seller) => void;
    navigate:         NavigateFunction;
}