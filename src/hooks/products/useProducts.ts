import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import type { UseProductsReturn } from "@typings/product/productTypes";
import type { AppDispatch } from "../../store/product/productSlice";
import { deleteProduct } from "../../store/product/productThunks";
import { buildColumnsForProducts } from "../../modules/products/pages/ProductsList/components/productColumns";
import useProductsListData from "./useProductListData";
import type { DeleteDialogState } from "@typings/ui/dialog.types";
import { CLOSED_DIALOG } from "../../config/constants";
import { useErrorParser } from "../shared/useErrorParser";
import { SnackBarContext } from "../../modules/shared/components/SnackBar/SnackBarContext";
import { AlertColor } from "@typings/ui/ui";
import { useIsActiveKioscoAdmin } from "../kiosco/useIsActiveKioscoAdmin";


export const useProducts = (): UseProductsReturn => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const snackBarContext = useContext(SnackBarContext);
    const { t } = useTranslation();
    const isAdmin = useIsActiveKioscoAdmin();


    const { products, loading, error, searchTerm, setSearchTerm } = useProductsListData();

    const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>(CLOSED_DIALOG);

    const { parseError } = useErrorParser();

    const handleDeleteRequest = (id: string, name: string) =>
        setDeleteDialog({ open: true, id, name });

    const handleDeleteCancel = () => setDeleteDialog(CLOSED_DIALOG);

    const handleDeleteConfirm = async () => {
        try {
            await dispatch(deleteProduct(deleteDialog.id));
            setDeleteDialog(CLOSED_DIALOG);
        } catch (err) {
            const message = await parseError(err, t("products.errors.deleteUnexpected"));
            snackBarContext?.showSnackBar(message, AlertColor.Error);
        }
    };

    const columns = buildColumnsForProducts({ onDeleteRequest: handleDeleteRequest, navigate, t, isAdmin });

    return {
        productsWithPresentations: products,
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