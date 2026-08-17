import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMemo, useState } from "react";
import { SellFilterEnum } from "@typings/sells/sellsEnum";
import type { UseSellsReturn } from "@typings/sells/sellTypes";
import type { DeleteDialogState } from "@typings/ui/dialog.types";
import type { AppDispatch } from "../../store/sell/sellSlice";
import { deleteSellThunk } from "../../store/sell/sellsThunks";
import { useSellsListData } from "./useSellsListData";
import { buildColumnsForSells } from "../../modules/sells/pages/SellsList/components/sellColumns";
import { getSellFilterCounts } from "../../modules/sells/helpers/getSellFilterCounts";
import { filterSellsByStatus } from "../../modules/sells/helpers/filterSellsByStatus";
import { CLOSED_DIALOG } from "../../config/constants";


export const useSells = (): UseSellsReturn => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { sells, loading, error, searchTerm, setSearchTerm } = useSellsListData();

    const [filter, setFilter] = useState<SellFilterEnum>(SellFilterEnum.All);
    const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>(CLOSED_DIALOG);

    const counts = useMemo(() => getSellFilterCounts(sells), [sells]);
    const filteredSells = useMemo(() => filterSellsByStatus(sells, filter), [sells, filter]);

    const handleDeleteRequest = (id: string, name: string) => setDeleteDialog({ open: true, id, name });
    const handleDeleteCancel = () => setDeleteDialog(CLOSED_DIALOG);

    const handleDeleteConfirm = async () => {
        await dispatch(deleteSellThunk({ _id: deleteDialog.id }));
        setDeleteDialog(CLOSED_DIALOG);
    };

    const columns = buildColumnsForSells({ onDeleteRequest: handleDeleteRequest, navigate });

    return {
        sells: filteredSells,
        loading,
        error,
        filter,
        setFilter,
        counts,
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