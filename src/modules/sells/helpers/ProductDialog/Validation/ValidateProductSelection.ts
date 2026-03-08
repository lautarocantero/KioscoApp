
/*
── Helper 🦸: validateProductSelection ──

Descripción 📝
Se encarga de validar que el producto seleccionado sea válido antes de agregarlo a la venta.

━━━━━━━━━━ Lógica 🔧 ━━━━━━━━━━
┌────────────────────────────────────────────┬───────────────────────────────┐
│ Validación                                 │ Resultado                     │
├────────────────────────────────────────────┼───────────────────────────────┤
│ Evento sin target                          │ ❌ Inválido                   │
│ ProductId inexistente                      │ ❌ Inválido                   │
│ ProductId vacío                            │ ❌ Inválido                   │
│ Lista de productos no es array o está vacía│ ❌ Inválido                   │
│ Todas las condiciones correctas            │ ✅ Válido                     │
└────────────────────────────────────────────┴───────────────────────────────┘
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/


import type { validateProductSelectionType, ValidationResultType } from "@typings/sells/types";

const validateProductSelection = ( {event, products, productId }: validateProductSelectionType): ValidationResultType => {
    
  if (!event?.target) {
    return { valid: false, message: "Ocurrió un error al agregar el producto." };
  }
  if (!productId) {
    return { valid: false, message: "No se ha encontrado el producto." };
  }
  if (productId.trim() === '') {
    return { valid: false, message: "El Id del producto esta vacio." };
  }
  if (!Array.isArray(products) || products.length === 0) {
    return { valid: false, message: "No han cargado correctamente los productos." };
  }

  return { valid: true };
};

export default validateProductSelection;