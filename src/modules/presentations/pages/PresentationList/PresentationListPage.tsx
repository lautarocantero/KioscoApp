// ─── Componente 🧩: PresentationListPage ─────────────────────────────────────
import React from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ViewListIcon from "@mui/icons-material/ViewList";
import type { Presentation } from "@typings/presentation/presentationTypes";
import { usePresentations } from "../PresentationList/hooks/usePresentations";
import { buildColumns } from "./components/presentationColumns";
import PresentationDeleteDialog from "./components/PresentationDeleteDialog";
import AppLayout from "../../../../modules/shared/layout/AppLayout";
import GenericDataGrid from "../../../../modules/shared/components/GenericDataGrid/GenericDataGrid";

// ─── página ───────────────────────────────────────────────────────────────────

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
        <AppLayout
            fullWidth
            title="Presentaciones"
            icon={<ViewListIcon />}
            hasSearchBar
            searchPlaceholder="600gr, pack x6..."
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            hasNewItem
            newItemLabel="Nueva presentación"
            newItemHref={`/products/${productId}/presentations/new`}
        >
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
                        {error}
                    </Alert>
                )}

                <GenericDataGrid<Presentation>
                    rows={presentations}
                    columns={columns}
                    loading={loading}
                    emptyMessage="Este producto no tiene presentaciones registradas"
                />

                <PresentationDeleteDialog
                    deleteDialog={deleteDialog}
                    onConfirm={() => void handleDeleteConfirm()}
                    onCancel={handleDeleteCancel}
                />
            </div>
        </AppLayout>
    );
};

export default PresentationListPage;