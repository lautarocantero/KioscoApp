import * as Yup from "yup";
import { PaymentMethod, PaymentStatusEnum } from "@typings/sells/sellsEnum";
import type { CartFormValues } from "@typings/sells/sellTypes";

export const getCartFormInitialValues = (): CartFormValues => ({
    payment_method: PaymentMethod.Transfer,
    status: PaymentStatusEnum.Total,
    amount_paid: null,
    debtor_name: null,
});

export const cartFormSchema = (total: number) => Yup.object({
    payment_method: Yup.string().required("El método de pago es obligatorio"),
    status: Yup.string().required(),
    amount_paid: Yup.number()
        .nullable()
        .when('status', {
            is: PaymentStatusEnum.Parcial,
            then: (schema) => schema
                .required("El monto pagado es obligatorio")
                .max(total - 1, "Debe ser menor al total de la venta"),
        }),
    debtor_name: Yup.string()
        .nullable()
        .when('status', {
            is: PaymentStatusEnum.Parcial,
            then: (schema) => schema.required("El nombre del moroso es obligatorio").trim(),
        }),
});