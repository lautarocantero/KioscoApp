import type { NavigateFunction } from 'react-router-dom';
import type { SellerStatus } from './sellerEnums';
import type { DeleteDialogState } from '@typings/ui/dialog.types';
import type { GridColDef } from '@mui/x-data-grid';
import type { AuthRoleEnum } from '@typings/auth/authEnums';

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔒 BASE PRINCIPAL 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// Espejo exacto de SellerEntity en el back (@typings/seller).
// email y rol ya NO viven acá — son de Auth.
interface SellerEntity {
    _id:            string;
    name:           string;
    profilePhoto:   string | null;
    created_at:     string;
    user_status:    SellerStatus;
    __v?:           number;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🧩 DERIVADOS 🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩                ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type Seller = SellerEntity;

// Solo los campos públicos (sin _id)
export type SellerPublic = Omit<SellerEntity, "_id">;

export type SellerWithRole = Seller & { role: AuthRoleEnum; email: string };

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📋 API 📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋               ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// El back ya no tiene create-seller/delete-seller como endpoints propios
// (ver /register y /delete-auth en Auth). Si el front necesita crear/eliminar
// vendedores, el payload debería vivir en typings/auth, no acá.

// edit-seller: el back solo pisa los campos que vengan definidos.
export type EditSellerPayload =
    Pick<SellerEntity, "_id"> & Partial<Omit<SellerEntity, "_id" | "__v">>;

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