
//── Helper 🦸: handleProductDialogUnitsChange ──//

// Descripción 📝
// Maneja el cambio en la cantidad de unidades seleccionadas dentro del diálogo.

// Lógica 🔧
// - Valida el nuevo valor con `validateProductUnits`.
// - Aplica el valor ajustado si es necesario.
// - Actualiza el campo `requiredStock` en Formik.

//-----------------------------------------------------------------------------//

import type { HandleProductDialogUnitsChangeInterface, ValidationResultType } from "@typings/sells/sellTypes";
import validateProductUnits from "../Validation/ValidateProductUnits";

const handleChangeUnits = ({incomingValue, Presentation, setFieldValue}: HandleProductDialogUnitsChangeInterface) => {
    
    const validationResult: ValidationResultType = validateProductUnits({incomingValue,Presentation});

    {/*─────────────────── 🔎 validacion fallida sin correccion 🔎 ───────────────────*/}

    if (!validationResult?.valid && validationResult?.adjustedValue === undefined) { 
        throw new Error(validationResult?.message); 
    }

    {/*─────────────────── 🔎 validacion fallida con correccion 🔎 ───────────────────*/}
    if (!validationResult?.valid && validationResult?.adjustedValue !== undefined) { 
        setFieldValue("requiredStock", validationResult.adjustedValue); return; 
    }

    setFieldValue('requiredStock', incomingValue)
}

export default  handleChangeUnits;