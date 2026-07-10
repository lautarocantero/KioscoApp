import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type {
  DeleteDialogState,
  Product,
  ProductWithPresentations,
  UseProductsReturn,
} from "@typings/product/productTypes";
import {
  deleteProductRequest,
  getProductsWithPresentationsRequest,
  searchProductsWithPresentationsRequest,
} from "../../modules/products/api/productApi";
import { resolveErrorMessage } from "../../modules/products/pages/ProductsList/helpers/productHelpers";
import { buildColumns } from "../../modules/products/pages/ProductsList/components/productColumns";

const CLOSED_DIALOG: DeleteDialogState = { open: false, id: "", name: "" };

export const useProducts = (): UseProductsReturn => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] =
    useState<DeleteDialogState>(CLOSED_DIALOG);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductsWithPresentationsRequest();
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
      if (searchTerm.trim() === "") {
        await fetchProductsWithPresentations();
      } else {
        await searchProductsWithPresentations(searchTerm);
      }
    } catch (err: unknown) {
      setError(resolveErrorMessage(err));
    } finally {
      handleDeleteCancel();
    }
  };

  // ── productos con presentaciones resumidas ────────────────────────
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

  // ── búsqueda ────────────────────────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const searchProductsWithPresentations = useCallback(async (term: string) => {
    setLoadingPresentations(true);
    setErrorPresentations(null);
    try {
      const data = await searchProductsWithPresentationsRequest(term);
      setProductsWithPresentations(data);
    } catch (err: unknown) {
      setErrorPresentations(resolveErrorMessage(err));
    } finally {
      setLoadingPresentations(false);
    }
  }, []);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (searchTerm.trim() === "") {
        void fetchProductsWithPresentations();
      } else {
        void searchProductsWithPresentations(searchTerm);
      }
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [searchTerm, fetchProductsWithPresentations, searchProductsWithPresentations]);
  // ────────────────────────────────────────────────────────────────────────

  // ── columnas de la tabla (antes armadas en la page) ──────────────────
  const columns = buildColumns({
    onDeleteRequest: handleDeleteRequest,
    navigate,
  });
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
    searchTerm,
    setSearchTerm,
    columns,
  };
};