import React from "react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import type { Product } from "@typings/product/productTypes";
import DataTable from "../../../shared/components/DataTable/DataTable";
import AppLayout from "../../../shared/layout/AppLayout";
import { useProducts } from "../../../../hooks/products/useProducts";

const ProductsListPage = (): React.ReactNode => {
    const {
        productsWithPresentations,
        loading,
        error,
        deleteDialog,
        clearError,
        handleDeleteCancel,
        handleDeleteConfirm,
        searchTerm,
        setSearchTerm,
        columns,
    } = useProducts();

    return (
        <AppLayout fullWidth>
            <DataTable<Product>
                title={"Productos"}
                rows={productsWithPresentations}
                columns={columns}
                loading={loading}
                error={error}
                onClearError={clearError}
                emptyMessage="No hay productos registrados"
                height={"35em"}
                search={{
                    value: searchTerm,
                    onChange: setSearchTerm,
                    placeholder: "Azucar 600gr...",
                }}
                newItem={{
                    label: "Nuevo producto",
                    href: "/products-create",
                }}
                deleteDialog={{
                    open: deleteDialog.open,
                    title: "Confirmar eliminación",
                    description: (
                        <>
                            ¿Estás seguro de que querés eliminar el producto{" "}
                            <strong>{deleteDialog.name}</strong>? Esta acción no se puede deshacer.
                            También se eliminarán sus presentaciones y stock asociado.
                        </>
                    ),
                    warningText: "Esta acción eliminará el producto de forma permanente.",
                    confirmLabel: "Eliminar",
                    onConfirm: () => void handleDeleteConfirm(),
                    onCancel: handleDeleteCancel,
                }}
            />
        </AppLayout>
    );
};

export default ProductsListPage;