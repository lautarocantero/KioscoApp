import { type GridColDef } from "@mui/x-data-grid";
import { Box, Chip, IconButton, Stack, Typography, type Theme } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NumberField from "../../../shared/components/NumberField/NumberField";
import type { Presentation } from "../../../../typings/presentation/presentationTypes";
import type { BuildColumnsForProductDialogInterface } from "@typings/sells/sellTypes";
import { getStockStatus } from "../../../shared/helpers/getStockStatus";


export const buildColumnsForProductDialog = ({
  getQuantity,
  handleQuantityChange,
  handleAddToCart,
}: BuildColumnsForProductDialogInterface): GridColDef<Presentation>[] => [
  {
    field: "name",
    headerName: "Presentación",
    flex: 1.5,
    minWidth: 220,
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, height: "100%" }}>
        <Box
          component="img"
          src={params.row.image_url ? params.row.image_url : '/images/stocko_images/empty_product.png'}
          alt={params.row.name}
          sx={{ width: 32, height: 32, objectFit: "contain", borderRadius: "0.4em" }}
        />
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2" fontWeight={500} noWrap>
            {params.row.name}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    field: "stock",
    headerName: "Stock",
    flex: 1,
    minWidth: 160,
    renderCell: (params) => {
      const stock = params.row.stock ?? 0;
      const minStock = params.row.min_stock ?? 0;
      const status = getStockStatus({stock, minStock});
      return (
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography sx={(theme: Theme) => ({ color: theme?.custom?.fontColor, fontWeight: 'bold' })}>
            {stock}
          </Typography>
          <Chip label={status.label} size="small" color={status.color} />
        </Stack>
      );
    },
  },
  {
    field: "quantity",
    headerName: "Cant.",
    minWidth: 110,
    width: 110,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      const stock = params.row.stock ?? 0;
      return (
        <NumberField
          label={'Cant.'}
          min={1}
          max={stock}
          size="small"
          defaultValue={1}
          value={getQuantity(String(params.row._id))}
          onValueChange={(value: number | null) => handleQuantityChange(String(params.row._id), value)}
        />
      );
    },
  },
  {
    field: "actions",
    headerName: "Acciones",
    minWidth: 90,
    width: 90,
    sortable: false,
    filterable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const stock = params.row.stock ?? 0;
      const quantity = getQuantity(String(params.row._id));
      const canAdd = stock > 0 && quantity > 0;
      return (
        <IconButton
          type="button"
          disabled={!canAdd}
          onClick={() => handleAddToCart({ presentation: params.row, quantity })}
          sx={(theme: Theme) => ({
            backgroundColor: theme?.palette?.primary?.main,
            color: theme?.palette?.primary?.contrastText ?? theme?.custom?.white,
            borderRadius: '0.4em',
            width: '1.5em',
            height: '1.5em',
            '&:hover': { backgroundColor: theme?.palette?.primary?.dark },
            '&.Mui-disabled': { opacity: 0.4 },
          })}
        >
          <ShoppingCartIcon fontSize="small" />
        </IconButton>
      );
    },
  },
];