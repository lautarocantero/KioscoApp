import { useFormikContext } from "formik";
import type { CartFormValues } from "@typings/sells/sellTypes";
import type { useCartPaymentMethodFormReturn } from "@typings/cart/cartTypes";

export const useCartPaymentMethodForm = ():useCartPaymentMethodFormReturn => {
    const { setFieldValue, values } = useFormikContext<CartFormValues>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFieldValue('payment_method', event.target.value);
    };

    return { handleChange, values };
};