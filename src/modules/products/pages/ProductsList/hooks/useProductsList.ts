import { useCallback, useEffect, useState } from "react";
import type {
  DeleteDialogState,
  Product,
  ProductWithPresentations,
  UseProductsReturn,
} from "@typings/product/productTypes";
import {
  deleteProductRequest,
  getProductsRequest,
  getProductsWithPresentationsRequest,
} from "../../../api/productApi";
import { resolveErrorMessage } from "../helpers/productHelpers";


const CLOSED_DIALOG: DeleteDialogState = { open: false, id: "", name: "" };

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] =
    useState<DeleteDialogState>(CLOSED_DIALOG);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductsRequest();
      setProducts(data);
    } catch (err: unknown) {
      setError(resolveErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  const handleDeleteRequest = (id: string, name: string) =>
    setDeleteDialog({ open: true, id, name });

  const handleDeleteCancel = () => setDeleteDialog(CLOSED_DIALOG);

  const handleDeleteConfirm = async () => {
    try {
      await deleteProductRequest(deleteDialog.id);
      setProducts((prev) => prev.filter((p) => p._id !== deleteDialog.id));
    } catch (err: unknown) {
      setError(resolveErrorMessage(err));
    } finally {
      handleDeleteCancel();
    }
  };

  // ── productos con presentaciones resumidas (nuevo) ────────────────────────
  const [productsWithPresentations, setProductsWithPresentations] =
    useState<ProductWithPresentations[]>([]);
  const [loadingPresentations, setLoadingPresentations] = useState(true);
  const [errorPresentations, setErrorPresentations] = useState<string | null>(null);

  const fetchProductsWithPresentations = useCallback(async () => {
    setLoadingPresentations(true);
    setErrorPresentations(null);
    try {
      const data = await getProductsWithPresentationsRequest();
      setProductsWithPresentations(data);
    } catch (err: unknown) {
      setErrorPresentations(resolveErrorMessage(err));
    } finally {
      setLoadingPresentations(false);
    }
  }, []);

  useEffect(() => {
    void fetchProductsWithPresentations();
  }, [fetchProductsWithPresentations]);
  // ────────────────────────────────────────────────────────────────────────

  return {
    products,
    loading,
    error,
    deleteDialog,
    clearError: () => setError(null),
    handleDeleteRequest,
    handleDeleteCancel,
    handleDeleteConfirm,
    productsWithPresentations,
    loadingPresentations,
    errorPresentations,
    refetchProductsWithPresentations: fetchProductsWithPresentations,
  };
};