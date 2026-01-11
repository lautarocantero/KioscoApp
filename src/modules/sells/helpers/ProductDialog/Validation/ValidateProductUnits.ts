//── Helper 🦸: validateProductUnits ──//

// Descripción 📝
// Se encarga de validar la cantidad de unidades seleccionadas para un producto.
// Ajusta el valor a los límites permitidos (mínimo 1, máximo stock).

// Lógica 🔧
// - Si el valor es nulo o no numérico → inválido.
// - Si el valor es menor o igual a 0 → se ajusta a 1.
// - Si no existe el producto → inválido.
// - Si el valor excede el stock → se ajusta al máximo disponible.
// - Si pasa todas las validaciones → válido.

//-----------------------------------------------------------------------------//

import type { HandleProductDialogUnitsChangeInterface, ValidationResultAdjustedType } from "@typings/sells/types";

const validateProductUnits = ({
  incomingValue,
  productVariant,
}: Partial<HandleProductDialogUnitsChangeInterface>): ValidationResultAdjustedType => {

  if (incomingValue == null) {
    return { valid: false, message: "El valor ingresado es nulo." };
  }

  if (typeof incomingValue !== "number") {
    return { valid: false, message: "El valor ingresado no es numérico." };
  }

  if (incomingValue <= 0) {
    return { 
      valid: false, 
      message: "La cantidad mínima es 1.", 
      adjustedValue: 1
    };
  }

  if (!productVariant) {
    return { valid: false, message: "No se ha seleccionado un producto válido." };
  }

  if (incomingValue > productVariant.stock) {
    return {
      valid: false,
      message: `La cantidad máxima permitida es ${productVariant.stock}.`, 
      adjustedValue: productVariant.stock ,
    };
  }

  return { valid: true };
};

export default validateProductUnits;
