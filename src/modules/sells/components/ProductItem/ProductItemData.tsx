import { Box, Typography, type Theme } from "@mui/material";
import type { ItemDataProps } from '@typings/sells/SellComponentTypes';
import type { Presentation } from "../../../../typings/presentation/presentationTypes";

const ProductItemData = ({ name = "product", presentations = [] }: ItemDataProps): React.ReactNode => {
  const totalStock: number = presentations?.reduce(
    (count: number, presentation: Presentation) => count + presentation.stock,
    0
  ) ?? 0;

  const subtitle: string | undefined = presentations?.[0]?.name;
  const price: number | undefined = presentations?.[0]?.price;

  if (!name) return null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: "0.1em" }}>
      <Typography
        sx={(theme: Theme) => ({
          fontWeight: 700,
          fontSize: theme?.typography?.body1?.fontSize,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        })}
      >
        {name}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", mt: "0.15em" }}>
        <Typography
          sx={(theme: Theme) => ({
            fontSize: "0.85em",
            fontWeight: 600,
            lineHeight: 1.2,
            color: theme.custom.darkSecondary,
          })}
        >
          Stock: {totalStock}
        </Typography>

        {price !== undefined && (
          <Typography
            sx={(theme: Theme) => ({
              fontSize: theme?.typography?.body1?.fontSize,
              fontWeight: 700,
              lineHeight: 1.2,
              color: theme.custom?.fontColor,
            })}
          >
            ${price}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ProductItemData;