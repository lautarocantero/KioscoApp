import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import type { AppDispatch } from "../../store/presentation/presentationSlice";
import { restockPresentation } from "../../store/presentation/presentationThunks";
import type { Presentation, UseRestockPresentationReturn } from "@typings/presentation/presentationTypes";
import type { RestockDialogState } from "@typings/ui/dialog.types";
import { CLOSED_RESTOCK_DIALOG } from "../../config/constants";
import { useErrorParser } from "../shared/useErrorParser";
import { SnackBarContext } from "../../modules/shared/components/SnackBar/SnackBarContext";
import { AlertColor } from "@typings/ui/ui";
import { clampStock } from "../../utils/formatter/clampStock";

/*══════════════════════════════════════════════╗
║ 🪝 useRestockPresentation                       ║
║ Modal de "reponer stock" desde la tabla de     ║
║ presentaciones: edita solo `stock`, muestra    ║
║ `min_stock` como referencia no editable.        ║
╚══════════════════════════════════════════════*/
export const useRestockPresentation = (): UseRestockPresentationReturn => {
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();
    const snackBarContext = useContext(SnackBarContext);
    const { parseError } = useErrorParser();

    const [restockDialog, setRestockDialog] = useState<RestockDialogState>(CLOSED_RESTOCK_DIALOG);
    const [stockValue, setStockValue] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleRestockRequest = (presentation: Presentation) => {
        setErrorMessage(null);
        const currentStock = clampStock(presentation.stock);
        setStockValue(currentStock);
        setRestockDialog({
            open: true,
            id: presentation._id,
            name: presentation.name,
            stock: currentStock,
            minStock: presentation.min_stock,
        });
    };

    const handleStockChange = (value: number) => setStockValue(value);

    const handleRestockCancel = () => {
        setRestockDialog(CLOSED_RESTOCK_DIALOG);
        setErrorMessage(null);
    };

    const handleRestockConfirm = async () => {
        if (stockValue < 0) {
            setErrorMessage(t("presentations.restockDialog.invalidStock"));
            return;
        }

        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const updated = await dispatch(restockPresentation({ _id: restockDialog.id, stock: stockValue }));
            if (!updated) throw new Error("No se pudo actualizar el stock");

            snackBarContext?.showSnackBar(t("presentations.restockDialog.successMessage"), AlertColor.Success);
            setRestockDialog(CLOSED_RESTOCK_DIALOG);
        } catch (err) {
            const message = await parseError(err, t("presentations.restockDialog.errorUnexpected"));
            setErrorMessage(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        restockDialog,
        stockValue,
        isSubmitting,
        errorMessage,
        handleRestockRequest,
        handleStockChange,
        handleRestockCancel,
        handleRestockConfirm,
    };
};

export default useRestockPresentation;
