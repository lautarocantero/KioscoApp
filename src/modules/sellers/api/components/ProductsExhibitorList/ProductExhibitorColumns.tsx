import { type GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import type { Product } from "../../../../typings/product/productTypes";
import ProductRowActionCell from "./ProductRowActionCell";

export const buildColumnsForProductExhibitor = (): GridColDef<Product>[] => [
  {
    field: "name",
    headerName: "Producto",
    flex: 1.5,
    minWidth: 100,
    width: 300,
    maxWidth: 1000,
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, height: "100%" }}>
        <Box
          component="img"
          src={params.row.image_url}
          alt={params.row.name}
          sx={{ width: 32, height: 32, objectFit: "contain", borderRadius: "0.4em" }}
        />
        <Typography variant="body2" noWrap>
          {params.row.name}
        </Typography>
      </Box>
    ),
  },
  {
    field: "presentation",
    headerName: "Presentaciónes",
    flex: 1,
    minWidth: 100,
    width: 1200,
    maxWidth: 1000,
    valueGetter: (_value, row) => {
      const presentation = row.presentations?.[0];
      if (!presentation) return "-";
      return `${presentation.model_type ?? ""}, ${presentation.model_size ?? ""}`.trim();
    },
  },
  {
    field: "category",
    headerName: "Categoría",
    flex: 1,
    minWidth: 100,
    width: 250,
    maxWidth: 1000,
    valueGetter: (_value, row) => {
      const category = row.presentations?.[0]?.category;
      if (!category || category.length === 0) return "-";
      return category.join(", ");
    },
  },
  {
    field: "stock",
    headerName: "Stock",
    flex: 0.6,
    minWidth: 100,
    width: 90,
    maxWidth: 1000,
    align: "center",
    headerAlign: "center",
    valueGetter: (_value, row) => row.presentations?.[0]?.stock ?? 0,
  },
  {
    field: "actions",
    headerName: "Acciones",
    minWidth: 100,
    width: 100,
    maxWidth: 100,
    sortable: false,
    filterable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => <ProductRowActionCell product={params.row} />,
  },
];