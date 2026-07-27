import { useFormikContext } from "formik";
import type { CartFormValues, useCartPaymentMethodFormReturn } from "@typings/sells/sellTypes";

export const useCartPaymentMethodForm = ():useCartPaymentMethodFormReturn => {
    const { setFieldValue, values } = useFormikContext<CartFormValues>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFieldValue('payment_method', event.target.value);
    };

    return { handleChange, values };
};