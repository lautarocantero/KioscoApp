import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useContext, useState } from "react";
import { deleteProviderThunk } from "../../store/provider/providerThunks";
import type { UseProvidersReturn } from "@typings/provider/providerTypes";
import type { AppDispatch } from "../../store/provider/providerSlice";
import type { DeleteDialogState } from "@typings/ui/dialog.types";
import { CLOSED_DIALOG } from "../../config/constants";
import useProvidersListData from "./useProviderListData";
import { buildColumnsForProviders } from "../../modules/providers/pages/ProvidersList/components/providerColumns";
import { useErrorParser } from "../shared/useErrorParser";
import { SnackBarContext } from "../../modules/shared/components/SnackBar/SnackBarContext";
import { AlertColor } from "@typings/ui/ui";
import { useIsActiveKioscoAdmin } from "../kiosco/useIsActiveKioscoAdmin";

export const useProviders = (): UseProvidersReturn => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const snackBarContext = useContext(SnackBarContext);
    const isAdmin = useIsActiveKioscoAdmin();

    const { providers, loading, error, searchTerm, setSearchTerm } = useProvidersListData();

    const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>(CLOSED_DIALOG);

    const { parseError } = useErrorParser();

    const handleDeleteRequest = (id: string, name: string) =>
        setDeleteDialog({ open: true, id, name });

    const handleDeleteCancel = () => setDeleteDialog(CLOSED_DIALOG);

    const handleDeleteConfirm = async () => {
        try {
            const deleted = await dispatch(deleteProviderThunk(deleteDialog.id));
            if (!deleted) throw new Error("No se pudo eliminar el proveedor");

            setDeleteDialog(CLOSED_DIALOG);
        } catch (err) {
            const message = await parseError(err, "Error inesperado al eliminar el proveedor");
            snackBarContext?.showSnackBar(message, AlertColor.Error);
        }
    };

    const columns = buildColumnsForProviders({ onDeleteRequest: handleDeleteRequest, navigate, isAdmin });

    return {
        providers,
        loading,
        error,
        clearError: () => {},
        deleteDialog,
        handleDeleteRequest,
        handleDeleteCancel,
        handleDeleteConfirm,
        searchTerm,
        setSearchTerm,
        columns,
    };
};

export default useProviders;
