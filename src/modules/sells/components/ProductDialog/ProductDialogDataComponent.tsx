import { Box, Typography, type Theme } from "@mui/material";
import type { DialogDataProps } from "@typings/sells/SellComponentTypes";
import React from "react";
import { Stack } from "@mui/system";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import useProductDialog from "../../../../hooks/sells/useProductDialog";

const ProductDialogDataComponent = ({ product, description }: DialogDataProps): React.ReactNode => {
  const { formattedTotalStock } = useProductDialog();

  const { name } = product;

  return (
      <Box display={'flex'} flexDirection={'column'}>
        <Typography
          sx={(theme: Theme) => ({
            fontSize: theme.typography.h6?.fontSize,
            fontWeight: 'bold',
            color: theme.custom.fontColor,
          })}
        >
          {name}
        </Typography>
        {description && (
          <Typography
            sx={(theme: Theme) => ({
              fontSize: theme.typography.body2?.fontSize,
              color: theme.custom.translucidWhite,
              mt: 0.5,
            })}
          >
            {description}
          </Typography>
        )}
        <Stack direction={'row'} alignItems={'center'} gap={0.5} sx={{ mt: 2 }}>
          <Inventory2OutlinedIcon
            fontSize="small"
            sx={(theme: Theme) => ({ color: theme.custom.translucidWhite })}
          />
          <Typography
            sx={(theme: Theme) => ({
              fontSize: theme.typography.caption?.fontSize,
              color: theme.custom.translucidWhite,
            })}
          >
            Total en stock (todas las presentaciones)
          </Typography>
        </Stack>
        <Typography
          sx={(theme: Theme) => ({
            fontSize: theme.typography.h4?.fontSize,
            fontWeight: 'bold',
            color: theme.palette.primary.light,
            mt: 0.5,
          })}
        >
          {formattedTotalStock}
        </Typography>
      </Box>
  );
};

export default React.memo(ProductDialogDataComponent);