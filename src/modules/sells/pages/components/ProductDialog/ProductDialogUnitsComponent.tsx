//─────────────────── Componente 🧩: ProductDialogUnits ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Campo numérico para seleccionar la cantidad de unidades de un producto dentro del diálogo.
// Se integra con Formik para actualizar el stock seleccionado.  

//──────────────────── Funciones 🔧 ─────────────────────//
// - ProductDialogUnits: componente principal.
//   - Recibe values, setFieldValue y label.

//─────────────────── Notas técnicas 💽 ───────────────────//
// - NumberField es un componente compartido que encapsula la lógica de inputs numéricos.

//-----------------------------------------------------------------------------//


import { Grid } from "@mui/material";
import type { DialogDataDisplayType } from "../../../../../typings/sells/sellsComponentTypes";
import NumberField from "../../../../shared/components/NumberField/NumberField";

const ProductVariantDialogUnitsComponent = ({values,setFieldValue, label }: DialogDataDisplayType ): React.ReactNode => {

    if(!values?.productVariant) return null;

    return (
        <Grid
            container
            display={'flex'}
            flexDirection={'row'}
        >
            <NumberField 
                label={label}
                min={1}
                max={values?.productVariant?.stock}
                size="small"
                defaultValue={0}
                onValueChange={(val: number | null) => {
                    if(!val) return;
                        setFieldValue('requiredStock', val)
                }}
            />
        </Grid>
    )
}

export default ProductVariantDialogUnitsComponent;
