import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { DeleteDialogState, UseProductsReturn } from "@typings/product/productTypes";
import type { AppDispatch, RootState } from "../../store/product/productSlice";
import { getProducts, searchProducts, deleteProduct } from "../../store/product/productThunks";
import { buildColumns } from "../../modules/products/pages/ProductsList/components/productColumns";

const CLOSED_DIALOG: DeleteDialogState = { open: false, id: "", name: "" };

export const useProducts = (): UseProductsReturn => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const products    = useSelector((state: RootState) => state.product.products);
  const loading     = useSelector((state: RootState) => state.product.isLoading);
  const storeError  = useSelector((state: RootState) => state.product.errorMessage);

  const [error, setError] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>(CLOSED_DIALOG);

  useEffect(() => {
    setError(storeError);
  }, [storeError]);

  // ── búsqueda con debounce ──────────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (searchTerm.trim() === "") {
        void dispatch(getProducts());
      } else {
        void dispatch(searchProducts(searchTerm));
      }
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [searchTerm, dispatch]);

  const handleDeleteRequest = (id: string, name: string) =>
    setDeleteDialog({ open: true, id, name });

  const handleDeleteCancel = () => setDeleteDialog(CLOSED_DIALOG);

  const handleDeleteConfirm = async () => {
    await dispatch(deleteProduct(deleteDialog.id));
    setDeleteDialog(CLOSED_DIALOG);
  };

  const columns = buildColumns({ onDeleteRequest: handleDeleteRequest, navigate });

  return {
    productsWithPresentations: products,
    loading,
    error,
    deleteDialog,
    clearError: () => setError(null),
    handleDeleteRequest,
    handleDeleteCancel,
    handleDeleteConfirm,
    searchTerm,
    setSearchTerm,
    columns,
  };
};