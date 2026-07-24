import { Box, Typography, type Theme } from "@mui/material";
import type { ItemDataProps } from '@typings/sells/SellComponentTypes';
import { useProductStock } from "../../../../hooks/sells/useProductItem";
import type { ReactNode } from "react";
import ProductItemChip from "./ProductItemChip";

const ProductItemData = ({ name = "presentacion", presentations = [] }: ItemDataProps): ReactNode => {
  const { totalStock }  = useProductStock(presentations);

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
      <ProductItemChip totalStock={totalStock} />
    </Box>
  );
};

export default ProductItemData;