import { Box, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { ItemDataProps } from "@typings/cart/cartComponentTypes";
import ProductItemPresentationRow from "./ProductItemPresentationRow";

const ProductItemData = ({ presentations = [], onAddPresentation }: ItemDataProps): ReactNode => {
  const { t } = useTranslation();

  if (presentations.length === 0) {
    return (
      <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom?.darkWhite })}>
        {t("cart.productItem.noPresentations")}
      </Typography>
    );
  }

  return (
    <Box component="ul" sx={{ m: 0, p: 0, maxHeight: "9em", overflowY: "auto" }}>
      {presentations.map((presentation) => (
        <ProductItemPresentationRow key={presentation._id || presentation.sku} presentation={presentation} onAdd={onAddPresentation} />
      ))}
    </Box>
  );
};

export default ProductItemData;
