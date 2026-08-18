import { Box, Stack, Typography, type Theme } from "@mui/material";
import React, { type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import type { ProductDialogSelectorHeaderComponent } from "@typings/cart/cartComponentTypes";
import useProductDialogSelector from "@hooks/cart/useProductDialogSelector";

const ProductDialogSelectorHeaderComponent = ({ products }: ProductDialogSelectorHeaderComponent): ReactNode => {
  const { t } = useTranslation();
  const {
    isEmpty,
  } = useProductDialogSelector(products);

  if (isEmpty) return (<Box><Typography>{t("cart.productDialog.selector.empty")}</Typography></Box>);

  return (
      <Stack direction={'row'} alignItems={'center'} gap={1}>
        <Typography sx={(theme: Theme) => ({ color: theme?.palette?.primary?.main, fontWeight: 'bold' })}>
          {t("cart.productDialog.selector.title")}
        </Typography>
        <Typography
          sx={(theme: Theme) => ({
            color: theme?.custom?.fontColor,
            backgroundColor: theme?.custom?.background,
            borderRadius: '1em',
            px: 1,
            fontSize: theme?.typography?.caption?.fontSize,
          })}
        >
          {products.length}
        </Typography>
      </Stack>
  );
};

export default React.memo(ProductDialogSelectorHeaderComponent);