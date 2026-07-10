import React from "react";
import { useNavigate } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import type { Product } from "@typings/product/productTypes";
import DataTable from "../../../shared/components/DataTable/DataTable";
import AppLayout from "../../../shared/layout/AppLayout";
import { useProductsList } from "./hooks/useProductsList";
import { buildColumns } from "./components/productColumns";

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
        <AppLayout fullWidth title="Productos" icon={<StorefrontIcon />}>
            <DataTable<Product>
                title={"Productos"}
                rows={productsWithPresentations}
                columns={columns}
                loading={loading}
                error={error}
                onClearError={clearError}
                emptyMessage="No hay productos registrados"
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