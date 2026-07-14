import React from "react";
import type { Presentation } from "@typings/presentation/presentationTypes";
import { usePresentations } from "../../../../hooks/presentation/usePresentations";
import AppLayout from "../../../../modules/shared/layout/AppLayout";
import DataTable from "../../../shared/components/DataTable/DataTable";


const PresentationListPage = (): React.ReactNode => {

    const {
        productId,
        presentations,
        loading,
        error,
        deleteDialog,
        clearError,
        handleDeleteCancel,
        handleDeleteConfirm,
        searchTerm,
        setSearchTerm,
        columns,
    } = usePresentations();
    

    return (
        <AppLayout fullWidth >
            <DataTable<Presentation>
                title={"Presentaciones"}
                rows={presentations}
                columns={columns}
                loading={loading}
                error={error}
                onClearError={clearError}
                emptyMessage="Este producto no tiene presentaciones registradas"
                height={"35em"}
                search={{
                    value: searchTerm,
                    onChange: setSearchTerm,
                    placeholder: "600gr, pack x6...",
                }}
                newItem={{
                    label: "Nueva presentación",
                    href: `/products/${productId}/presentations/new`,
                }}
                deleteDialog={{
                    open: deleteDialog.open,
                    title: "Confirmar eliminación",
                    description: (
                        <>
                            ¿Estás seguro de que querés eliminar la presentación{" "}
                            <strong>{deleteDialog.name}</strong>? Esta acción no se puede deshacer.
                        </>
                    ),
                    warningText: "Esta acción eliminará la presentación de forma permanente.",
                    confirmLabel: "Eliminar",
                    onConfirm: () => void handleDeleteConfirm(),
                    onCancel: handleDeleteCancel,
                }}
            />
        </AppLayout>
    );
};

export default PresentationListPage;