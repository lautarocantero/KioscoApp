import React from "react";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoupeIcon from "@mui/icons-material/Loupe";
import StorefrontIcon from "@mui/icons-material/Storefront";

import type { Product } from "@typings/product/productTypes";
import GenericDataGrid from "../../../../shared/components/GenericDataGrid/GenericDataGrid";
import AppLayout from "../../../../shared/layout/AppLayout";
import { useProducts } from "./hooks/useProducts";
import { buildColumns } from "./components/productColumns";
import ProductDeleteDialog from "./components/ProductDeleteDialog";

const ProductsPage = (): React.ReactNode => {
  const navigate = useNavigate();

  const {
    products,
    loading,
    error,
    deleteDialog,
    clearError,
    handleDeleteRequest,
    handleDeleteCancel,
    handleDeleteConfirm,
  } = useProducts();

  const columns = buildColumns({
    onDeleteRequest: handleDeleteRequest,
    navigate,
  });

  return (
    <AppLayout fullWidth title="Productos" icon={<StorefrontIcon />}>
      <div style={{ 
        width: "100%", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "flex-end" 
        }}
      >
        <Button
          variant="contained"
          size="small"
          href="/products-create"
          sx={{ alignSelf: "flex-end", mb: 1 }}
        >
          <LoupeIcon sx={{ mr: 0.5 }} />
          Nuevo producto
        </Button>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
            {error}
          </Alert>
        )}

        <GenericDataGrid<Product>
          rows={products}
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

export default ProductsPage;
