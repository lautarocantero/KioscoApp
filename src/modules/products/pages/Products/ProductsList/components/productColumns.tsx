import { Chip, Tooltip, Typography } from "@mui/material";
import { type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";

import type { BuildColumnsArgs, Product } from "@typings/product/productTypes";
import RowActionsCell from "../../../../../shared/components/GenericDataGrid/RowActionsCell";
import { formatDate, truncate } from "../helpers/productHelpers";

export const buildColumns = ({
  onDeleteRequest,
  navigate,
}: BuildColumnsArgs): GridColDef[] => [
  {
    field: "name",
    headerName: "Nombre",
    flex: 1.5,
    minWidth: 160,
  },
  {
    field: "brand",
    headerName: "Marca",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "description",
    headerName: "Descripción",
    flex: 2,
    minWidth: 200,
    renderCell: (params: GridRenderCellParams<Product, string>) => (
      <Tooltip title={params.value ?? ""}>
        <span>{truncate(params.value ?? "", 60)}</span>
      </Tooltip>
    ),
  },
  {
    field: "variants",
    headerName: "Presentaciones",
    flex: 1.5,
    minWidth: 180,
    sortable: false,
    renderCell: (params: GridRenderCellParams<Product>) => {
      const variants = params.row.variants ?? [];
      const variantNames: string = variants
        .map((v: { name?: string }) => v.name ?? "")
        .filter(Boolean)
        .join(", ");
      const display = truncate(variantNames, 50);

      return (
        <Tooltip title={variantNames}>
          <>
            {variants.length > 0 ? (
              <Chip
                label={display}
                size="small"
                variant="outlined"
                sx={{ maxWidth: 160, fontSize: "0.72rem" }}
              />
            ) : (
              <Typography variant="caption" color="text.disabled">
                Sin presentaciones
              </Typography>
            )}
          </>
        </Tooltip>
      );
    },
  },
  {
    field: "created_at",
    headerName: "Creado",
    width: 110,
    renderCell: (params: GridRenderCellParams<Product, string>) =>
      formatDate(params.value ?? ""),
  },
  {
    field: "updated_at",
    headerName: "Actualizado",
    width: 120,
    renderCell: (params: GridRenderCellParams<Product, string>) =>
      formatDate(params.value ?? ""),
  },
  {
    field: "actions",
    headerName: "Acciones",
    width: 160,
    sortable: false,
    filterable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridRenderCellParams<Product>) => (
      <RowActionsCell
        onPresentations={() =>
          navigate(`/products/${params.row._id}/presentations`)
        }
        onView={() => navigate(`/product/${params.row._id}`)}
        onEdit={() => navigate(`/products/${params.row._id}/edit`)}
        onDelete={() => onDeleteRequest(params.row._id, params.row.name)}
      />
    ),
  },
];
