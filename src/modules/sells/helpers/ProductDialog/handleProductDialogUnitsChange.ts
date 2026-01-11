import type { HandleProductDialogUnitsChangeInterface, ValidationResultAdjustedType } from "@typings/sells/types";
import validateProductUnits from "./ValidateProductUnits";

const handleChangeUnits = ({incomingValue, productVariant, setFieldValue}: HandleProductDialogUnitsChangeInterface) => {
    
    const validationResult: ValidationResultAdjustedType = validateProductUnits({incomingValue,productVariant});

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