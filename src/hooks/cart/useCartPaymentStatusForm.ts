// hooks/sells/useCartPaymentStatusForm.ts
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { SellStatusEnum } from "../../typings/sells/sellsEnum";
import { getStatusChangePatch, getClampedAmountPaid } from "../../modules/cart/helpers/cartPaymentStatus.helper";
import { buildChipOptions } from "../../modules/cart/helpers/buildChipOptions";
import type { useCartPaymentStatusFormReturn } from "@typings/cart/cartTypes";
import type { CartFormValues } from "@typings/sells/sellTypes";

const STATUS_ORDER = [SellStatusEnum.Completada, SellStatusEnum.Parcial];

const STATUS_LABEL_KEY: Record<SellStatusEnum, string> = {
    [SellStatusEnum.Completada]: 'cart.paymentStatus.completada',
    [SellStatusEnum.Parcial]: 'cart.paymentStatus.parcial',
};

export const useCartPaymentStatusForm = (total: number): useCartPaymentStatusFormReturn => {
    const { t } = useTranslation();
    const { values, errors, touched, setFieldValue, handleBlur } = useFormikContext<CartFormValues>();
    const isPartial = values.status === SellStatusEnum.Parcial;
    const maxAmountPaid = total - 1;

    const setStatus = (value: SellStatusEnum): void => {
        setFieldValue('status', value);

        const patch = getStatusChangePatch(value);
        Object.entries(patch).forEach(([field, val]) => setFieldValue(field, val));
    };

    const handleAmountPaidChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFieldValue('amount_paid', getClampedAmountPaid(event.target.value, maxAmountPaid));
    };

    const options = buildChipOptions(STATUS_ORDER, (value) => t(STATUS_LABEL_KEY[value]));

    return { values, setFieldValue, errors, touched, isPartial, maxAmountPaid, setStatus, handleAmountPaidChange, handleBlur, options };
};