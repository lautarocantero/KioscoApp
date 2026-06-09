// ─── Componente 🧩: ProductVariantsListPage ───────────────────────────────────
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Chip, Tooltip, Typography } from "@mui/material";
import { type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoupeIcon from "@mui/icons-material/Loupe";

import type { ProductVariant } from "@typings/productVariant/productVariantTypes";
import {
    deletePresentationRequest,
    getPresentationsByProductIdRequest,
} from "../api/presentationsApi";
import AppLayout from "../../../modules/shared/layout/AppLayout";
import PageHeader from "../../shared/components/GenericDataGrid/PageHeader";
import GenericDataGrid from "../../shared/components/GenericDataGrid/GenericDataGrid";
import ConfirmDialog from "../../shared/components/ConfirmDialog/ConfirmDialog";
import RowActionsCell from "../../shared/components/GenericDataGrid/RowActionsCell";

// ─── helpers ──────────────────────────────────────────────────────────────────

const formatDate = (iso: string): string =>
    iso
        ? new Date(iso).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
          })
        : "—";

const formatPrice = (price: number): string =>
    new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
    }).format(price);

const resolveErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
        return (
            (err.response?.data as { message?: string })?.message ?? err.message
        );
    }
    return err instanceof Error ? err.message : "Error desconocido";
};

// ─── status chip ──────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<ProductVariantStatus, { label: string; color: "success" | "error" | "default" }> = {
    available:     { label: "Disponible",    color: "success" },
    out_of_stock:  { label: "Sin stock",     color: "error"   },
    unavailable:   { label: "No disponible", color: "default" },
};

// ─── tipos locales ─────────────────────────────────────────────────────────────

interface DeleteDialogState {
    open: boolean;
    id: string;
    name: string;
}

const CLOSED_DIALOG: DeleteDialogState = { open: false, id: "", name: "" };

// ─── columnas ─────────────────────────────────────────────────────────────────

type BuildColumnsArgs = {
    productId: string;
    onDeleteRequest: (id: string, name: string) => void;
    navigate: ReturnType<typeof useNavigate>;
};

const buildColumns = ({
    productId,
    onDeleteRequest,
    navigate,
}: BuildColumnsArgs): GridColDef[] => [
    {
        field: "sku",
        headerName: "SKU",
        width: 120,
    },
    {
        field: "name",
        headerName: "Nombre",
        flex: 1.5,
        minWidth: 160,
    },
    {
        field: "description",
        headerName: "Descripción",
        flex: 2,
        minWidth: 200,
        renderCell: (params: GridRenderCellParams<ProductVariant, string>) => (
            <Tooltip title={params.value ?? ""}>
                <span>
                    {(params.value ?? "").length > 60
                        ? `${params.value!.slice(0, 59)}…`
                        : (params.value || "—")}
                </span>
            </Tooltip>
        ),
    },
    {
        field: "net_content",
        headerName: "Contenido",
        width: 110,
        align: "center",
        headerAlign: "center",
        renderCell: (params: GridRenderCellParams<ProductVariant, string>) => (
            <Chip
                label={params.value ?? "—"}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.72rem" }}
            />
        ),
    },
    {
        field: "stock_current",
        headerName: "Stock",
        width: 100,
        type: "number",
        align: "center",
        headerAlign: "center",
        renderCell: (params: GridRenderCellParams<ProductVariant, number>) => {
            const stock = params.value ?? 0;
            const isLow = stock <= (params.row.reorder_point ?? 0);
            return (
                <Chip
                    label={stock}
                    size="small"
                    color={isLow ? "error" : "success"}
                    variant={isLow ? "filled" : "outlined"}
                    sx={{ fontSize: "0.72rem", minWidth: 40 }}
                />
            );
        },
    },
    {
        field: "status",
        headerName: "Estado",
        width: 140,
        align: "center",
        headerAlign: "center",
        renderCell: (
            params: GridRenderCellParams<ProductVariant, ProductVariantStatus>
        ) => {
            const cfg = STATUS_CONFIG[params.value ?? "unavailable"];
            return (
                <Chip
                    label={cfg.label}
                    size="small"
                    color={cfg.color}
                    variant="filled"
                    sx={{ fontSize: "0.72rem" }}
                />
            );
        },
    },
    {
        field: "price",
        headerName: "Precio",
        width: 130,
        type: "number",
        renderCell: (params: GridRenderCellParams<ProductVariant, number>) => (
            <Typography variant="body2" fontWeight={500}>
                {formatPrice(params.value ?? 0)}
            </Typography>
        ),
    },
    {
        field: "actions",
        headerName: "Acciones",
        width: 130,
        sortable: false,
        filterable: false,
        align: "center",
        headerAlign: "center",
        renderCell: (params: GridRenderCellParams<ProductVariant>) => (
            <RowActionsCell
                onView={() =>
                    navigate(`/products/${productId}/variants/${params.row._id}`)
                }
                onEdit={() =>
                    navigate(`/products/${productId}/variants/${params.row._id}/edit`)
                }
                onDelete={() =>
                    onDeleteRequest(params.row._id, params.row.name)
                }
            />
        ),
    },
];

// ─── página principal ──────────────────────────────────────────────────────────

const ProductVariantsListPage = (): React.ReactNode => {
    const { product_id } = useParams<{ product_id: string }>();
    const navigate = useNavigate();

    const [variants, setVariants] = useState<ProductVariant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteDialog, setDeleteDialog] =
        useState<DeleteDialogState>(CLOSED_DIALOG);

    // ── fetch ──────────────────────────────────────────────────────────────────
    const fetchVariants = useCallback(async () => {
        if (!product_id) return;
        setLoading(true);
        setError(null);
        try {
            const data = await getPresentationsByProductIdRequest({ product_id });
            setVariants(data);
        } catch (err: unknown) {
            setError(resolveErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, [product_id]);

    useEffect(() => {
        void fetchVariants();
    }, [fetchVariants]);

    // ── handlers de eliminación ────────────────────────────────────────────────
    const handleDeleteRequest = (id: string, name: string) =>
        setDeleteDialog({ open: true, id, name });

    const handleDeleteCancel = () => setDeleteDialog(CLOSED_DIALOG);

    const handleDeleteConfirm = async () => {
        try {
            await deletePresentationRequest(deleteDialog.id);
            setVariants((prev) => prev.filter((v) => v._id !== deleteDialog.id));
        } catch (err: unknown) {
            setError(resolveErrorMessage(err));
        } finally {
            handleDeleteCancel();
        }
    };

    const columns = buildColumns({
        productId: product_id ?? "",
        onDeleteRequest: handleDeleteRequest,
        navigate,
    });

    // ── render ─────────────────────────────────────────────────────────────────
    return (
        <AppLayout title="Presentaciones">
            <div style={{ padding: 24 }}>
                <PageHeader
                    title="Presentaciones"
                    action={
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() =>
                                navigate(`/products/${product_id}/variants/new`)
                            }
                        >
                            <LoupeIcon sx={{ mr: 0.5, fontSize: 18 }} />
                            Nueva presentación
                        </Button>
                    }
                />

                {error && (
                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                        onClose={() => setError(null)}
                    >
                        {error}
                    </Alert>
                )}

                <GenericDataGrid<ProductVariant>
                    rows={variants}
                    columns={columns}
                    loading={loading}
                    emptyMessage="Este producto no tiene presentaciones registradas"
                />

                <ConfirmDialog
                    open={deleteDialog.open}
                    title="Confirmar eliminación"
                    description={
                        <>
                            ¿Estás seguro de que querés eliminar la presentación{" "}
                            <strong>{deleteDialog.name}</strong>? Esta acción no
                            se puede deshacer.
                        </>
                    }
                    confirmLabel="Eliminar"
                    onConfirm={() => void handleDeleteConfirm()}
                    onCancel={handleDeleteCancel}
                />
            </div>
        </AppLayout>
    );
};

export default ProductVariantsListPage;