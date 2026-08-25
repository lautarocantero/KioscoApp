import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import type { AppDispatch } from "../../store/presentation/presentationSlice";
import { clearError } from "../../store/presentation/presentationSlice";
import { deletePresentation } from "../../store/presentation/presentationThunks";
import { buildColumnsForPresentations } from "../../modules/presentations/pages/PresentationList/components/presentationColumns";
import { usePresentationsListData } from "./usePresentationsListData";
import { useRestockPresentation } from "./useRestockPresentation";
import type { DeleteDialogState } from "@typings/ui/dialog.types";
import { CLOSED_DIALOG } from "../../config/constants";
import { useErrorParser } from "../shared/useErrorParser";
import { SnackBarContext } from "../../modules/shared/components/SnackBar/SnackBarContext";
import { AlertColor } from "@typings/ui/ui";
import { useIsActiveKioscoAdmin } from "../kiosco/useIsActiveKioscoAdmin";


export const usePresentations = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();
    const { product_id } = useParams<{ product_id: string }>();
    const snackBarContext = useContext(SnackBarContext);
    const isAdmin = useIsActiveKioscoAdmin();

    // ── data fetching delegado, mismo patrón que useProductEdit → useProductData ──
    const { presentations, loading, error, searchTerm, setSearchTerm } =
        usePresentationsListData(product_id);

    const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>(CLOSED_DIALOG);

    const { parseError } = useErrorParser();

    const restock = useRestockPresentation();

    const handleDeleteRequest = (id: string, name: string) =>
        setDeleteDialog({ open: true, id, name });

    const handleDeleteCancel = () => setDeleteDialog(CLOSED_DIALOG);

    const handleDeleteConfirm = async () => {
        try {
            const deleted = await dispatch(deletePresentation(deleteDialog.id));
            if (!deleted) throw new Error("No se pudo eliminar la presentación");

            setDeleteDialog(CLOSED_DIALOG);
        } catch (err) {
            const message = await parseError(err, t("presentations.deleteDialog.errorUnexpected"));
            snackBarContext?.showSnackBar(message, AlertColor.Error);
        }
    };

    const columns = buildColumnsForPresentations({
        onDeleteRequest: handleDeleteRequest,
        onRestockRequest: restock.handleRestockRequest,
        navigate,
        t,
        isAdmin,
    });

    return {
        productId: product_id,
        presentations,
        loading,
        error,
        deleteDialog,
        clearError: () => dispatch(clearError()),
        handleDeleteCancel,
        handleDeleteConfirm,
        searchTerm,
        setSearchTerm,
        columns,
        restockDialog: restock.restockDialog,
        restockStockValue: restock.stockValue,
        restockIsSubmitting: restock.isSubmitting,
        restockErrorMessage: restock.errorMessage,
        handleRestockStockChange: restock.handleStockChange,
        handleRestockCancel: restock.handleRestockCancel,
        handleRestockConfirm: restock.handleRestockConfirm,
    };
};