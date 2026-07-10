import React from "react";
import { Box } from "@mui/material";
import GenericDataGrid from "./GenericDataGrid";
import DataTableErrorAlert from "./DataTableErrorAlert";
import DataTableDeleteDialog from "./DataTableDeleteDialog";
import type { DataTableProps } from "@typings/ui/dataTable.types";
import DataTableHeader from "./DataTableHeader";

function DataTable<T extends { _id: string }>({
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
    ...rest
}: DataTableProps<T>): React.ReactNode {
    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
            <DataTableHeader title={title} search={search} newItem={newItem} />

            <DataTableErrorAlert error={error} onClose={onClearError} />

            <GenericDataGrid<T>
                rows={rows}
                columns={columns}
                loading={loading}
                emptyMessage={emptyMessage}
                height={height}
                {...rest}
            />

            <DataTableDeleteDialog config={deleteDialog} />
        </Box>
    );
}

export default DataTable;