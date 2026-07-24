import React from "react";
import { Box, type Theme } from "@mui/material";
import GenericDataGrid from "./GenericDataGrid";
import DataTableErrorAlert from "./DataTableErrorAlert";
import DataTableDeleteDialog from "./DataTableDeleteDialog";
import type { DataTableProps } from "@typings/ui/dataTable.types";
import DataTableHeader from "./DataTableHeader";
import { getNoisyBackgroundSx } from "../NoisyBackground/NoisyBackground";

function DataTable<T extends object>({
    rows,
    columns,
    loading,
    error,
    onClearError,
    emptyMessage,
    height,
    title,
    search,
    newItem,
    deleteDialog,
    getRowId,
    ...rest
}: DataTableProps<T>): React.ReactNode {
    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
            <DataTableHeader title={title} search={search} newItem={newItem}/>
            <DataTableErrorAlert error={error} onClose={onClearError}/>
            <GenericDataGrid<T>
                rows={rows}
                columns={columns}
                loading={loading}
                emptyMessage={emptyMessage}
                height={height}
                getRowId={getRowId}
                {...rest}
                sx={(theme: Theme) => ({ ...getNoisyBackgroundSx({theme }) })}
            />
            <DataTableDeleteDialog config={deleteDialog} />
        </Box>
    );
}

export default DataTable;