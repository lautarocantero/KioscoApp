import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import type { CartFormValues } from "@typings/sells/sellTypes";
import { PaymentMethod } from "@typings/sells/sellsEnum";
import type { useCartPaymentMethodFormReturn } from "@typings/cart/cartTypes";
import { buildChipOptions } from "../../modules/cart/helpers/buildChipOptions";

const CHIP_ORDER = [PaymentMethod.Cash, PaymentMethod.Debit, PaymentMethod.Credit, PaymentMethod.Transfer];

export const useCartPaymentMethodForm = ():useCartPaymentMethodFormReturn => {
    const { t } = useTranslation();
    const { setFieldValue, values } = useFormikContext<CartFormValues>();

    const setPaymentMethod = (value: PaymentMethod): void => {
        setFieldValue('payment_method', value);
    };

    const options = buildChipOptions(CHIP_ORDER, (value) => t(`paymentMethod.${value}`));

    return { setPaymentMethod, values, options };
};