import React from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import type { Product } from "@typings/product/productTypes";
import GenericDataGrid from "../../../shared/components/GenericDataGrid/GenericDataGrid";
import AppLayout from "../../../shared/layout/AppLayout";
import { useProductsList } from "./hooks/useProductsList";
import { buildColumns } from "./components/productColumns";
import ProductDeleteDialog from "./components/ProductDeleteDialog";

const ProductsListPage = (): React.ReactNode => {
  const navigate = useNavigate();

  const {
    productsWithPresentations,
    loading,
    error,
    deleteDialog,
    clearError,
    handleDeleteRequest,
    handleDeleteCancel,
    handleDeleteConfirm,
    searchTerm,
    setSearchTerm,
  } = useProductsList();

  const columns = buildColumns({
    onDeleteRequest: handleDeleteRequest,
    navigate,
  });

  return (
    <AppLayout
      fullWidth
      title="Productos"
      icon={<StorefrontIcon />}
      hasSearchBar
      searchPlaceholder="Azucar 600gr..."
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      hasNewItem
      newItemLabel="Nuevo producto"
      newItemHref="/products-create"
    >
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
            {error}
          </Alert>
        )}

        <GenericDataGrid<Product>
          rows={productsWithPresentations}
          columns={columns}
          loading={loading}
          emptyMessage="No hay productos registrados"
        />

        <ProductDeleteDialog
          deleteDialog={deleteDialog}
          onConfirm={() => void handleDeleteConfirm()}
          onCancel={handleDeleteCancel}
        />
      </div>
    </AppLayout>
  );
};

export default ProductsListPage;