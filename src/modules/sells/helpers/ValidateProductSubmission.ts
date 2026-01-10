import type { validateProductSubmissionInterface, ValidationResultType } from "@typings/sells/types";

const validateProductSubmission = ( {productVariant, requiredStock}: validateProductSubmissionInterface): ValidationResultType => {
    if (!productVariant) {
      return { valid: false, message: "Ocurrió un error al agregar el producto." };
    }

    if (!Number.isInteger(requiredStock)) {
      return { valid: false, message: "La cantidad requerida debe ser un número entero." };
    }

    if (requiredStock <= 0) {
      return { valid: false, message: "No hay stock del producto, no está disponible actualmente." };
    }

    if (productVariant.stock < requiredStock) {
      return { valid: false, message: `El stock disponible es de ${productVariant.stock} unidades.` };
    }

    if (productVariant.price <= 0) {
      return { valid: false, message: "El precio del producto es inválido." };
    }

    return { valid: true };
};

export default validateProductSubmission;