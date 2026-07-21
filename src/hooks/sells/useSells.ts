import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import type { UseSellsReturn } from "@typings/sells/sellTypes";
import type { DeleteDialogState } from "@typings/ui/dialog.types";
import type { AppDispatch } from "../../store/sell/sellSlice";
import { deleteSellThunk } from "../../store/sell/sellsThunks";
import { useSellsListData } from "./useSellsListData";
import { buildColumnsForSells } from "../../modules/sells/pages/SellsList/components/sellColumns";
import { CLOSED_DIALOG } from "../../config/constants";


export const useSells = (): UseSellsReturn => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { sells, loading, error, searchTerm, setSearchTerm } = useSellsListData();
    
    const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>(CLOSED_DIALOG);

    const handleDeleteRequest = (id: string, name: string) => setDeleteDialog({ open: true, id, name });
    const handleDeleteCancel = () => setDeleteDialog(CLOSED_DIALOG);

    const handleDeleteConfirm = async () => {
        await dispatch(deleteSellThunk({ _id: deleteDialog.id }));
        setDeleteDialog(CLOSED_DIALOG);
    };

    const columns = buildColumnsForSells({ onDeleteRequest: handleDeleteRequest, navigate });

    return {
        sells,
        loading,
        error,
        deleteDialog,
        clearError: () => {},
        handleDeleteRequest,
        handleDeleteCancel,
        handleDeleteConfirm,
        searchTerm,
        setSearchTerm,
        columns,
    };
};