// ─── Componente 🧩: PresentationListPage ─────────────────────────────────────
import React from "react";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoupeIcon from "@mui/icons-material/Loupe";
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
    } = usePresentations();

    const columns = buildColumns({
        productId,
        onDeleteRequest: handleDeleteRequest,
        navigate,
    });

    return (
        <AppLayout fullWidth title="Presentaciones" icon={<ViewListIcon />}>
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
            }}>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() =>
                        navigate(`/products/${productId}/presentations/new`)
                    }
                    sx={{ alignSelf: "flex-end", mb: 1 }}
                >
                    <LoupeIcon sx={{ mr: 0.5, fontSize: 18 }} />
                    Nueva presentación
                </Button>

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
