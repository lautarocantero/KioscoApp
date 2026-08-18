import { Box, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import ProductItemChip from "./ProductItemChip";
import { useProductStock } from "../../../../hooks/cart/useProductItem";
import type { ItemDataProps } from "@typings/cart/cartComponentTypes";

const ProductItemData = ({ name, presentations = [] }: ItemDataProps): ReactNode => {
  const { t } = useTranslation();
  const { totalStock }  = useProductStock(presentations);
  const displayName = name || t("cart.productItem.fallbackName");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: "0.1em" }}>
      <Typography
        sx={(theme: Theme) => ({
          color: theme?.custom?.white,
          fontWeight: 700,
          fontSize: theme?.typography?.body1?.fontSize,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        })}
      >
        {displayName}
      </Typography>
      <ProductItemChip totalStock={totalStock} />
    </Box>
  );
};

export default ProductItemData;