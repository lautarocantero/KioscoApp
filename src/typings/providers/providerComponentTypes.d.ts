
// /*══════════════════════════════════════════════════════════════════════╗
// ║ ‼️ Dialog  ‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface SupplierErrorAlertProps {
    message: string | null;
}

interface SupplierFormFieldsProps {
    supplierName: string;
    supplierEmail: string;
    supplierPhone: string;
    isLoading: boolean;
    onNameChange: (value: string) => void;
    onEmailChange: (value: string) => void;
    onPhoneChange: (value: string) => void;
}

interface SupplierDialogActionsProps {
    isLoading: boolean;
    onClose: () => void;
    onSubmit: () => void;
}