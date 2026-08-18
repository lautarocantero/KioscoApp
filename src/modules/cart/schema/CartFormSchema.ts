import * as Yup from "yup";
import { PaymentMethod, SellStatusEnum } from "@typings/sells/sellsEnum";
import type { CartFormValues } from "@typings/sells/sellTypes";
import type { TFunction } from "i18next";

export const getCartFormInitialValues = (): CartFormValues => ({
    payment_method: PaymentMethod.Transfer,
    status: SellStatusEnum.Completada,
    amount_paid: null,
    debtor_name: null,
});

export const cartFormSchema = (total: number, t: TFunction) => Yup.object({
    payment_method: Yup.string().required(t("cart.validation.paymentMethod.required")),
    status: Yup.string().required(),
    amount_paid: Yup.number()
        .nullable()
        .when('status', {
            is: SellStatusEnum.Parcial,
            then: (schema) => schema
                .required(t("cart.validation.amountPaid.required"))
                .max(total - 1, t("cart.validation.amountPaid.max")),
        }),
    debtor_name: Yup.string()
        .nullable()
        .when('status', {
            is: SellStatusEnum.Parcial,
            then: (schema) => schema.required(t("cart.validation.debtorName.required")).trim(),
        }),
});