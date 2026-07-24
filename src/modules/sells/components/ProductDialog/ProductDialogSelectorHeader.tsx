import { Box, Stack, Typography, type Theme } from "@mui/material";
import React from "react";
import useProductDialogSelector from "../../../../hooks/sells/useProductDialogSelector";
import type { ProductDialogSelectorHeaderComponent } from "@typings/sells/SellComponentTypes";

const ProductDialogSelectorHeaderComponent = ({ products }: ProductDialogSelectorHeaderComponent): React.ReactNode => {
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
            backgroundColor: theme?.custom?.darkBackground,
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