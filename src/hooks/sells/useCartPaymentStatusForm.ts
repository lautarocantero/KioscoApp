import { useFormikContext } from "formik";
import { SellStatusEnum } from "../../typings/sells/sellsEnum";
import type { CartFormValues, useCartPaymentStatusFormReturn } from "@typings/sells/sellTypes";
import { getStatusChangePatch } from "../../modules/cart/helpers/cartPaymentStatus.helper";

export const useCartPaymentStatusForm = (): useCartPaymentStatusFormReturn => {
    const { values, errors, touched, setFieldValue, handleBlur } = useFormikContext<CartFormValues>();
    const isPartial = values.status === SellStatusEnum.Parcial;

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value as SellStatusEnum;
        setFieldValue('status', value);

        const patch = getStatusChangePatch(value);
        Object.entries(patch).forEach(([field, val]) => setFieldValue(field, val));
    };

    return { values, setFieldValue, errors, touched, isPartial, handleStatusChange, handleBlur };
};