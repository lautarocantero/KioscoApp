import React from "react";
import { useNavigate } from "react-router-dom";
import ViewListIcon from "@mui/icons-material/ViewList";
import type { Presentation } from "@typings/presentation/presentationTypes";
import { usePresentations } from "../PresentationList/hooks/usePresentations";
import { buildColumns } from "./components/presentationColumns";
import AppLayout from "../../../../modules/shared/layout/AppLayout";
import DataTable from "../../../shared/components/DataTable/DataTable";


const PresentationListPage = (): React.ReactNode => {
    const navigate = useNavigate();

    const {
        productId,
        presentations,
        loading,
        error,
        deleteDialog,
        clearError,
        handleDeleteRequest,
        handleDeleteCancel,
        handleDeleteConfirm,
        searchTerm,
        setSearchTerm,
    } = usePresentations();

    const columns = buildColumns({
        productId,
        onDeleteRequest: handleDeleteRequest,
        navigate,
    });

    return (
        <AppLayout fullWidth title="Presentaciones" icon={<ViewListIcon />}>
            <DataTable<Presentation>
                rows={presentations}
                columns={columns}
                loading={loading}
                error={error}
                onClearError={clearError}
                emptyMessage="Este producto no tiene presentaciones registradas"
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
                    confirmLabel: "Eliminar",
                    onConfirm: () => void handleDeleteConfirm(),
                    onCancel: handleDeleteCancel,
                }}
            />
        </AppLayout>
    );
};

export default PresentationListPage;