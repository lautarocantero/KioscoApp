//─────────────────── Componente 🧩: ProductDialogPriceComponent ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Muestra el precio total calculado en el diálogo de producto.
// Se basa en la cantidad seleccionada y el precio unitario.  

//──────────────────── Funciones 🔧 ─────────────────────//
// - ProductDialogPriceComponent: componente principal.
//   - Recibe values.
//   - Si product_id está vacío → no renderiza.
//   - Si productStock es 0 → no renderiza.
//   - En caso contrario, renderiza Typography con el cálculo Total = productPrice × productStock.

//─────────────────── Notas técnicas 💽 ───────────────────//
// - El cálculo se realiza directamente en JSX para mantener simplicidad.
//-----------------------------------------------------------------------------//

import { Grid, Typography, type Theme } from "@mui/material";
import type { DialogDataPriceType } from "../../../../typings/sells/reactComponents/sellsComponentTypes";

const ProductDialogPriceComponent = ({values}: DialogDataPriceType): React.ReactNode => {

    if(!values?.productVariant) return null;

    if(values?.productVariantId === "") return null;

    if(values?.requiredStock === 0) return null;

    const totalPrice: number = (values?.productVariant?.price ?? 0) * values?.requiredStock;

    return (
        <Grid
            container
            display={'flex'}
            flexDirection={'row'}
            sx={({
                ml: { xs: '0.1em'}
            })}
        >
            <Typography
                sx={(theme: Theme) => ({
                  color: totalPrice === 0 ? theme?.custom?.fontColorTransparent : theme?.custom?.fontColor,
                })}
            >
              {/* ─────────────────── 🔎 el formato numerico es para el dinero, comas decimales 🔎 ─────────────────── */}
              Total: {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2,
              }).format(totalPrice)}
            </Typography>
        </Grid>
    )
}

export default ProductDialogPriceComponent;
