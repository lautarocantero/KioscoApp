import { Box, Stack, Typography, type Theme } from "@mui/material";
import React, { type ReactNode } from "react";
import useProductDialogSelector from "../../../../../hooks/sellers/useProductDialogSelector";
import type { ProductDialogSelectorHeaderComponent } from "@typings/seller/sellerComponentTypes";

const ProductDialogSelectorHeaderComponent = ({ products }: ProductDialogSelectorHeaderComponent): ReactNode => {
  const {
    isEmpty,
  } = useProductDialogSelector(products);

  if (isEmpty) return (<Box><Typography>No se han encontrado Productos</Typography></Box>);

  return (
      <Stack direction={'row'} alignItems={'center'} gap={1}>
        <Typography sx={(theme: Theme) => ({ color: theme?.palette?.primary?.main, fontWeight: 'bold' })}>
          Presentaciones
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