// modules/cart/helpers/cartPaymentStatus.helper.ts
import { SellStatusEnum } from "@typings/sells/sellsEnum";
import type { CartFormValues } from "@typings/sells/sellTypes";

export const getStatusChangePatch = (
    newStatus: SellStatusEnum
): Partial<Pick<CartFormValues, 'amount_paid' | 'debtor_name'>> => {
    if (newStatus !== SellStatusEnum.Completada) return {};
    return { amount_paid: null, debtor_name: null };
};

export const getClampedAmountPaid = (
    rawValue: string,
    maxAmountPaid: number
): number | null => {
    if (rawValue === '') return null;

    const numericValue = Number(rawValue);
    return Math.min(numericValue, maxAmountPaid);
};