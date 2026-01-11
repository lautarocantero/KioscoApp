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
import type { DialogDataDisplayProps } from "@typings/sells/reactComponents";
import NumberField from "../../../shared/components/NumberField/NumberField";
import React from "react";
import handleChangeUnits from "../../helpers/ProductDialog/Handlers/handleProductDialogUnitsChange";
import { useDelegatedHandler } from "../../../../hooks/shared/useDelegatedHandler";
import type { HandleProductDialogUnitsChangeInterface } from "@typings/sells/types";

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
