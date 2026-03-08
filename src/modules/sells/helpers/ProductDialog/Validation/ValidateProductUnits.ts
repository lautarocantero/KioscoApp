/*
── Helper 🦸: validateProductUnits ──

Descripción 📝
Se encarga de validar la cantidad de unidades seleccionadas para un producto.
Ajusta el valor a los límites permitidos (mínimo 1, máximo stock).

━━━━━━━━━━ Lógica 🔧 ━━━━━━━━━━
┌────────────────────────────────────────────┬───────────────────────────────┐
│ Validación                                 │ Resultado                     │
├────────────────────────────────────────────┼───────────────────────────────┤
│ Valor nulo                                 │ ❌ Inválido                   │
│ Valor no numérico                          │ ❌ Inválido                   │
│ Valor menor o igual a 0                    │ ⚠️ Ajustado a 1               │
│ Producto no seleccionado                   │ ❌ Inválido                   │
│ Valor mayor al stock disponible            │ ⚠️ Ajustado al máximo         │
│ Todas las condiciones correctas            │ ✅ Válido                     │
└────────────────────────────────────────────┴───────────────────────────────┘
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/


import type { HandleProductDialogUnitsChangeInterface, ValidationResultType } from "@typings/sells/types";

const validateProductUnits = ({
  incomingValue,
  productVariant,
}: Partial<HandleProductDialogUnitsChangeInterface>): ValidationResultType => {

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
