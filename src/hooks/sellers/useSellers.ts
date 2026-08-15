import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteSellerThunk, selectSellerThunk } from "../../store/seller/sellerThunks";
import type { DeleteDialogState } from "@typings/ui/dialog.types";
import type { Seller, UseSellersReturn } from "@typings/seller/sellerTypes";
import { CLOSED_DIALOG } from "../../config/constants";
import useSellersListData from "./useSellerListData";
import { buildColumnsForSellers } from "../../modules/sellers/pages/SellersList/components/SellerColumns";
import type { AppDispatch } from "../../store/seller/sellerSlice";
import { useIsAdmin } from "../auth/useIsAdmin";

export const useSellers = (): UseSellersReturn => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const isAdmin = useIsAdmin();

    const { sellers, loading, error, clearError } = useSellersListData();

    const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>(CLOSED_DIALOG);

    const handleDeleteRequest = (id: string, name: string) =>
        setDeleteDialog({ open: true, id, name });

    const handleDeleteCancel = () => setDeleteDialog(CLOSED_DIALOG);

    const handleDeleteConfirm = async () => {
        await dispatch(deleteSellerThunk(deleteDialog.id));
        setDeleteDialog(CLOSED_DIALOG);
    };

    const handleEditRequest = (seller: Seller) => {
        dispatch(selectSellerThunk(seller));
        navigate(`/seller/${seller._id}/seller-edit`);
    };

    const columns = buildColumnsForSellers({
        // El borrado elimina Auth+Seller en cascada: solo un admin puede
        // hacerlo (el back también lo rechaza con 403 si no lo es).
        onDeleteRequest: isAdmin ? handleDeleteRequest : undefined,
        onEditRequest: handleEditRequest,
        navigate,
    });

    return {
        sellers,
        loading,
        error,
        clearError,
        deleteDialog,
        handleDeleteRequest,
        handleDeleteCancel,
        handleDeleteConfirm,
        columns,
    };
};