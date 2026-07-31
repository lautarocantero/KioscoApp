import type { validateProductSubmissionInterface, ValidationResultType } from "@typings/sells/sellTypes";
import { isWeightSaleType } from "../../../../shared/helpers/saleTypeHelper";

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

    const isWeight = isWeightSaleType(Presentation.sale_type);

    if (isWeight && requiredStock % 100 !== 0) {
      return { valid: false, message: "La cantidad debe ser un múltiplo de 100 gramos." };
    }

    if (Presentation.stock < requiredStock) {
      const stockLabel = isWeight ? `${Presentation.stock}g` : `${Presentation.stock} unidades`;
      return { valid: false, message: `El stock disponible es de ${stockLabel}.` };
    }

    if (Presentation.price <= 0) {
      return { valid: false, message: "El precio del producto es inválido." };
    }

    return { valid: true };
};

export default validateProductForCart;