import { Grid, Typography, type Theme } from "@mui/material";
import ProductItemQuantityHandler from "./ProductItemQuantityHandler";
import type { AmountDataType } from "../../../../typings/sells/sellsComponentTypes";

const ProductItemAmountData = ({ variants }: AmountDataType): React.ReactNode => {

  if (!variants) return null;

  return (
    <Grid
      sx={(theme: Theme) => ({
        backgroundColor: theme?.custom?.blackTranslucid,
        borderRadius: "1em",
        marginBottom: "0.3em",
        padding: "0.2em 0.5em",
        width: { xs: "auto", md: "100%" },
      })}
    >
      <Typography
        sx={(theme: Theme) => ({
          fontSize: theme?.typography?.caption?.fontSize,
        })}
      >
        <ProductItemQuantityHandler variants={variants}/>
      </Typography>
    </Grid>
  );
};

export default ProductItemAmountData;
