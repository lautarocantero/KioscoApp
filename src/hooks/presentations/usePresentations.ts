import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/presentation/presentationSlice";
import { clearError } from "../../store/presentation/presentationSlice";
import { deletePresentation } from "../../store/presentation/presentationThunks";
import { buildColumnsForPresentations } from "../../modules/presentations/pages/PresentationList/components/presentationColumns";
import { usePresentationsListData } from "./usePresentationsListData";
import type { DeleteDialogState } from "@typings/ui/dialog.types";


const CLOSED_DIALOG: DeleteDialogState = { open: false, id: "", name: "" };

export const usePresentationsAdmin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { product_id } = useParams<{ product_id: string }>();

    // ── data fetching delegado, mismo patrón que useProductEdit → useProductData ──
    const { presentations, loading, error, searchTerm, setSearchTerm } =
        usePresentationsListData(product_id);

    const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>(CLOSED_DIALOG);

    const handleDeleteRequest = (id: string, name: string) =>
        setDeleteDialog({ open: true, id, name });

    const handleDeleteCancel = () => setDeleteDialog(CLOSED_DIALOG);

    const handleDeleteConfirm = async () => {
        await dispatch(deletePresentation(deleteDialog.id));
        setDeleteDialog(CLOSED_DIALOG);
    };

    const columns = buildColumnsForPresentations({
        productId: product_id as string,
        onDeleteRequest: handleDeleteRequest,
        navigate,
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
    };
};