import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useContext, useMemo, useState } from "react";
import { deleteSellerThunk, selectSellerThunk } from "../../store/seller/sellerThunks";
import type { DeleteDialogState } from "@typings/ui/dialog.types";
import type { Seller, UseSellersReturn } from "@typings/seller/sellerTypes";
import { CLOSED_DIALOG } from "../../config/constants";
import useSellersListData from "./useSellerListData";
import { buildColumnsForSellers } from "../../modules/sellers/pages/SellersList/components/SellerColumns";
import { filterSellersBySearch } from "../../modules/sellers/helpers/filterSellersBySearch";
import type { AppDispatch } from "../../store/seller/sellerSlice";
import { useActiveKiosco } from "../kiosco/useActiveKiosco";
import { useErrorParser } from "../shared/useErrorParser";
import { SnackBarContext } from "../../modules/shared/components/SnackBar/SnackBarContext";
import { AlertColor } from "@typings/ui/ui";

export const useSellers = (): UseSellersReturn => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { activeKiosco, isAdmin } = useActiveKiosco();
    const snackBarContext = useContext(SnackBarContext);

    const { sellers, loading, error, clearError } = useSellersListData();

    const [searchTerm, setSearchTerm] = useState("");
    const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>(CLOSED_DIALOG);
    const [inviteModalOpen, setInviteModalOpen] = useState(false);

    const filteredSellers = useMemo(() => filterSellersBySearch(sellers, searchTerm), [sellers, searchTerm]);

    const { parseError } = useErrorParser();

    const handleDeleteRequest = (id: string, name: string) =>
        setDeleteDialog({ open: true, id, name });

    const handleDeleteCancel = () => setDeleteDialog(CLOSED_DIALOG);

    const handleDeleteConfirm = async () => {
        if (!activeKiosco) return;

        try {
            const deleted = await dispatch(deleteSellerThunk(activeKiosco._id, deleteDialog.id));
            if (!deleted) throw new Error("No se pudo eliminar el vendedor");

            setDeleteDialog(CLOSED_DIALOG);
        } catch (err) {
            const message = await parseError(err, "Error inesperado al eliminar el vendedor");
            snackBarContext?.showSnackBar(message, AlertColor.Error);
        }
    };

    const handleEditRequest = (seller: Seller) => {
        dispatch(selectSellerThunk(seller));
        navigate(`/seller/${seller._id}/seller-edit`);
    };

    const columns = buildColumnsForSellers({
        // El borrado elimina Auth+Seller en cascada: solo un admin puede
        // hacerlo (el back también lo rechaza con 403 si no lo es). El
        // botón siempre se pasa; queda disabled+tooltip para no-admin
        // (mismo patrón que productos/presentaciones/proveedores).
        onDeleteRequest: handleDeleteRequest,
        onEditRequest: handleEditRequest,
        navigate,
        isAdmin,
    });

    return {
        sellers: filteredSellers,
        loading,
        error,
        clearError,
        deleteDialog,
        handleDeleteRequest,
        handleDeleteCancel,
        handleDeleteConfirm,
        searchTerm,
        setSearchTerm,
        columns,
        isAdmin,
        inviteModalOpen,
        openInviteModal: () => setInviteModalOpen(true),
        closeInviteModal: () => setInviteModalOpen(false),
    };
};