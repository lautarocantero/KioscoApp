import type { validateProductSubmissionInterface, ValidationResultType } from "@typings/sells/sellTypes";
import { isWeightSaleType } from "../../../../shared/helpers/saleTypeHelper";

const validateProductForCart = ({ Presentation, requiredStock, t }: validateProductSubmissionInterface): ValidationResultType => {
    if (!Presentation) {
      return { valid: false, message: t("cart.productDialog.validation.genericError") };
    }

    if (!Number.isInteger(requiredStock)) {
      return { valid: false, message: t("cart.productDialog.validation.notInteger") };
    }

    if (requiredStock <= 0) {
      return { valid: false, message: t("cart.productDialog.validation.noStock") };
    }

    const isWeight = isWeightSaleType(Presentation.sale_type);

    if (isWeight && requiredStock % 100 !== 0) {
      return { valid: false, message: t("cart.productDialog.validation.weightMultiple") };
    }

    if (Presentation.stock < requiredStock) {
      const stockLabel = isWeight
        ? `${Presentation.stock}${t("cart.table.weightUnit")}`
        : `${Presentation.stock} ${t("cart.productDialog.validation.unitsSuffix")}`;
      return { valid: false, message: t("cart.productDialog.validation.stockAvailable", { stock: stockLabel }) };
    }

    if (Presentation.price <= 0) {
      return { valid: false, message: t("cart.productDialog.validation.invalidPrice") };
    }

    return { valid: true };
};

export default validateProductForCart;