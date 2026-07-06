// src/.../components/ProductsToolbar/ProductsToolbar.tsx
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Typography,
  type SelectChangeEvent,
  type Theme,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

export type ViewMode = "grid" | "list";
export type SortOption = "name-asc" | "name-desc" | "stock-asc" | "stock-desc";

export interface ProductsToolbarProps {
  totalCount: number;
  sortValue: SortOption;
  onSortChange: (value: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "name-asc", label: "Nombre A-Z" },
  { value: "name-desc", label: "Nombre Z-A" },
  { value: "stock-asc", label: "Stock: menor a mayor" },
  { value: "stock-desc", label: "Stock: mayor a menor" },
];

const ProductsToolbar = ({
  totalCount,
  sortValue,
  onSortChange,
  viewMode,
  onViewModeChange,
}: ProductsToolbarProps): React.ReactNode => {
  const handleSortChange = (e: SelectChangeEvent) => onSortChange(e.target.value as SortOption);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Inventory2OutlinedIcon
          sx={(theme: Theme) => ({ color: theme.palette?.primary?.main, fontSize: "1.2rem" })}
        />
        <Typography
          variant="body2"
          sx={(theme: Theme) => ({ color: theme.palette?.primary?.main, fontWeight: 600 })}
        >
          {totalCount} productos encontrados
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Typography
          variant="body2"
          sx={(theme: Theme) => ({ color: theme.custom?.translucidWhite })}
        >
          Ordenar por:
        </Typography>

        <Select
          size="small"
          value={sortValue}
          onChange={handleSortChange}
          sx={(theme: Theme) => ({
            minWidth: "170px",
            borderRadius: "8px",
            backgroundColor: theme.custom?.posSurface,
            color: theme.custom?.white,
            height: "1.5em",
          })}
        >
          {SORT_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>

        <Box
          sx={(theme: Theme) => ({
            display: "flex",
            gap: 0.5,
            p: 0.5,
            borderRadius: "8px",
            backgroundColor: theme.custom?.posSurface,
          })}
        >
          <IconButton
            size="small"
            onClick={() => onViewModeChange("grid")}
            aria-label="Vista de cuadrícula"
            sx={(theme: Theme) => ({
              borderRadius: "6px",
              backgroundColor: viewMode === "grid" ? theme.palette?.primary?.main : "transparent",
              color:
                viewMode === "grid" ? theme.custom?.posBackground : theme.custom?.translucidWhite,
            })}
          >
            <GridViewIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onViewModeChange("list")}
            aria-label="Vista de lista"
            sx={(theme: Theme) => ({
              borderRadius: "6px",
              backgroundColor: viewMode === "list" ? theme.palette?.primary?.main : "transparent",
              color:
                viewMode === "list" ? theme.custom?.posBackground : theme.custom?.translucidWhite,
            })}
          >
            <ViewListIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductsToolbar;