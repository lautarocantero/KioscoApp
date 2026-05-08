import { Dialog, DialogContent } from "@mui/material";
import type { AddSupplierDialogProps } from "@typings/providers/providerTypes";
import { useSupplierForm } from "hooks/suppliers/useSupplierForm";
import SupplierDialogTitle from "./SupplierDialogTitle";
import SupplierErrorAlert from "./SupplierErrorAlert";
import SupplierFormFields from "./SupplierFormFields";
import SupplierDialogActions from "./SupplierDialogActions";


const AddSupplierDialog = ({open, onClose, onSupplierCreated }: AddSupplierDialogProps): React.ReactNode => {

    const {
        supplierName, supplierEmail, supplierPhone,
        isLoading, error,
        setSupplierName, setSupplierEmail, setSupplierPhone,
        handleClose, handleSubmit,
    } = useSupplierForm({ onClose, onSupplierCreated });

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <SupplierDialogTitle />

            <DialogContent sx={{ pt: 2.5 }}>
                <SupplierErrorAlert message={error} />

                <SupplierFormFields
                    supplierName={supplierName}
                    supplierEmail={supplierEmail}
                    supplierPhone={supplierPhone}
                    isLoading={isLoading}
                    onNameChange={setSupplierName}
                    onEmailChange={setSupplierEmail}
                    onPhoneChange={setSupplierPhone}
                />
            </DialogContent>

            <SupplierDialogActions
                isLoading={isLoading}
                onClose={handleClose}
                onSubmit={handleSubmit}
            />
        </Dialog>
    );
};

export default AddSupplierDialog;