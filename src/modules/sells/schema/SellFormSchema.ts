import type { SellEditFormValues, SellTicketType } from "@typings/sells/sellTypes";
import { SellStatusEnum } from "@typings/sells/sellsEnum";
import type { TFunction } from "i18next";
import * as Yup from "yup";

export const getSellEditInitialValues = (sell?: SellTicketType | null): SellEditFormValues => ({
    _id: sell?._id ?? "",
    purchase_date: sell?.purchase_date ?? "",
    modification_date: sell?.modification_date ?? null,
    seller_id: sell?.seller_id ?? "",
    seller_name: sell?.seller_name ?? "",
    payment_method: sell?.payment_method ?? ("" as SellEditFormValues["payment_method"]),
    products: sell?.products ?? [],
    sub_total: sell?.sub_total ?? 0,
    iva: sell?.iva ?? 0,
    total_amount: sell?.total_amount ?? 0,
    currency: sell?.currency ?? "",
    status: sell?.status ?? SellStatusEnum.Completada,
    amount_paid: sell?.amount_paid ?? 0,
    debtor_name: sell?.debtor_name ?? "",
    settles_sell_id: sell?.settles_sell_id ?? null,
    settled_by_sell_id: sell?.settled_by_sell_id ?? null,
});

export const getSellEditFormSchema = (t: TFunction) => Yup.object({
    purchase_date:  Yup.string().required(t("sells.validation.purchase_date.required")),
    seller_name:    Yup.string().required(t("sells.validation.seller_name.required")),
    payment_method: Yup.string().required(t("sells.validation.payment_method.required")),
    sub_total:      Yup.number().required(t("sells.validation.sub_total.required")).min(0),
    iva:            Yup.number().required(t("sells.validation.iva.required")).min(0),
    total_amount:   Yup.number().required(t("sells.validation.total_amount.required")).min(0),
    currency:       Yup.string().required(t("sells.validation.currency.required")),
});