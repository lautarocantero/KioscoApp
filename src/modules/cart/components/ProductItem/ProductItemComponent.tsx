import { Box, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import ProductItemAvatar from "./ProductItemAvatar";
import ProductItemData from "./ProductItemData";
import { useProductItem } from "../../../../hooks/cart/useProductItem";
import type { ProductItemProps } from "@typings/cart/cartComponentTypes";


const ProductItemComponent = ({ product }: ProductItemProps): ReactNode => {
  const { t } = useTranslation();
  const { name, presentations } = product;
  const { handleSelect, handleAddPresentation } = useProductItem(product);
  const displayName = name || t("cart.productItem.fallbackName");

  return (
    <Box
      component="article"
      sx={(theme: Theme) => ({
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${theme.custom?.darkGray}`,
        borderRadius: "0.8em",
        color: theme?.custom?.fontColor,
        width: "100%",
        overflow: "hidden",
      })}
    >
      <Box
        onClick={handleSelect}
        role="button"
        tabIndex={0}
        aria-label={t("cart.productItem.detailAriaLabel", { name: displayName })}
        onKeyDown={(event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          handleSelect();
        }}
        sx={(theme: Theme) => ({
          display: "flex",
          alignItems: "center",
          gap: "0.6em",
          cursor: "pointer",
          padding: "0.7em 0.8em",
          borderBottom: `1px solid ${theme.custom?.darkGray}`,
        })}
      >
        <ProductItemAvatar name={displayName} />
        <Typography
          noWrap
          sx={(theme: Theme) => ({
            color: theme?.custom?.fontColor,
            fontWeight: 700,
            fontSize: theme?.typography?.body2?.fontSize,
          })}
        >
          {displayName}
        </Typography>
      </Box>

      <ProductItemData presentations={presentations} onAddPresentation={handleAddPresentation} />
    </Box>
  );
};

export default ProductItemComponent;
