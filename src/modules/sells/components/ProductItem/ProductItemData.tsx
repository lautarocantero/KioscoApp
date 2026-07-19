import InventoryIcon from '@mui/icons-material/Inventory';
import { Box, Typography, type Theme } from "@mui/material";
import type { ItemDataProps } from '@typings/sells/SellComponentTypes';
import type { Presentation } from "../../../../typings/presentation/presentationTypes";

const ProductItemData = ({ name = "product", presentations = [] }: ItemDataProps): React.ReactNode => {
  const totalStock: number = presentations?.reduce(
    (count: number, presentation: Presentation) => count + presentation.stock,
    0
  ) ?? 0;
  const subtitle: string | undefined = presentations?.[0]?.name;

  if (!name) return null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, gap: "0.2em" }}>
      <Typography
        sx={(theme: Theme) => ({
          fontWeight: 600,
          fontSize: theme?.typography?.body1?.fontSize,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        })}
      >
        {name}
      </Typography>

      {subtitle && (
        <Typography
          sx={(theme: Theme) => ({
            fontSize: theme?.typography?.caption?.fontSize,
            color: theme.custom?.translucidWhite,
          })}
        >
          {subtitle}
        </Typography>
      )}

      <Typography
        sx={(theme: Theme) => ({
          fontSize: theme?.typography?.caption?.fontSize,
          color: theme.custom?.translucidWhite,
          mt: "0.4em",
        })}
      >
        Stock actual
      </Typography>

      <Typography
        sx={(theme: Theme) => ({
          display: "flex",
          alignItems: "center",
          gap: "0.3em",
          fontSize: theme?.typography?.body2?.fontSize,
          fontWeight: 500,
        })}
      >
        <InventoryIcon sx={{ fontSize: "1em" }} />
        {totalStock}
      </Typography>
    </Box>
  );
};

export default ProductItemData;