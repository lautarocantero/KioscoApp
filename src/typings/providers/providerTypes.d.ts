
// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🍕 SLICE  🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface ProviderState { 
    _id: string | null,
    name: string,
    description: string,
    created_at: string,
    updated_at: string,
    errorMessage: string | null,
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🪝 Hooks  🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface SupplierFormState {
    supplierName: string;
    supplierEmail: string;
    supplierPhone: string;
    isLoading: boolean;
    error: string | null;
}


export interface UseSupplierFormParams {
    onClose: () => void;
    onSupplierCreated: (supplier: { id: string; name: string }) => void;
}


export interface UseSupplierFormReturn extends SupplierFormState {
    setSupplierName: (value: string) => void;
    setSupplierEmail: (value: string) => void;
    setSupplierPhone: (value: string) => void;
    handleClose: () => void;
    handleSubmit: () => Promise<void>;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🛞 Utilidades  🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞                 ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface Supplier {
    id: string;
    name: string;
}

export interface AddSupplierDialogProps {
    open: boolean;
    onClose: () => void;
    onSupplierCreated: (supplier: Supplier) => void;
}