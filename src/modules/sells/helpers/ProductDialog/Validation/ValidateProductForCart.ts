
/*
── Helper 🦸: validateProductForCart ──

Descripción 📝
Se encarga de validar que el producto seleccionado pueda agregarse al carrito.

━━━━━━━━━━ Lógica 🔧 ━━━━━━━━━━
┌────────────────────────────────────────────┬───────────────────────────────┐
│ Validación                                 │ Resultado                     │
├────────────────────────────────────────────┼───────────────────────────────┤
│ Producto no existe                         │ ❌ Inválido                   │
│ Cantidad requerida no es un número entero  │ ❌ Inválido                   │
│ Cantidad requerida menor o igual a 0       │ ❌ Inválido                   │
│ Cantidad requerida mayor al stock disponible │ ❌ Inválido                 │
│ Precio del producto menor o igual a 0      │ ❌ Inválido                   │
│ Todas las condiciones correctas            │ ✅ Válido                     │
└────────────────────────────────────────────┴───────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

import { SALE_TYPE_LABELS } from "@typings/presentation/presentationCategoryLabels";
import type { validateProductSubmissionInterface, ValidationResultType } from "@typings/sells/sellTypes";

const validateProductForCart = ({ Presentation, requiredStock }: validateProductSubmissionInterface): ValidationResultType => {
    if (!Presentation) {
      return { valid: false, message: "Ocurrió un error al agregar el producto." };
    }

    if (!Number.isInteger(requiredStock)) {
      return { valid: false, message: "La cantidad requerida debe ser un número entero." };
    }

    if (requiredStock <= 0) {
      return { valid: false, message: "No hay stock del producto, no está disponible actualmente." };
    }

    // ⬇️ nuevo: si es venta por peso, requiredStock son gramos y deben ser múltiplo de 100
    if (Presentation.sale_type === SALE_TYPE_LABELS.weight && requiredStock % 100 !== 0) {
      return { valid: false, message: "La cantidad debe ser un múltiplo de 100 gramos." };
    }

    if (Presentation.stock < requiredStock) {
      return { valid: false, message: `El stock disponible es de ${Presentation.stock} unidades.` };
    }

    if (Presentation.price <= 0) {
      return { valid: false, message: "El precio del producto es inválido." };
    }

    return { valid: true };
};

export default validateProductForCart;