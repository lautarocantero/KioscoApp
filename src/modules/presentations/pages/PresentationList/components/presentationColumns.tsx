// ─── Columnas 📋: presentationColumns ────────────────────────────────────────
import { Chip, Tooltip, Typography } from "@mui/material";
import { type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

import type { Presentation } from "@typings/productVariant/productVariantTypes";
import RowActionsCell from "../../../../../modules/shared/components/GenericDataGrid/RowActionsCell";
import { formatPrice } from "../helpers/presentationHelpers";

// ─── tipos ────────────────────────────────────────────────────────────────────

type ProductVariantStatus = "available" | "out_of_stock" | "unavailable";

export type BuildColumnsArgs = {
    productId: string;
    onDeleteRequest: (id: string, name: string) => void;
    navigate: ReturnType<typeof useNavigate>;
};

// ─── config de estado ─────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
    ProductVariantStatus,
    { label: string; color: "success" | "error" | "default" }
> = {
    available:    { label: "Disponible",    color: "success" },
    out_of_stock: { label: "Sin stock",     color: "error"   },
    unavailable:  { label: "No disponible", color: "default" },
};

// ─── builder ──────────────────────────────────────────────────────────────────

export const buildColumns = ({
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
        renderCell: (params: GridRenderCellParams<Presentation, string>) => (
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
        renderCell: (params: GridRenderCellParams<Presentation, string>) => (
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
        renderCell: (params: GridRenderCellParams<Presentation, number>) => {
            const stock = params.value ?? 0;
            const isLow = stock <= (params?.row?.min_stock ?? 0);
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
            params: GridRenderCellParams<Presentation, ProductVariantStatus>
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
        renderCell: (params: GridRenderCellParams<Presentation, number>) => (
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
        renderCell: (params: GridRenderCellParams<Presentation>) => (
            <RowActionsCell
                onView={() =>
                    navigate(
                        `/products/${productId}/presentations/${params.row._id}`
                    )
                }
                onEdit={() =>
                    navigate(
                        `/products/${productId}/presentations/${params.row._id}/edit`
                    )
                }
                onDelete={() => onDeleteRequest(params.row._id, params.row.name)}
            />
        ),
    },
];
