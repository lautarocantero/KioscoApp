import type { NavigateFunction } from "react-router-dom";
import type { GridColDef } from "@mui/x-data-grid";
import type { DeleteDialogState } from "@typings/ui/dialog.types";

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔒 BASE PRINCIPAL 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// Espejo exacto de ProviderEntity en el back (@typings/provider).
interface ProviderEntity {
    _id:            string;
    name:           string;
    valoration:     number; // 1 a 5
    contact_phone:  string;
    contact_email:  string;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🧩 DERIVADOS 🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩                ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type Provider = ProviderEntity;

export type ProviderPublic = Omit<ProviderEntity, "_id">;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📋 API 📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋               ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type CreateProviderBody = Omit<ProviderEntity, "_id">;

// edit-provider: el back solo pisa los campos que vengan definidos.
export type EditProviderBody = Pick<ProviderEntity, "_id"> & Partial<Omit<ProviderEntity, "_id">>;

export type CreateProviderResponse = {
    _id:     string;
    message: string;
};

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📝 FORMS  📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type ProviderFormValues = Omit<ProviderEntity, "_id">;

export type ProviderEditFormValues = ProviderFormValues;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🍕 SLICE  🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface ProviderState {
    providers:             Provider[];
    currentProvider:       Provider | null;
    isLoading:             boolean;
    errorMessage:          string | null;
    isLoadingCurrent:      boolean;
    currentProviderError:  string | null;
    stats:                 ProviderStats | null;
    isLoadingStats:        boolean;
    statsError:            string | null;
}

export type ProviderStateError = Pick<ProviderState, "errorMessage">;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🪝 HOOKS  🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface UseProviderDataResult {
    providerData:  Provider | null;
    isLoading:     boolean;
    error:         string | null;
}

export interface UseProviderCreateReturn {
    isSubmitting:  boolean;
    submitError:   string | null;
    handleSubmit:  (values: ProviderFormValues) => Promise<void>;
}

export interface UseProviderEditReturn {
    editingProvider:    Provider | null;
    isLoadingProvider:  boolean;
    isSubmitting:       boolean;
    submitError:        string | null;
    handleEdit:         (values: ProviderEditFormValues) => Promise<void>;
}

export interface UseProvidersListDataResult {
    providers:      Provider[];
    loading:        boolean;
    error:          string | null;
    searchTerm:     string;
    setSearchTerm:  (term: string) => void;
}

export interface UseProvidersReturn {
    providers:             Provider[];
    loading:               boolean;
    error:                 string | null;
    clearError:            () => void;
    deleteDialog:          DeleteDialogState;
    handleDeleteRequest:   (id: string, name: string) => void;
    handleDeleteCancel:    () => void;
    handleDeleteConfirm:   () => Promise<void>;
    searchTerm:            string;
    setSearchTerm:         (term: string) => void;
    columns:               GridColDef<Provider>[];
}

export interface ProviderStats {
    totalProviders: number;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🗂️ COLUMNAS  🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️           ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface BuildProviderColumnsArgs {
    onDeleteRequest:  (id: string, name: string) => void;
    navigate:         NavigateFunction;
    isAdmin:          boolean;
}
