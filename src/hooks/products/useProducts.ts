import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { UseProductsReturn } from "@typings/product/productTypes";
import type { AppDispatch } from "../../store/product/productSlice";
import { deleteProduct } from "../../store/product/productThunks";
import { buildColumnsForProducts } from "../../modules/products/pages/ProductsList/components/productColumns";
import { useProductsListData } from "./useProductListData";
import { useState } from "react";
import type { DeleteDialogState } from "@typings/ui/dialog.types";
import { CLOSED_DIALOG } from "config/constants";


export const useProducts = (): UseProductsReturn => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    // ── data fetching delegado, mismo patrón que useProductEdit → useProductData ──
    const { products, loading, error, searchTerm, setSearchTerm } = useProductsListData();

    const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>(CLOSED_DIALOG);

    const handleDeleteRequest = (id: string, name: string) =>
        setDeleteDialog({ open: true, id, name });

    const handleDeleteCancel = () => setDeleteDialog(CLOSED_DIALOG);

    const handleDeleteConfirm = async () => {
        await dispatch(deleteProduct(deleteDialog.id));
        setDeleteDialog(CLOSED_DIALOG);
    };

    const columns = buildColumnsForProducts({ onDeleteRequest: handleDeleteRequest, navigate });

    return {
        productsWithPresentations: products,
        loading,
        error,
        deleteDialog,
        clearError: () => {}, // ver nota abajo
        handleDeleteRequest,
        handleDeleteCancel,
        handleDeleteConfirm,
        searchTerm,
        setSearchTerm,
        columns,
    };
};