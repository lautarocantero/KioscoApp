import { Stack, Typography, useTheme, type Theme } from "@mui/material";
import type { ProductDialogTableTotalProps } from "@typings/sells/SellComponentTypes";
import React, { type ReactNode } from "react";


const ProductDialogTableTotal = ({ hasAddedItems, sessionTotal, formatter }: ProductDialogTableTotalProps): ReactNode => {
  const theme = useTheme();
  if (!hasAddedItems) return null;

  return (
    <Stack 
      direction={'row'} 
      justifyContent={'flex-end'} 
      sx={(theme: Theme) => ({ 
        mt: 1, 
        textAlign: "end", 
        borderTop: `1px solid ${theme?.custom?.darkGray}` 
        })
      }
    >
      <Typography 
        sx={(theme: Theme) => ({ 
          color: theme?.custom?.fontColor, 
          fontWeight: 'bold',
          })
        }
      >
        Total: 
        <span style={{ color: theme.palette.secondary.main }}>{formatter.format(sessionTotal)}</span>
      </Typography>
    </Stack>
  );
};

export default React.memo(ProductDialogTableTotal);