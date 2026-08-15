import { type ReactNode } from "react";
import type { Provider } from "@typings/provider/providerTypes";
import DataTable from "../../../shared/components/DataTable/DataTable";
import AppLayout from "../../../shared/layout/AppLayout";
import { useProviders } from "../../../../hooks/providers/useProviders";

const ProvidersListPage = (): ReactNode => {
    const {
        providers,
        loading,
        error,
        clearError,
        deleteDialog,
        handleDeleteCancel,
        handleDeleteConfirm,
        searchTerm,
        setSearchTerm,
        columns,
    } = useProviders();

    return (
        <AppLayout fullWidth>
            <DataTable<Provider>
                title="Proveedores"
                rows={providers}
                columns={columns}
                loading={loading}
                error={error}
                onClearError={clearError}
                emptyMessage="No hay proveedores registrados"
                height="35em"
                search={{
                    value: searchTerm,
                    onChange: setSearchTerm,
                    placeholder: "Distribuidora del Sur...",
                }}
                newItem={{
                    label: "Nuevo proveedor",
                    href: "/provider-create",
                }}
                deleteDialog={{
                    open: deleteDialog.open,
                    title: "Confirmar eliminación",
                    description: (
                        <>
                            ¿Estás seguro de que querés eliminar el proveedor{" "}
                            <strong>{deleteDialog.name}</strong>? Esta acción no se puede deshacer.
                        </>
                    ),
                    confirmLabel: "Eliminar",
                    onConfirm: () => void handleDeleteConfirm(),
                    onCancel: handleDeleteCancel,
                }}
            />
        </AppLayout>
    );
};

export default ProvidersListPage;
