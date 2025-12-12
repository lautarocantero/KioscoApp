
// # Componente: ProductDialogUnits  

// ## Descripción 📦
// Campo numérico para seleccionar la cantidad de unidades de un producto dentro del diálogo.  
// Se integra con Formik para actualizar el stock seleccionado.  

// ## Funciones 🔧
// - `ProductDialogUnits`: componente principal que recibe props tipadas con `DialogDataDisplayType`.  
//   - `values`: valores actuales del formulario (Formik).  
//   - `setFieldValue`: función de Formik para actualizar campos.  
//   - `label`: etiqueta para el campo numérico.  
// - Lógica interna:  
//   - Si `productId` está vacío → no renderiza nada.  
//   - Renderiza un `NumberField` con:  
//     - `min`: 1 (mínimo de unidades).  
//     - `max`: `productAvailableStock` (stock disponible).  
//     - `defaultValue`: 0.  
//     - `onValueChange`: actualiza `productStock` en Formik cuando el valor cambia.  

// ## Notas técnicas 💽
// - Usa `Grid` de MUI como contenedor con disposición en fila.  
// - `NumberField` es un componente compartido que encapsula la lógica de inputs numéricos.  
// - Se integra en `ProductDialogData` como parte del flujo del formulario.  
//-----------------------------------------------------------------------------//

import { Grid } from "@mui/material";
import NumberField from "../../../../shared/components/NumberField/NumberField";
import type { DialogDataDisplayType } from "../../../../../typings/sells/sellsComponentTypes";

const ProductDialogUnits = ({values,setFieldValue, label }: DialogDataDisplayType ): React.ReactNode => {

    if(values?.productId === "") return;

    return (
        <Grid
            container
            display={'flex'}
            flexDirection={'row'}
        >
            <NumberField 
                label={label}
                min={1}
                max={values?.productAvailableStock}
                size="small"
                defaultValue={0}
                onValueChange={(val: number | null) => {
                    if(val !== null)
                        setFieldValue('productStock', String(val))
                }}
            />
        </Grid>
    )
}

export default ProductDialogUnits;
