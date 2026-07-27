// hooks/sells/useCartPaymentStatusForm.ts
import { useFormikContext } from "formik";
import { SellStatusEnum } from "../../typings/sells/sellsEnum";
import type { CartFormValues, useCartPaymentStatusFormReturn } from "@typings/sells/sellTypes";
import { getStatusChangePatch, getClampedAmountPaid } from "../../modules/cart/helpers/cartPaymentStatus.helper";

export const useCartPaymentStatusForm = (total: number): useCartPaymentStatusFormReturn => {
    const { values, errors, touched, setFieldValue, handleBlur } = useFormikContext<CartFormValues>();
    const isPartial = values.status === SellStatusEnum.Parcial;
    const maxAmountPaid = total - 1;

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value as SellStatusEnum;
        setFieldValue('status', value);

        const patch = getStatusChangePatch(value);
        Object.entries(patch).forEach(([field, val]) => setFieldValue(field, val));
    };

    const handleAmountPaidChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFieldValue('amount_paid', getClampedAmountPaid(event.target.value, maxAmountPaid));
    };

    return { values, setFieldValue, errors, touched, isPartial, maxAmountPaid, handleStatusChange, handleAmountPaidChange, handleBlur };
};