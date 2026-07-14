// modules/shared/components/DataTable/columnHelpers.tsx
import { Chip, Tooltip, Typography } from "@mui/material";
import type { GridColDef, GridRenderCellParams, GridValidRowModel } from "@mui/x-data-grid";
import { CellCenter } from "./CellCenter";
import { formatDate } from "../../../../utils/formatter/formatDate";
import { truncate } from "modules/shared/helpers/truncate";

/** Columna de texto simple, centrada vertical y horizontalmente */
export const centeredTextColumn = <T extends GridValidRowModel>(
    base: Omit<GridColDef<T>, "renderCell">
): GridColDef<T> => ({
    align: "center",
    headerAlign: "center",
    ...base,
    renderCell: (params: GridRenderCellParams<T, string>) => (
        <CellCenter>{params.value ?? "—"}</CellCenter>
    ),
});

/** Columna de texto largo: tooltip + truncado + centrado */
export const truncatedTextColumn = <T extends GridValidRowModel>(
    base: Omit<GridColDef<T>, "renderCell">,
    maxLength = 60
): GridColDef<T> => ({
    ...base,
    renderCell: (params: GridRenderCellParams<T, string>) => (
        <CellCenter>
            <Tooltip title={params.value ?? ""}>
                <span>{truncate(params.value ?? "", maxLength)}</span>
            </Tooltip>
        </CellCenter>
    ),
});

/** Columna tipo Chip (para estado, contenido, etc.) */
export const chipColumn = <T extends GridValidRowModel>(
    base: Omit<GridColDef<T>, "renderCell">,
    getLabel: (value: unknown, row: T) => string,
    getColor?: (
        value: unknown,
        row: T
    ) => "success" | "error" | "default" | "warning" | "info" | "primary" | "secondary",
    variant: "filled" | "outlined" = "outlined"
): GridColDef<T> => ({
    align: "center",
    headerAlign: "center",
    ...base,
    renderCell: (params: GridRenderCellParams<T, unknown>) => (
        <CellCenter>
            <Chip
                label={getLabel(params.value, params.row)}
                size="small"
                color={getColor?.(params.value, params.row) ?? "default"}
                variant={variant}
                sx={{ fontSize: "0.72rem" }}
            />
        </CellCenter>
    ),
});

/** Columna monetaria formateada */
export const priceColumn = <T extends GridValidRowModel>(
    base: Omit<GridColDef<T>, "renderCell">,
    formatPrice: (value: number) => string
): GridColDef<T> => ({
    type: "number",
    align: "center",
    headerAlign: "center",
    ...base,
    renderCell: (params: GridRenderCellParams<T, number>) => (
        <CellCenter>
            <Typography variant="body2" fontWeight={500}>
                {formatPrice(params.value ?? 0)}
            </Typography>
        </CellCenter>
    ),
});

/** Columna de fecha */
export const dateColumn = <T extends GridValidRowModel>(
    base: Omit<GridColDef<T>, "renderCell">
): GridColDef<T> => ({
    ...base,
    renderCell: (params: GridRenderCellParams<T, string>) => (
        <CellCenter>{formatDate(params.value ?? "")}</CellCenter>
    ),
});