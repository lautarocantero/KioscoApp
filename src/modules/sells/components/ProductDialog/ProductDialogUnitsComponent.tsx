
//─────────────────── Componente 🧩: ProductDialogUnitsComponent ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Control para seleccionar cantidad de unidades del producto.  

//──────────────────── Funciones 🔧 ─────────────────────//
//   - Renderiza input numérico para unidades.  
//   - Valida y ajusta cantidad con `validateProductUnits`.  
//   - Actualiza campo `requiredStock` en Formik.  

//-----------------------------------------------------------------------------//

import { Grid } from "@mui/material";
import type { DialogDataDisplayProps } from "@typings/sells/reactComponents";
import type { HandleProductDialogUnitsChangeInterface } from "@typings/sells/types";
import React from "react";
import { useDelegatedHandler } from "../../../../hooks/shared/useDelegatedHandler";
import NumberField from "../../../shared/components/NumberField/NumberField";
import handleChangeUnits from "../../helpers/ProductDialog/Handlers/handleProductDialogUnitsChange";

const ProductVariantDialogUnitsComponent = ({values,setFieldValue, label }: DialogDataDisplayProps ): React.ReactNode => {

    const handleChange = useDelegatedHandler(({ incomingValue } : Partial<HandleProductDialogUnitsChangeInterface>) =>
        handleChangeUnits({ incomingValue, productVariant: values?.productVariant, setFieldValue}),
        [values, setFieldValue]
    );

    if(!values?.productVariant) return null;

    const stock : number = values?.productVariant?.stock;
    const { requiredStock } : { requiredStock: number} = values;

    return (
        <Grid
            container
            display={'flex'}
            flexDirection={'row'}
        >
            <NumberField 
                label={label}
                min={1}
                max={stock}
                size="small"
                defaultValue={1}
                value={requiredStock}
                onValueChange={(value: number | null) => handleChange({incomingValue: value})}
            />
        </Grid>
    )
}

export default React.memo(ProductVariantDialogUnitsComponent);
