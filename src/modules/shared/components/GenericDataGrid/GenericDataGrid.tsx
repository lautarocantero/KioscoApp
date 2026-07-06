// ─── Componente 🧩: GenericDataGrid ──────────────────────────────────────────
// DataGrid de MUI totalmente genérico.
// - Tipado con <T extends { _id: string }> para identificar filas sin acoplamientos.
// - Incorpora overlays de loading y de "sin datos" listos para usar.
// - Todas las opciones de MUI DataGrid se pueden sobreescribir vía `slotProps`
//   y el spread final de props.

import React from "react";
import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  type DataGridProps,
  type GridColDef,
} from "@mui/x-data-grid";

interface GenericDataGridProps<T extends { _id: string }>
  extends Omit<DataGridProps, "rows" | "columns" | "getRowId"> {
  rows: T[];
  columns: GridColDef[];
  height?: number | string;
  emptyMessage?: string;
}

function GenericDataGrid<T extends { _id: string }>({
  rows,
  columns,
  height = 720,
  emptyMessage = "No hay registros",
  loading,
  ...rest
}: GenericDataGridProps<T>): React.ReactNode {
  return (
    <Box sx={{ height, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => (row as T)._id}
        loading={loading}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        disableRowSelectionOnClick
        slots={{
          loadingOverlay: () => (
            <Box
              sx={{
                display: "flex",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ),
          noRowsOverlay: () => (
            <Box
              sx={{
                display: "flex",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
