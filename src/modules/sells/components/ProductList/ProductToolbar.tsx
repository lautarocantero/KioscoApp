import {
  Box,
  Typography,
  type Theme,
} from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

export interface ProductsToolbarProps {
  totalCount: number;
}


const ProductsToolbar = ({
  totalCount,
}: ProductsToolbarProps): React.ReactNode => {

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

    </Box>
  );
};

export default ProductsToolbar;