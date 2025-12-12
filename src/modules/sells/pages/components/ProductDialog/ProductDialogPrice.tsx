
// # Componente: ProductDialogPrice  

// ## Descripción 📦
// Muestra el precio total calculado en el diálogo de producto.  
// Se basa en la cantidad de unidades seleccionadas y el precio unitario.  

// ## Funciones 🔧
// - `ProductDialogPrice`: componente principal que recibe `values` tipados con `DialogDataPriceType`.  
//   - Si `productId` está vacío → no renderiza nada.  
//   - Si `productStock` es 0 → no renderiza nada.  
//   - En caso contrario, renderiza un `Typography` con el cálculo:  
//     **Total = productPrice × productStock**.  

// ## Notas técnicas 💽
// - Usa `Grid` de MUI como contenedor con disposición en fila.  
// - El cálculo se realiza directamente en JSX para mantener simplicidad.  
// - Se integra en `ProductDialogData` como parte del flujo del formulario.  
//-----------------------------------------------------------------------------//

import { Grid, Typography } from "@mui/material";
import type { DialogDataPriceType } from "../../../../../typings/sells/sellsComponentTypes";

const ProductDialogPrice = ({values}: DialogDataPriceType): React.ReactNode => {

    if(values?.productId === "") return;

    if(values?.productStock === 0) return;

    return (
        <Grid
            container
            display={'flex'}
            flexDirection={'row'}
            sx={({
                ml: { xs: '0.1em'}
            })}
        >
            <Typography>Total : {values?.productPrice * values?.productStock} $</Typography>
        </Grid>
    )
}

export default ProductDialogPrice;
