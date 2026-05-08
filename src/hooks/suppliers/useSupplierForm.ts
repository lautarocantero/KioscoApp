import { useState } from "react";
import { REACT_APP_API_URL } from "config/constants";
import type { SupplierFormState, UseSupplierFormParams, UseSupplierFormReturn } from "@typings/providers/providerTypes";


const INITIAL_STATE: SupplierFormState = {
    supplierName: "",
    supplierEmail: "",
    supplierPhone: "",
    isLoading: false,
    error: null,
};

export const useSupplierForm = ({
    onClose,
    onSupplierCreated,
}: UseSupplierFormParams): UseSupplierFormReturn => {
    const [supplierName, setSupplierName] = useState(INITIAL_STATE.supplierName);
    const [supplierEmail, setSupplierEmail] = useState(INITIAL_STATE.supplierEmail);
    const [supplierPhone, setSupplierPhone] = useState(INITIAL_STATE.supplierPhone);
    const [isLoading, setIsLoading] = useState(INITIAL_STATE.isLoading);
    const [error, setError] = useState<string | null>(INITIAL_STATE.error);

    const resetForm = () => {
        setSupplierName(INITIAL_STATE.supplierName);
        setSupplierEmail(INITIAL_STATE.supplierEmail);
        setSupplierPhone(INITIAL_STATE.supplierPhone);
        setError(INITIAL_STATE.error);
    };

    const validate = (): boolean => {
        if (!supplierName.trim()) {
            setError("El nombre del proveedor es requerido");
            return false;
        }
        setError(null);
        return true;
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        setIsLoading(true);

        try {
            const body = {
                name: supplierName.trim(),
                email: supplierEmail.trim() || undefined,
                phone: supplierPhone.trim() || undefined,
            };

            const response = await fetch(`${REACT_APP_API_URL}/providers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData?.message ?? `Error ${response.status}`);
            }

            const data: { _id: string; name: string } = await response.json();

            onSupplierCreated({ id: data._id, name: data.name });
            handleClose();
        } catch (err) {
            console.error("❌ Error al crear proveedor:", err);
            setError(
                err instanceof Error
                    ? err.message
                    : "Error inesperado al crear el proveedor"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return {
        supplierName,
        supplierEmail,
        supplierPhone,
        isLoading,
        error,
        setSupplierName,
        setSupplierEmail,
        setSupplierPhone,
        handleClose,
        handleSubmit,
    };
};