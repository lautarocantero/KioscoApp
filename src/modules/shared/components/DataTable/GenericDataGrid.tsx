import React from "react";
import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  DataGrid,
} from "@mui/x-data-grid";
import type { GenericDataGridProps } from "@typings/ui/dataTable.types";


function GenericDataGrid<T extends object>({
  rows,
  columns,
  height = 720,
  emptyMessage = "No hay registros",
  loading,
  getRowId,
  ...rest
}: GenericDataGridProps<T>): React.ReactNode {
  return (
    <Box sx={{ height, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={getRowId ?? ((row) => (row as unknown as { _id: string })._id)}
        loading={loading}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        disableRowSelectionOnClick
        slots={{
          loadingOverlay: () => (
            <Box
              sx={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center" }}
              role="status"
            >
              <CircularProgress aria-label="Cargando registros" />
            </Box>
          ),
          noRowsOverlay: () => (
            <Box sx={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center" }}>
              <Typography color="text.secondary">{emptyMessage}</Typography>
            </Box>
          ),
          ...rest.slots,
        }}
        sx={{
          borderRadius: 2,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "grey.100",
            fontWeight: 700,
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "action.hover",
          },
          ...rest.sx,
        }}
        {...rest}
      />
    </Box>
  );
}

export default GenericDataGrid;
