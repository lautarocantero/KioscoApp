import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteProviderThunk } from "../../store/provider/providerThunks";
import type { UseProvidersReturn } from "@typings/provider/providerTypes";
import type { AppDispatch } from "../../store/provider/providerSlice";
import type { DeleteDialogState } from "@typings/ui/dialog.types";
import { CLOSED_DIALOG } from "../../config/constants";
import useProvidersListData from "./useProviderListData";
import { buildColumnsForProviders } from "../../modules/providers/pages/ProvidersList/components/providerColumns";

export const useProviders = (): UseProvidersReturn => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { providers, loading, error, searchTerm, setSearchTerm } = useProvidersListData();

    const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>(CLOSED_DIALOG);

    const handleDeleteRequest = (id: string, name: string) =>
        setDeleteDialog({ open: true, id, name });

    const handleDeleteCancel = () => setDeleteDialog(CLOSED_DIALOG);

    const handleDeleteConfirm = async () => {
        await dispatch(deleteProviderThunk(deleteDialog.id));
        setDeleteDialog(CLOSED_DIALOG);
    };

    const columns = buildColumnsForProviders({ onDeleteRequest: handleDeleteRequest, navigate });

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
