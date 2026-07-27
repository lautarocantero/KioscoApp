import { PaymentStatusEnum } from "@typings/sells/sellsEnum";
import type { CartFormValues } from "@typings/sells/sellTypes";


export const getStatusChangePatch = (
    newStatus: PaymentStatusEnum
): Partial<Pick<CartFormValues, 'amount_paid' | 'debtor_name'>> => {
    if (newStatus !== PaymentStatusEnum.Total) return {};
    return { amount_paid: null, debtor_name: null };
};