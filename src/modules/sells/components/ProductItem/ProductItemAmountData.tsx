//─────────────────── Componente 🧩: ProductItemAmountData ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Renderiza un bloque que muestra la disponibilidad de variantes de producto (por ejemplo talles o tamaños).
// Se apoya en `ProductItemQuantityHandler` para calcular y mostrar chips de cantidad por variante.  

//──────────────────── Funciones 🔧 ─────────────────────//
// ProductItemAmountData componente principal que recibe variants para poder mostrar las existencias de las diferentes medidas
// del producto

//-----------------------------------------------------------------------------//

import { Grid, Typography, type Theme } from "@mui/material";
import type { AmountDataType } from "../../../../typings/sells/reactComponents/sellsComponentTypes";
import ProductItemQuantityHandler from "./ProductItemQuantityHandler";

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
